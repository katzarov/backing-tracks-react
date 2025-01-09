import { authClient } from "@src/lib/auth";
import { api, listId } from "../rtk-query-api-config";
import {
  MessageType,
  NotificationsState,
  YtdlSyncMessage,
  YtdlUpdateMessage,
} from "./notifications.sse-interface";

const apiBaseUrl = import.meta.env.VITE_API;

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listenToNotifications: builder.query<NotificationsState, void>({
      queryFn() {
        // a way to bypass the fetchBaseQuery func
        return {
          data: {
            ytdl: { jobs: [], count: { active: 0, waiting: 0, failed: 0 } },
          },
        };
      },
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, dispatch }
      ) {
        try {
          await cacheDataLoaded;

          const token = await authClient.getTokenSilently();

          const url = new URL("notifications/sse", apiBaseUrl);
          url.searchParams.append("access_token", token);

          const eventSource = new EventSource(url);

          eventSource.addEventListener(MessageType.ytdlSync, (event) => {
            const parsedData = JSON.parse(event.data) as YtdlSyncMessage;

            updateCachedData(() => {
              return parsedData.state;
            });
          });

          eventSource.addEventListener(
            MessageType.ytdlSyncInvalidateDB,
            (event) => {
              const parsedData = JSON.parse(event.data) as YtdlSyncMessage;

              updateCachedData(() => {
                return parsedData.state;
              });

              dispatch(
                api.util.invalidateTags([{ type: "Track", id: listId }])
              );

              // TODO dispatch some notification/alert for user to see when a new track is added ?
            }
          );

          eventSource.addEventListener(MessageType.ytdlUpdate, (event) => {
            const parsedData = JSON.parse(event.data) as YtdlUpdateMessage;

            updateCachedData((draft) => {
              const itemToUpdateIndex = draft.ytdl.jobs.findIndex(
                (job) => job.id === parsedData.state.ytdl.id
              );

              if (itemToUpdateIndex === -1) {
                console.warn("SSE: is possibly in bad state...", draft);
                return;
              }

              draft.ytdl.jobs[itemToUpdateIndex] = parsedData.state.ytdl;
            });
          });

          eventSource.onerror = (event) => {
            console.error("SSE conn error: ", event);
          };

          // eventSource.onopen = (event) => {
          //   console.log("open, ", event);
          // };
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

export const { useQueryState: useListenToNotificationsQueryState } =
  notificationsApi.endpoints.listenToNotifications;
