import { userEvent } from "vitest/browser";
import { expect, describe, it, afterEach, vi } from "vitest";
import { renderWithProviders } from "../utils";
import { AddYouTubeTrackStepperModalContext } from "@src/components/add-tracks/AddTrackMenu.context";
import { LinkToYouTubeTrack } from "@src/components/add-tracks/steps/LinkToYouTubeTrack";

describe("LinkToYouTubeTrack", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // TODO use msw for mocking API calls!!! This is just an example for mocking a module!
  vi.mock("@api/acquire-tracks", async () => {
    return {
      useLazyGetYouTubeVideoInfoQuery: () => [
        () => ({ unwrap: () => Promise.resolve({ title: "title" }) }),
        {
          isFetching: false,
          isSuccess: true,
        },
      ],
      useLazySearchForTrackInSpotifyQuery: () => [
        () => ({ unwrap: () => Promise.resolve("searchResults") }),
        {
          isFetching: false,
          isSuccess: true,
        },
      ],
    };
  });

  const mockOnStepComplete = vi.fn();

  it("allows users to change their input until it is valid and then submit", async () => {
    const page = await renderWithProviders(
      <AddYouTubeTrackStepperModalContext.Provider>
        <LinkToYouTubeTrack onStepComplete={mockOnStepComplete} />
      </AddYouTubeTrackStepperModalContext.Provider>,
    );

    const inputLocator = page.getByLabelText("Link to YouTube video");
    const continueButtonLocator = page.getByText("Next");

    // button should be disabled when invalid text is typed
    await userEvent.type(inputLocator, "invalidtext");
    // await inputLocator.fill("invalidtext");
    await expect.element(inputLocator).toHaveValue("invalidtext");
    await expect.element(continueButtonLocator).toBeDisabled();

    // button should be free to click once user fixes their input and types a valid link
    await userEvent.clear(inputLocator);
    // await inputLocator.clear()
    await userEvent.type(
      inputLocator,
      "https://www.youtube.com/watch?v=xh-iMBOXl6M",
    );
    await expect.element(continueButtonLocator).not.toBeDisabled();

    // users clicks and callback handler for this step is called
    await userEvent.click(continueButtonLocator);
    expect(mockOnStepComplete).toHaveBeenCalledTimes(1);
  });
});
