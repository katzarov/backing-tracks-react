import { setupWorker } from "msw/browser";
import { http } from "msw";

// Create worker with no default handlers
const worker = setupWorker();

export { http, worker };

// TODO msw post install script did not run cause it got blocked!
// seems to copy a sw to my dir ? not sure why ? msw is indeed working and an sw is registered on the page
