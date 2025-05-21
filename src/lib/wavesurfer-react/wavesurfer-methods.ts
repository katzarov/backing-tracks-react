import WaveSurfer from "wavesurfer.js";

export class WavesuferMethods {
  // we need the methods to be arrow funcs cause later on we may do stuff like this WavesuferMethods.playPause if passing this a prop to some component, and then we lose the this=WavesuferMethods ref.
  constructor(private wavesurferInstance: WaveSurfer | null) {
    // this.playPause = this.playPause.bind(this); can also fix it like this.
  }

  /**
   * @throws {Error} some_eror message when can start playing
   */
  play = async () => {
    try {
      await this.wavesurferInstance?.play();
    } catch (e) {
      // if (onErrorCb) {
      //   onErrorCb(e);
      // }
      // decide what we want to do
      console.error(e);
      throw e;
    }
  };

  /**
   * @throws
   */
  load = async () => {
    /* … */
  };

  /**
   * @throws
   */
  playPause = async () => {
    try {
      await this.wavesurferInstance?.playPause();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  // onEvent = TODO,
}
