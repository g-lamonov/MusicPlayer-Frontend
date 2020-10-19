<template>
  <div
    v-if="songs && songs.length > 0"
  >
    <div>
      <PersistentPlayer />
    </div>
    <div class="songs">
      <songs-playlist
        :current-track-id="currentTrackId"
        @playSelectSong="playSelectedSong"
        :Songs="songs"
      ></songs-playlist>
    </div>
  </div>
</template>

<script>
import SongsPlaylist from "./../components/SongsPlaylist";
import PersistentPlayer from "./PersistentPlayer";
import ProgressBar from "./../components/ProgressBar";
import Vue from "vue";
import VTooltip from "v-tooltip";
import "./../assets/tooltip.css";
import SkipBackwardIcon from "vue-ionicons/dist/md-skip-backward";
import PlayerMixin from "./../mixins/PlayerMixin";
Vue.use(VTooltip);
Vue.use(ProgressBar);
export default {
  name: "MainPlayer",
  components: {
    SongsPlaylist,
    PersistentPlayer,
  },
  mixins: [PlayerMixin],
};
</script>

<style lang="scss">
.vue-progress-circle {
  width: fit-content !important;
  width: -moz-fit-content !important;
}
.track-scrubbing > div {
  padding: 0 !important;
}
.pctrl {
  background: rgba(51, 51, 51, 0.85);
  border: solid 1px rgba(51, 51, 51, 0.4);
}
.play-controls {
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.2),
    rgba(0, 0, 0, 0.4),
    rgba(255, 255, 255, 0.2)
  );
}
h3 {
  font-size: 24px;
  font-family: "Berlin Sans FB";
  font-weight: 800;
}
.songs {
  padding-top: 20px;
  margin-left: 0.5rem;
  margin-top: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  
}
</style>
