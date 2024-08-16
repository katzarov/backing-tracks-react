# TODO

## GENERAL:

- do intl. (incl the form errors messages)
- do keyboard autofocus
- check focus and make sure adhere to a11y standards https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- move all mui imports to named.
- https://vitejs.dev/guide/features.html#transpile-only https://github.com/fi3ework/vite-plugin-checker ?

## ADD TRACKS:

- paste clipboard url with button click
- impl manually enter track details step
- do better with forms https://formik.org/docs/api/useField
- stepper => optimistic progress bar with hidden step names ?
- after YT link is pasted show a preview of the YT clip to confirm its the correct link ?
- debounce search input
- at end show confirmation step ?

## PLAYER:

- support spacebar play pause and other DAW like keyboard shortcuts
- ability to change track speed/pitch. Or precompute/ondemand different track speeds/pitches on server cause higher quality probably... investigate.
- create waveform skeleton
- on app startup (unless a specific track route) preload the last played track - 1) make it local - persist a slice or 2) persist in db ..

## Stuff that strict mode breaks, but that should be fine on prod:

- breaks form field autofocus when modal is opened initally https://github.com/mui/material-ui/issues/33004
- auth: when redirected to the callback route in our app, trying to get the code from the url second time around fails, cause its already stripped after the first time.

