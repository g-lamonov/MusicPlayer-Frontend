import { mapGetters, mapActions, mapState } from "vuex";
const PlayerMixin = {
  data() {
    return {
      progressColor: "#3e9beb",
      progressBgColor: "#ffffff",
      hidePlayer: true,
      progressHeightMain: 8,
      volumeHeightMain: 3,
      progressHeightPersistent: 15,
      volumeHeightPersistent: 9,
    };
  },
  watch: {
    volume() {
      this.changeVolume(this.volume);
    },
  },
  computed: {
    ...mapState([
      "songs",
      "volume",
      "isPlaying",
      "playerIsLoading",
      "currentTrackId",
      "currentTrackTime",
      "currentTrackDuration",
      "isPaused",
      "isStopped",
      "isMuted",
      "continuousPlaybackStatus",
    ]),
    ...mapGetters([
      "getAudio",
      "getSongs",
      "getSongsCount",
      "getVolume",
      "getCurrentTrackId",
      "getCurrentTrackTime",
      "getCurrentTrackDuration",
      "getPlayerIsLoading",
      "getPlayerIsPlaying",
      "getPlayerIsPaused",
      "getPlayerIsStopped",
      "getContinuousPlaybackStatus",
      "getCurrentTrackId",
    ]),
  },
  methods: {
    emitCurrentSong() {
      setTimeout(() => {
        this.$emit("current-song", this.getSongs[this.getCurrentTrackId]);
      }, 200);
    },
    playCurrentSong() {
      this.playTrack();
      setTimeout(() => {
        this.audioListening();
        // emit new track
        this.emitCurrentSong();
      }, 200);
    },
    playSelectedSong(trackId) {
      this.playTrack(trackId);
      setTimeout(() => {
        this.audioListening();
        this.emitCurrentSong();
      }, 200);
    },
    seekPlayer(time) {
      this.audioListening(false);
      this.seekToTime(time);
      setTimeout(() => {
        this.audioListening();
      }, 10);
    },
    pauseSong() {
      this.pause();
    },
    playNextSong() {
      this.nextSong();
      this.audioListening(false);
      setTimeout(() => {
        this.audioListening();
        this.emitCurrentSong();
      }, 200);
    },
    playPrevSong() {
      this.audioListening(false);
      this.prevSong();
      setTimeout(() => {
        this.audioListening();
        this.emitCurrentSong();
      }, 200);
    },
    audioListening(listen = true) {
      if (listen) {
        this.getAudio.addEventListener(
          "loadeddata",
          this.proccessPlaybackStart,
          false
        );
        this.getAudio.addEventListener(
          "timeupdate",
          this.proccessPlaybackTimeUpdate,
          false
        );
        this.getAudio.addEventListener(
          "pause",
          this.proccessPlaybackPause,
          false
        );
        this.getAudio.addEventListener(
          "emptied",
          this.proccessPlaybackEmptied,
          false
        );
        this.getAudio.addEventListener(
          "ended",
          this.proccessPlaybackStop,
          false
        );
      } else {
        this.getAudio.removeEventListener(
          "loadeddata",
          this.proccessPlaybackStart,
          false
        );
        this.getAudio.removeEventListener(
          "timeupdate",
          this.proccessPlaybackTimeUpdate,
          false
        );
        this.getAudio.removeEventListener(
          "pause",
          this.proccessPlaybackPause,
          false
        );
        this.getAudio.removeEventListener(
          "emptied",
          this.proccessPlaybackEmptied,
          false
        );
        this.getAudio.removeEventListener(
          "ended",
          this.proccessPlaybackStop,
          false
        );
      }
    },

    proccessPlaybackStart() {
      this.changePlayerIsLoading(false);
      this.changePlayerIsPlaying(true);
      this.changePlayerIsPaused(false);
      this.changePlayerIsStopped(false);

      this.changeCurrentTrackDuration(this.getAudio.duration);
    },

    proccessPlaybackTimeUpdate() {
      if (
        isNaN(this.getCurrentTrackDuration) ||
        !isFinite(this.getCurrentTrackDuration)
      ) {
        this.changeCurrentTrackDuration(260);
      } else {
        this.changeCurrentTrackDuration(
          isNaN(this.getAudio.duration) || !isFinite(this.getAudio.duration)
            ? 260
            : this.getAudio.duration
        ); // get track duration
      }
      if (this.getPlayerIsLoading) {
        this.changePlayerIsLoading(false);
      }

      this.changeCurrentTrackTime(this.getAudio.currentTime);

      this.changePlayerIsPlaying(true);
      this.changePlayerIsPaused(false);
      this.changePlayerIsStopped(false);
    },

    proccessPlaybackPause() {
      this.changePlayerIsPlaying(false);
      this.changePlayerIsPaused(true);
      this.changePlayerIsStopped(false);
    },

    proccessPlaybackEmptied() {
      this.getAudio.removeEventListener(
        "loadeddata",
        this.proccessPlaybackStart,
        false
      );
      this.getAudio.removeEventListener(
        "timeupdate",
        this.proccessPlaybackTimeUpdate,
        false
      );
      this.getAudio.removeEventListener(
        "pause",
        this.proccessPlaybackEmptied,
        false
      );
      this.changeCurrentTrackTime(0);
      this.changeCurrentTrackDuration(0);

      this.changePlayerIsPlaying(false);
      this.changePlayerIsPaused(false);
      this.changePlayerIsStopped(true);
    },

    proccessPlaybackStop() {
      this.getAudio.removeEventListener(
        "loadeddata",
        this.proccessPlaybackStart,
        false
      );
      this.getAudio.removeEventListener(
        "timeupdate",
        this.proccessPlaybackTimeUpdate,
        false
      );
      this.getAudio.removeEventListener(
        "pause",
        this.proccessPlaybackPause,
        false
      );
      this.changeCurrentTrackTime(0);
      this.changeCurrentTrackDuration(0);

      this.changePlayerIsPlaying(false);
      this.changePlayerIsPaused(false);
      this.changePlayerIsStopped(true);

      if (this.getContinuousPlaybackStatus) {
        if (this.getCurrentTrackId + 1 <= this.getSongsCount - 1) {
          this.changePlayerIsLoading(true);
          this.changeCurrentTrackId(this.getCurrentTrackId + 1);
          this.playCurrentSong();
        } else {
          this.changePlayerIsLoading(true);
          this.changeCurrentTrackId(0);
          this.playCurrentSong();
        }
      }
    },
    ...mapActions({
      updatePlaylist: "updatePlaylist",
      playTrack: "play",
      stop: "stop",
      pause: "pause",
      nextSong: "next",
      prevSong: "previous",
      changeContinuousPlay: "changeContinuousPlay",
      changeCurrentTrackTime: "changeCurrentTrackTime",
      changeCurrentTrackDuration: "changeCurrentTrackDuration",
      changePlayerIsLoading: "changePlayerIsLoading",
      changePlayerIsPlaying: "changePlayerIsPlaying",
      changePlayerIsPaused: "changePlayerIsPaused",
      changePlayerIsStopped: "changePlayerIsStopped",
      changeCurrentTrackId: "changeCurrentTrackId",
      changeVolume: "changeVolume",
      seekToTime: "seek",
    }),
  },
};

export default PlayerMixin;
