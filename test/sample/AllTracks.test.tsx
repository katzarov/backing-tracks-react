import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils";
import { AllTracks } from "@src/routes/app/AllTracks";
import { HttpResponse, delay } from "msw";
import { worker, http } from "../utils";
import { ITrackResponseDto } from "@src/store/api/tracks";

// https://github.com/muratkeremozcan/pact-js-example-react-consumer/blob/main/src/components/movie-details/movie-details.vitest.tsx

describe("AllTracks", () => {
  it("setup msw", async () => {
    const response: ITrackResponseDto = {
      id: 1,
      resourceId: "db1559d6-3a4c-4317-99e1-f3b6751a475d",
      duration: 290.586122,
      trackType: "BACKING",
      trackInstrument: "GUITAR",
      regions: [],
      meta: {
        spotifyUri: "3arKRnq9OUd7yq6LRwVW8I",
        trackName: "Soul to Squeeze",
        createdDate: "2024-10-05T10:01:32.415Z",
        updatedDate: "2024-10-05T10:01:32.415Z",
        artist: {
          spotifyUri: "0L8ExT028jH3ddEcZwqJJ5",
          artistName: "Red Hot Chili Peppers",
          createdDate: "2024-10-05T10:01:32.415Z",
          updatedDate: "2024-10-05T10:01:32.415Z",
        },
        albumArt: {
          small: {
            url: "https://i.scdn.co/image/ab67616d000048515590b4ee88187cb06a5b102d",
            width: 64,
            height: 64,
          },
          medium: {
            url: "https://i.scdn.co/image/ab67616d00001e025590b4ee88187cb06a5b102d",
            width: 300,
            height: 300,
          },
          large: {
            url: "https://i.scdn.co/image/ab67616d0000b2735590b4ee88187cb06a5b102d",
            width: 640,
            height: 640,
          },
        },
      },
      createdDate: "2024-10-05T10:01:32.415Z",
      updatedDate: "2025-05-24T07:40:07.531Z",
    };

    worker.use(
      http.get("http://localhost:3000/tracks", async () => {
        // await delay(500);
        return HttpResponse.json([response] satisfies ITrackResponseDto[]);
      }),
    );

    const page = await renderWithProviders(<AllTracks />, {
      //   preloadedState: {
      //     auth: { isAuthenticated: true, userData: { name: null } },
      //   },
    });

    const loadingSkeletonLocator = page.getByTestId("loading-skeleton");
    const titleLocator = page.getByText(response.meta.trackName);

    await expect.element(loadingSkeletonLocator.first()).not.toBeInTheDocument();
    await expect.element(titleLocator).toBeInTheDocument();
  });
});
