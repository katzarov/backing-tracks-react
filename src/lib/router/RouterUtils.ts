import { router } from "src/routes/router";
import { parseStringAsInt, convertIntToString } from "@src/utils/utils";

class RouterUtils {

  getParams() {
    const { trackId, playlistId } = router.state.matches[0].params;

    return {
      trackId: parseStringAsInt(trackId),
      playlistId: parseStringAsInt(playlistId),
    };
  }
}

export const routerUtils = new RouterUtils();
