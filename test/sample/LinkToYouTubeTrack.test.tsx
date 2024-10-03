import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../utils";
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
    renderWithProviders(
      <LinkToYouTubeTrack onStepComplete={mockOnStepComplete} />
    );

    const input = screen.getByLabelText<HTMLInputElement>(
      "Link to YouTube video"
    );

    const continueButton = screen.getByText<HTMLButtonElement>("Next");

    // button should be disabled when invalid text is typed
    await userEvent.type(input, "invalidtext");
    expect(input.value).toMatch("invalidtext");
    expect(continueButton.disabled).toBe(true);

    // button should be free to click once user fixes their input and types a valid link
    await userEvent.clear(input);
    await userEvent.type(input, "https://www.youtube.com/watch?v=xh-iMBOXl6M");
    expect(continueButton.disabled).toBe(false);

    // users clicks and callback handler for this step is called
    await userEvent.click(continueButton);
    expect(mockOnStepComplete).toHaveBeenCalledTimes(1);
  });
});
