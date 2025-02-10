import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  ListItemAvatar,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import {
  IAddYouTubeDownloadJobRequestDto,
  useAddTrackViaFileUploadMutation,
  useAddYouTubeDownloadJobMutation,
  useLazySearchForTrackInSpotifyQuery,
} from "@api/acquire-tracks";
import { FC, useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IFindTrackInSpotifyProps } from "../interface";
import {
  useFindTrackInSpotifyFormik,
  trackNameKey,
  formId,
} from "./FindTrackInSpotify.formik";
import { DialogActions, DialogContent } from "@mui/material";

export const FindTrackInSpotify: FC<IFindTrackInSpotifyProps> = ({
  trackUri,
  trackType,
  trackInstrument,
  preliminaryTrackName,
  preliminarySpotifySearchSuggestions,
  setDialogDisableClose,
  onStepComplete,
  onResetAllSteps,
}) => {
  const [
    fetchSearchForTrackInSpotify,
    { data: searchResults, isFetching: isFetchingSearch },
  ] = useLazySearchForTrackInSpotifyQuery();
  const [addYouTubeDownloadJob, { isLoading: isLoadingYoutube }] =
    useAddYouTubeDownloadJobMutation();
  const [addTrackViaFileUpload, { isLoading: isLoadingUpload }] =
    useAddTrackViaFileUploadMutation();

  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [lastFetchQuery, setLastFetchQuery] =
    useState<string>(preliminaryTrackName);

  const formik = useFindTrackInSpotifyFormik(
    preliminaryTrackName,
    handleSubmit,
    onResetAllSteps!
  );

  const isLoading = isLoadingYoutube || isLoadingUpload;

  useEffect(() => {
    if (isLoading) {
      setDialogDisableClose(true);
    } else {
      setDialogDisableClose(false);
    }
    return () => {
      setDialogDisableClose(false);
    };
  }, [isLoading, setDialogDisableClose]);

  async function handleSubmit() {
    try {
      // TODO: move this logic to parent.
      if (typeof trackUri === "string") {
        const reqBody: IAddYouTubeDownloadJobRequestDto = {
          url: trackUri,
          trackType,
          trackInstrument,
          spotifyId: selectedTrackId!,
        };
        await addYouTubeDownloadJob(reqBody).unwrap();
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
  }

  // TODO: automatic debounced search
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
    <>
      <DialogContent>
        <Box
          component="form"
          id={formId}
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
              formik.touched[trackNameKey] &&
              Boolean(formik.errors[trackNameKey])
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

          <List dense sx={{ width: "100%" }}>
            {isFetchingSearch
              ? spotifySearchSuggestionsSkeleton
              : spotifySearchSuggestions}
          </List>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          id={`${formId}-reset`}
          form={formId}
          type="reset"
          color="inherit"
          disabled={isLoading}
        >
          Start Again
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          id={`${formId}-submit`}
          form={formId}
          type="submit"
          loading={isLoading}
          loadingPosition="end"
          disabled={isLoading || selectedTrackId === null}
        >
          Complete
        </Button>
      </DialogActions>
    </>
  );
};
