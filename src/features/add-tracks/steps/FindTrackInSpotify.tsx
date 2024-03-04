import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  ListItemAvatar,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import {
  IYouTubeVideoDownloadRequest,
  useAddTrackViaFileUploadMutation,
  useAddYouTubeVideoMutation,
  useLazySearchForTrackInSpotifyQuery,
} from "../../../store/api/acquireTracks";
import { FC, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IFindTrackInSpotifyProps } from "../interface";
import { findTrackInSpotifyValidationSchema, trackNameKey } from "./validation";

export const FindTrackInSpotify: FC<IFindTrackInSpotifyProps> = ({
  trackUri,
  trackType,
  trackInstrument,
  preliminaryTrackName,
  preliminarySpotifySearchSuggestions,
  onStepComplete,
  onResetAllSteps,
}) => {
  const [
    fetchSearchForTrackInSpotify,
    { data: searchResults, isFetching: isFetchingSearch },
  ] = useLazySearchForTrackInSpotifyQuery();
  const [addYouTubeTrack, { isLoading: isLoadingYoutube }] =
    useAddYouTubeVideoMutation();
  const [addTrackViaFileUpload, { isLoading: isLoadingUpload }] =
    useAddTrackViaFileUploadMutation();

  const isLoading = isLoadingYoutube || isLoadingUpload;

  const formik = useFormik({
    initialValues: {
      [trackNameKey]: preliminaryTrackName,
    },
    validationSchema: findTrackInSpotifyValidationSchema,
    validateOnMount: true,
    onSubmit: () => {
      handleSubmit();
    },
    onReset: () => {
      onResetAllSteps!();
    },
  });

  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [lastFetchQuery, setLastFetchQuery] =
    useState<string>(preliminaryTrackName);

  // TODO: Trim whitespace

  const handleSubmit = async () => {
    try {
      // TODO: move this logic to parent.
      if (typeof trackUri === "string") {
        const reqBody: IYouTubeVideoDownloadRequest = {
          url: trackUri,
          trackType,
          trackInstrument,
          spotifyId: selectedTrackId!,
        };
        await addYouTubeTrack(reqBody).unwrap(); //TODO, we doing long polling here. Req might timeout.
      } else {
        const reqBody = new FormData();
        reqBody.append("file", trackUri);
        reqBody.append("spotifyId", selectedTrackId!);
        reqBody.append("trackType", trackType);
        reqBody.append("trackInstrument", trackInstrument);

        await addTrackViaFileUpload(reqBody).unwrap();
      }
      onStepComplete(undefined);
    } catch (e) {
      // TODO: Propagate the error msg from the youtube ms to here. and show some error alert.
      console.error("error", e);
    }
  };

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key !== "Enter" ||
      formik.values[trackNameKey] === lastFetchQuery ||
      (formik.touched[trackNameKey] && Boolean(formik.errors[trackNameKey]))
    ) {
      return;
    }
    // prevent form submit
    event.preventDefault();
    // search again
    const { [trackNameKey]: searchQuery } = formik.values;
    fetchSearchForTrackInSpotify({
      query: searchQuery,
      limit: 5,
    });
    setSelectedTrackId(null);
    setLastFetchQuery(searchQuery);
  };

  const handleSelectTrack = (trackId: string) => {
    setSelectedTrackId((prevTrackId) => {
      if (prevTrackId === trackId) {
        return null;
      }
      return trackId;
    });
  };

  const data =
    searchResults === undefined
      ? preliminarySpotifySearchSuggestions
      : searchResults;

  const spotifySearchSuggestionsSkeleton = (
    <Box>
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
    </Box>
  );

  const spotifySearchSuggestions = data.map(({ id, track, album, artist }) => {
    return (
      <ListItem
        key={id}
        disablePadding
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <ListItemButton
          id={id}
          selected={selectedTrackId === id}
          onClick={() => handleSelectTrack(id)}
        >
          <ListItemAvatar>
            <Avatar
              variant="square"
              // alt={`Avatar n°${value + 1}`}
              src={album.image}
            />
          </ListItemAvatar>
          {/* <ListItemText primary={index + 1} sx={{ width: 50 }} /> */}
          <ListItemText
            primary={track.name}
            secondary={artist.name}
            sx={{ width: "100%" }}
          />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Box sx={{ mt: 6 }}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        onBlur={formik.handleBlur}
        onChange={(e) => {
          setSelectedTrackId(null);
          formik.handleChange(e);
        }}
      >
        <TextField
          type="search"
          id={trackNameKey}
          name={trackNameKey}
          label="Search for track in Spotify"
          autoFocus
          disabled={isLoading}
          fullWidth
          value={formik.values[trackNameKey]}
          error={
            formik.touched[trackNameKey] && Boolean(formik.errors[trackNameKey])
          }
          helperText={
            formik.touched[trackNameKey] && formik.errors[trackNameKey]
          }
          onKeyDown={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
          {isFetchingSearch
            ? spotifySearchSuggestionsSkeleton
            : spotifySearchSuggestions}
        </List>

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            type="reset"
            id="reset"
            color="inherit"
            disabled={isLoading}
            sx={{ mr: 1 }}
          >
            Start Again
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            type="submit"
            id="submit"
            disabled={!formik.isValid || isLoading || selectedTrackId === null}
            sx={{ mr: 1 }}
          >
            Complete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
