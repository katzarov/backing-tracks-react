import * as yup from "yup";

export const youtubeUrlKey = "youtubeUrl";
export const trackTypeKey = "trackType";
export const trackInstrumentKey = "trackInstrument";

export const linkToYouTubeTrackValidationSchema = yup.object({
  [youtubeUrlKey]: yup
    .string()
    .url("Enter a valid YouTube link")
    .required("YouTube link is required")
    .test(
      "is-youtube-url",
      "This is not a link under the YouTube domain",
      (value) => {
        if (!URL.canParse(value)) {
          return false;
        }
        const url = new URL(value);
        if (
          url.protocol !== "https:" ||
          (url.hostname !== "www.youtube.com" &&
            url.hostname !== "youtube.com" &&
            url.hostname !== "youtu.be")
        ) {
          return false;
        }

        return true;
      }
    ),
});

export const trackFileKey = "trackFile";

export const uploadTrackValidationSchema = yup.object({
  [trackFileKey]: yup
    .mixed<File>()
    .required("File upload is required")
    .test("fileFormat", "Only MP3 files are allowed", (value) => {
      if (value.type !== "audio/mpeg") {
        return false;
      }
      return true;
    })
    .test("fileSize", "File size must not be more than 20MB", (value) => {
      if (value.size > 20000000) {
        return false;
      }
      return true;
    }),
});

export const trackNameKey = "trackName";

export const findTrackInSpotifyValidationSchema = yup.object({
  [trackNameKey]: yup
    .string()
    .trim()
    .min(3, "Track name must be at least 3 character long")
    .max(100, "Track name must be at most 100 characters long")
    .required("Track name is required"),
});
