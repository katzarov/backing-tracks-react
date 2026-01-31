import { useRef } from "react";
import { describe, it, vi } from "vitest";
import { renderWithProviders } from "../utils";
import { IPlayerInstanceMethods, Player } from "@src/components/player/Player";
import { renderHook } from "vitest-browser-react";
import { userEvent, server } from "vitest/browser";


// create a mock class that impls the abstract fethcing strategy and just based on env use it instead of mocking the import here...

// todo this is jsut bad design if we need to mock the modues like this
// this is just to figure out vitest tool.. not how to write code and tests
vi.mock("@lib/track-loader", async () => {
  return {
    TrackLoader: {
      loadTrack: async () => {
        const track = await server.commands.readFile(
          "test/sample/gypsy_train.mp3",
          {
            encoding: "binary",
          },
        );

        const uint8 = Uint8Array.from(track, (ch) => ch.charCodeAt(0));
        const blob = new Blob([uint8], { type: "audio/mpeg" });

        return Promise.resolve(blob);
      },
    },
  };
});

vi.mock("@src/lib/peaks-loader", async () => {
  return {
    PeaksLoader: {
      loadPeaks: async () => Promise.resolve(null),
      savePeaks: async () => Promise.resolve(),
    },
  };
});

describe("Player", () => {
  it("renders and loads audio file", async () => {
    const { result: refResult, act } = await renderHook(() =>
      useRef<IPlayerInstanceMethods | null>(null),
    );

    // await act(() => {
    //   refResult.current.current?.wavesurferMethods.play();
    // });

    const page = await renderWithProviders(
      <Player
        ref={refResult.current}
        trackId={1}
        playlistId={1}
        trackUri={"fffff"}
        duration={444}
        regions={[]}
      />,
    );

    // test audio autoplay without interaction - need to fix webkit
    // await vi.waitFor(
    //   async () => {
    //     await refResult.current.current?.wavesurferMethods.play();
    //   },
    //   {
    //     timeout: 5000,
    //     interval: 50,
    //   },
    // );

    // https://playwright.dev/docs/api/class-locator#locator-click
    const waveform = page.getByRole("img", { name: "waveform" });

    await waveform.click({
      button: "left",
      // modifiers: ["Shift"],
      position: { x: 100, y: 32 },
    });

    // https://playwright.dev/docs/api/class-locator#locator-drag-to
    await userEvent.dragAndDrop(waveform, waveform, {
      sourcePosition: { x: 100, y: 32 },
      targetPosition: { x: 200, y: 32 },
    });

    // // or specify exact positions relative to the top-left corners of the elements:
    // await source.dragTo(target, {
    //   sourcePosition: { x: 34, y: 7 },
    //   targetPosition: { x: 10, y: 20 },
    // });
  });
});

// todo setup msw
// play wiht canvas clicks and the whole player feature
// appreciate the di system of nest and angular...
