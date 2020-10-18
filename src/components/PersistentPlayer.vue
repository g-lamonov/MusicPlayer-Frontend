<template>
  <div v-if="songs && songs.length > 0">
    <div>
      <section>
        <footer id="interactions">
          <div class="tracking-wrap">
            <span class="song-current-time">--:--</span>

            <ProgressBar
              style="background:#ebebeb;"
              :bar-height="progressHeightPersistent"
              :bar-color="progressColor"
              :bar-shade-color="progressBgColor"
              :intensity="1"
              :current-value="currentTrackTime"
              :total-value="currentTrackDuration"
              @seekedTo="seekToTime"
            />
            <span class="song-length"
              >{{ currentTrackTime | doubleDigits }} -
              {{ currentTrackDuration | doubleDigits }}</span
            >
          </div>

          <div class="controls-bar">
            <section id="controls">
              <span class="fa fa-random shuffle"></span>
              <div
                class="tw-flex-1 tw-m-1 tw-justify-center tw-align-middle"
                @click="playPrevSong()"
              >
                <SkipBackwardIcon
                  class="tw-cursor-pointer tw-text-white"
                  w="30"
                  h="30"
                />
              </div>
              <div class="tw-flex-1 tw-m-1 tw-justify-center tw-align-middle">
                <span @click="playCurrentSong()">
                  <PlayIcon
                    class="tw-cursor-pointer tw-text-white"
                    v-show="!isPlaying && !playerIsLoading"
                    w="30"
                    h="30"
                  />
                </span>
                <span @click="pauseSong()">
                  <PauseIcon
                    class="tw-cursor-pointer tw-text-white"
                    v-show="isPlaying && !playerIsLoading"
                    w="30"
                    h="30"
                  />
                </span>
                <span>
                  <BufferingIcon
                    class="tw-text-white tw-cursor-pointer"
                    animate="beat"
                    v-show="playerIsLoading"
                    w="30"
                    h="30"
                  />
                </span>
              </div>

              <div
                class="tw-flex-1 tw-m-1 tw-justify-center tw-align-middle"
                @click="playNextSong()"
              >
                <SkipForwardIcon
                  class="tw-cursor-pointer tw-text-white"
                  w="30"
                  h="30"
                />
              </div>
              <span class="fa fa-repeat repeat on"></span>
            </section>

            <div id="volume" class="volume-slider" style="width: 10vw;">
              <ProgressBar
                style="background:#ebebeb;"
                @seekedTo="changeVolume"
                :bar-height="volumeHeightPersistent"
                :bar-color="progressColor"
                :bar-shade-color="progressBgColor"
                :intensity="100"
                :current-value="volume"
                :total-value="1"
              />
            </div>
          </div>
        </footer>
      </section>

      <audio id="player"></audio>
    </div>
    <div class="music-bar">
      <div class="music-bar-btns">
        <i
          class="pointer iconfont icon-prev"
          title="上一曲 Ctrl + Left"
          style="font-size: 36px;"
        ></i>
        <div title="播放暂停 Ctrl + Space" class="control-play pointer">
          <i class="iconfont icon-play" style="font-size: 24px;"></i>
        </div>
        <i
          class="pointer iconfont icon-next"
          title="下一曲 Ctrl + Right"
          style="font-size: 36px;"
        >
        </i>
      </div>
      <i
        class="icon-color pointer mode iconfont icon-loop"
        title="列表循环 Ctrl + O"
        style="font-size: 30px;"
      ></i
      ><i
        class="icon-color pointer comment iconfont icon-comment"
        style="font-size: 30px;"
      ></i>
      <div title="音量加减 [Ctrl + Up / Down]" class="music-bar-volume">
        <div data-v-d34f3866="" class="volume">
          <i
            data-v-d34f3866=""
            class="pointer volume-icon iconfont icon-volume"
            style="font-size: 30px;"
          ></i>
          <div data-v-d34f3866="" class="volume-progress-wrapper">
            <div data-v-d34f3866="" class="mmProgress">
              <div class="mmProgress-bar"></div>
              <div class="mmProgress-outer"></div>
              <div class="mmProgress-inner" style="width: 89.6px;">
                <div class="mmProgress-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ProgressBar from "./ProgressBar";
import VTooltip from "v-tooltip";
import "./../assets/tooltip.css";
// import RefreshIcon from "vue-ionicons/dist/ios-refresh";
import SkipBackwardIcon from "vue-ionicons/dist/ios-skip-backward";
import PlayIcon from "vue-ionicons/dist/ios-play";
import PauseIcon from "vue-ionicons/dist/ios-pause";
// import SquareIcon from "vue-ionicons/dist/ios-square";
import SkipForwardIcon from "vue-ionicons/dist/ios-skip-forward";
// import CloseIcon from "vue-ionicons/dist/md-close-circle.vue";
// import RevealIcon from "vue-ionicons/dist/ios-arrow-up.vue";
import BufferingIcon from "vue-ionicons/dist/ios-refresh-circle";
import PlayerMixin from "./../mixins/PlayerMixin";
Vue.use(VTooltip);
Vue.use(ProgressBar);
export default {
  name: "PersistentPlayer",
  components: {
    ProgressBar,
    // RefreshIcon,
    SkipBackwardIcon,
    PlayIcon,
    PauseIcon,
    // SquareIcon,
    SkipForwardIcon,
    // CloseIcon,
    // RevealIcon,
    BufferingIcon,
  },
  mixins: [PlayerMixin],
};
</script>

<style lang="scss">
.music {
  padding: 75px 25px 25px 25px;
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .music-content {
    display: flex;
    width: 100%;
    height: calc("100% - 80px");
    .music-left {
      flex: 1;
      height: 100%;
      overflow: hidden;
      .music-list {
        height: calc("100% - 60px");
      }
    }
    .music-right {
      position: relative;
      width: 310px;
      margin-left: 10px;
    }
  }

  .music-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding-bottom: 15px;
    &.disable {
      pointer-events: none;
      opacity: 0.6;
    }
    .bar-icon {
      display: block;
      // background-image: url("~assets/img/logo.png");
      cursor: pointer;
    }
    .music-bar-btns {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .btn-prev {
      width: 19px;
      min-width: 19px;
      height: 20px;
      background-position: 0 -30px;
    }
    .btn-play {
      width: 21px;
      min-width: 21px;
      height: 29px;
      margin: 0 50px;
      background-position: 0 0;
      &.btn-play-pause {
        background-position: -30px 0;
      }
    }
    .btn-next {
      width: 19px;
      min-width: 19px;
      height: 20px;
      background-position: 0 -52px;
    }
    .music-music {
      position: relative;
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      padding-left: 50px;
      font-size: 12px;
      color: black;
      .music-bar-info {
        height: 15px;
        padding-right: 80px;
        line-height: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .music-bar-time {
        position: absolute;
        top: 0;
        right: 5px;
      }
    }
    .mode-listLoop {
      width: 26px;
      height: 25px;
      margin-left: 20px;
      background-position: 0 -205px;
    }
    .mode-order {
      width: 23px;
      height: 20px;
      margin-left: 23px;
      background-position: 0 -260px;
    }
    .mode-random {
      width: 25px;
      height: 19px;
      margin-left: 21px;
      background-position: 0 -74px;
    }
    .mode-loop {
      width: 26px;
      height: 25px;
      margin-left: 20px;
      background-position: 0 -232px;
    }
    .btn-comment {
      width: 24px;
      height: 24px;
      margin-left: 20px;
      background-position: 0 -400px;
    }
    .music-bar-volume {
      position: relative;
      margin-left: 20px;
      .btn-volume {
        width: 26px;
        height: 21px;
        background-position: 0 -144px;
        &.btn-volume-no {
          background-position: 0 -182px;
        }
      }
      @media (min-width: 768px) {
        width: 150px;
        .btn-volume {
          position: absolute;
          top: -4px;
        }
        .mmProgress {
          margin-left: 30px;
        }
      }
      @media (max-width: 768px) {
        top: 2px;
        width: 26px;
        height: 21px;
      }
    }
  }

  /*遮罩*/
  .mmPlayer-mask,
  .mmPlayer-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .mmPlayer-mask {
    z-index: -1;
    background-color: black;
  }

  .mmPlayer-bg {
    z-index: -2;
    background-image: url("http://cdn.mtnhao.com/music/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(12px);
    opacity: 0.7;
    transform: translateZ(0);
    transition: all 0.8s;
  }

  @media (max-width: 960px) {
    .music-right {
      display: none;
    }
  }
  @media (max-width: 768px) {
    & {
      padding: 75px 15px 5px 15px;
    }

    .music-content .music-left {
      .music-list {
        font-size: 20px;
      }
    }

    .music-bar {
      .music-bar-info span,
      .music-bar-volume .mmProgress {
        display: none;
      }
    }
  }
  @media (max-width: 520px) {
    .music-bar {
      position: relative;
      flex-direction: column;
      .music-bar-btns {
        width: 60%;
        margin-top: 15px;
        order: 2;
      }
      .music-music {
        padding-left: 0;
        order: 1;
      }
      & > i.btn-mode {
        position: absolute;
        top: 44px;
        left: 5px;
        margin: 0;
      }
      .btn-comment {
        position: absolute;
        top: 45px;
        right: 5px;
        width: 26px;
        height: 21px;
      }
      .music-bar-volume {
        display: none;
      }
    }
  }
}
.music-buttons {
  display: flex;
}

$aqua50: #5fbfa4;
$aqua25: #a7dccd;
$metal5: #f3f3f1;
$metal20: #cfd0c8;
$metal50: #868975;
$metal80: #36372f;
$metal90: white;

@keyframes spin-art {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

*,
*:before,
*:after,
*:focus,
*:hover {
  //   -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  //   box-sizing: border-box;
}

body {
  background: $metal90;
  color: $metal20;
  font-family: "helvetica neue", helvetica, arial, sans-serif;
  font-size: 16px;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

#art {
  display: flex;
  height: 22vh;
  box-shadow: 0 3px 10px 0 rgba(darken($metal90, 7%), 0.3);
  overflow: hidden;

  .player {
    position: relative;
    width: 20vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-content: center;

    img {
      position: absolute;
      width: 90%;
      height: calc(20vw * 0.9);
      border-radius: 50%;
      transform-origin: 50% 50%;
    }

    &:after {
      content: "";
      position: absolute;
      z-index: 10;
      top: calc(50% - 2vw);
      left: calc(50% - 2vw);
      background: $metal90;
      height: 4vw;
      width: 4vw;
      border-radius: 50%;
    }

    &.playing {
      img {
        top: 50%;
        left: 50%;
        animation: spin-art 3000ms linear infinite;
      }
    }
  }
  .wide {
    width: 80vw;

    img {
      height: 130%;
      width: 100%;
    }
  }
}

#playlist {
  width: 100vw;
  height: 63vh;
  overflow-y: scroll;
  overflow-x: hidden;

  table {
    width: 100%;

    th,
    td {
      padding: 10px 3%;
      vertical-align: middle;
      text-align: left;
    }

    th {
      color: $metal50;
      font-size: 0.9em;
      padding-top: 15px;
      cursor: default;
    }

    tr {
      cursor: pointer;

      td {
        border-top: 1px solid $metal80;
        transition: background 0.3s ease;

        &.play-pause {
          position: relative;
          height: 40px;
          width: 40px;

          &:before {
            position: absolute;
            content: "\f04b";
            font-family: FontAwesome;
            height: 26px;
            width: 26px;
            top: calc(50% - 13px);
            left: calc(50% - 13px);
            z-index: 3;
            font-size: 1em;
            color: $metal5;
            border-radius: 50%;
            padding: 5px;
            padding-left: 9px;
            box-shadow: inset 0 0 0 1px $metal5;
          }

          &:after {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            content: "";
            background: rgba($metal80, 0.75);
          }

          &:before,
          &:after {
            visibility: hidden;
          }

          img {
            height: 40px;
            width: 40px;
          }
        }
        &:nth-child(2) {
          color: $metal5;
        }
      }

      &.playing td {
        background: darken($metal90, 5%);
        color: $aqua50;

        &:nth-child(2) {
          color: $aqua25;
        }
      }

      &:hover {
        td {
          background: $metal80;

          &.play-pause {
            &:before,
            &:after {
              visibility: visible;
            }
          }
        }
      }
    }
  }
}

#interactions {
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: $metal90;
  height: 15vh;
  overflow: hidden;
  padding: 20px 0;
  box-shadow: 0 -3px 10px 0 rgba(darken($metal90, 7%), 0.3);
}

.tracking-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .song-current-time {
    text-align: right;
  }
  .song-length {
    text-align: left;
  }
  .song-current-time,
  .song-length {
    width: 10vw;
    letter-spacing: 1px;
    font-size: 0.8em;
  }
}

.range {
  clear: both;
  -webkit-appearance: none;
  background: $metal80;
  cursor: pointer;
  height: 3px;
  margin: 0;
  vertical-align: bottom;
  width: 5vw;
  transition: height 0.5s ease;
  transition-delay: 1s;

  &:focus {
    outline: none;
  }

  &:hover {
    height: 10px;
    transition: height 0.3s ease;

    &::-webkit-slider-thumb {
      width: 20px;
      height: 20px;
      transition: height 0.3s ease, width 0.3s ease;
      transition-delay: 0;
    }
  }

  &::-webkit-slider-thumb {
    width: 0;
    height: 0;
    -webkit-appearance: none;
    background: $metal5;
    border-radius: 8px;
    box-shadow: inset 0 0 0 5px #eaeaea;
    transition: height 0.5s ease, width 0.5s ease;
    transition-delay: 1s;
  }
}

.controls-bar {
  display: flex;
  justify-content: space-between;
}

#controls {
  width: 80vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  padding-top: 15px;

  > span {
    font-size: 1em;
    padding: 13px;
    margin: 0 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

    &.play-pause {
      font-size: 1.1em;
      padding: 10px;
      padding-left: 15px;
      box-shadow: inset 0 0 0 1px $metal20;

      &.on {
        padding-left: 12px;
        padding-right: 12px;
        box-shadow: inset 0 0 0 1px $aqua25;
      }
    }

    &:before {
      transition: text-shadow 0.3s ease;
    }

    &.on {
      color: $aqua50;
      border-color: $aqua50;
    }

    &:hover {
      color: $metal5;
      transform: scale(1.1);
      &:before {
        text-shadow: 0 0 5px $metal5;
      }
      &.on {
        color: $aqua25;
        border-color: $aqua25;
      }
    }
  }
}

#volume {
  max-width: 10vw;
  padding: 20px 5% 0 0;
  display: flex;
  align-items: center;

  .fa-volume-down {
    font-size: 0.75em;
  }

  .fa-volume-up {
    font-size: 0.9em;
  }

  .volume-slider {
    width: 10vw;
    margin: 0 1vw;
  }
}
</style>
