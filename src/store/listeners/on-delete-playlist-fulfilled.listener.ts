import { router } from "@src/routes/router";
import { playlistsApi } from "../api/playlists";
import { ListenerMiddlewareWithAppTypes } from "../middleware/createListenerMiddleware.config";
import { routes } from "@src/routes/routes";

/**
 *
 *  Executed after each api delete playlist fulfilled mutation.
 *  (And logic here is executed after the relevant reducers mathing the above action have already been run)
 */
ListenerMiddlewareWithAppTypes.startListening({
  matcher: playlistsApi.endpoints.deletePlaylist.matchFulfilled,
  effect: async () => {
    try {
      await router.navigate(`${routes.app.root}`, { replace: true });
    } catch (err) {
      console.error("Err during navigation on deletePlaylist mutation", err);
    }
  },
});
