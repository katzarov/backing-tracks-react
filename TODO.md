# TODO

## General:

- client user roles - user, admin, demo.
- create some import convention, organzie imports. And In general, need to impl some conventions readme.
- decide if I want a feature based structure or not. But I think at this point, I need to commit to some structure.
- Also think of the different extensions and how it come to play with the file structure - ReactComp.tsx, ReactComp.controller.tsx, ReactComp.loading.tsx, ReactComp.error.tsx, ReactComp.use.tsx, ReactComp.formik.tsx, ReactComp.utils.tsx, ReactComp.styled.tsx etc
- tab sync (with broadcast channel)
- setup intl. ( & don't forget to include the form errors messages)
- do keyboard autofocus. Make sure adhere to a11y standards https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://vitejs.dev/guide/features.html#transpile-only https://github.com/fi3ework/vite-plugin-checker ?

## Testing

- setup msw

## MUI

- move to MUI 6.
- move to MUI named imports.
- actually implement dark and light themes.
- lots of opportunities to use Grid and Stack instead of Box.
- try use Dialog instead of Modal for the add tracks steppers.
- all the stuff that is in a Modal, think of some interface and make it possbile for it to easily be used in a modal or not, i.e. the add track steppers.
- At some point may need to virtualize long lists https://mui.com/material-ui/react-list/#virtualized-list

## API Client / RTK Query

- need to learn more about rtk query and rethink the caching and some of the endpoints. Need to do more careful invalidation.
- play with redux-saga or redux-observables. Not that it is needed but I'd be nice to know since both are heavily used in larger projects https://blog.logrocket.com/redux-toolkits-new-listener-middleware-vs-redux-saga/#comparing-new-listener-middleware-redux-saga
- "abort" reqs for fetching the tracks when swithcing to another track..(and when swithcing routes), try "abort" the rtkq stuff as well
- dont save tokens to local storage but as HttpOnly secure cookie, then include credentials: true in fetch and the browser will auto include the cookie with the token
- will use the DTO interfaces throughout my app.. i dont think its necceassry now to create an entity kind of objects and interfaces for use in the app - those will be created only when actually needed
- version client app and API app. Bust client app cache if app needs to be updated to work with the current api version.

## Routing

- if an already authenticated user visits login route, need to redirect to the app. Create another hoc for that.
- generate slugs

## Add Tracks:

- paste clipboard url with button click
- impl manually enter track details step
- do better with forms https://formik.org/docs/api/useField
- stepper => optimistic progress bar with hidden step names ?
- after YT link is pasted show a preview of the YT clip to confirm its the correct link ?
- debounce search input
- at end show confirmation step ?

## Player:

- support spacebar play pause and other DAW like keyboard shortcuts
- ability to change track speed/pitch. Or precompute/ondemand different track speeds/pitches on server cause higher quality probably... investigate.
- create waveform skeleton
- on app startup (unless a specific track route) preload the last played track - 1) make it local - persist a slice or 2) persist in db ..

## Stuff that strict mode breaks:

- breaks form field autofocus when modal is opened initally https://github.com/mui/material-ui/issues/33004

