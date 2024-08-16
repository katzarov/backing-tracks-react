import { authClient } from "@lib/auth";

const apiBaseUrl = import.meta.env.VITE_API;

// here we defined the rest of the api endpoints that we don't want to use RTK Query for.
// https://github.com/reduxjs/redux-toolkit/issues/1522
// https://github.com/reduxjs/redux-toolkit/discussions/3843
export const nonRTKQueryApi = {
  fetchTrackFromNestJSApi: async (uri: string): Promise<Blob | null> => {
    const getTrackFileEndpoint = `${apiBaseUrl}tracks/file/${uri}`;

    const token = await authClient.getTokenSilently();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(getTrackFileEndpoint, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching the file:", error);
      return null;
    }
  },
  fetchTrackFromS3Bucket: async (
    presignedUrl: string
  ): Promise<Blob | null> => {
    try {
      const response = await fetch(presignedUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching the file:", error);
      return null;
    }
  },
};
