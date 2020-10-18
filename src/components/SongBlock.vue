<template>
  <li
    :style="'background'"
    :class="
      currentTrackId === count
        ? 'tw-relative hover:tw-bg-green-200 tw-text-left tw-cursor-pointer tw-bg-gray-300 tw-p-2 tw-border-t-2 tw-border-gray-200'
        : 'tw-relative hover:tw-bg-green-200 tw-text-left tw-cursor-pointer tw-p-2 tw-border-t-2 tw-border-gray-200'
    "
    @click="$emit('playItem')"
  >
    <img class="song-cover" :src="song.cover" />
    {{ count + 1 + ". "
    }}<span class="tittle tw-z-40">{{ song.tittle }}</span> -
    <span class="tw-font-bold tw-z-40">{{ song.artist }}</span>
    {{ currentTrackId === count ? "" : "" }}
    <span
      :style="
        'background: rgba(0,255,0, .2); width: ' +
          (currentTrackTime / currentTrackDuration) * 100 +
          '%;'
      "
    ></span>
  </li>
</template>

<script>
import PlayerMixin from "./../mixins/PlayerMixin";
export default {
  name: "SongBlock",
  props: ["song", "count"],
  mixins: [PlayerMixin],
};
</script>

<style scoped>
.song-cover {
  width: 100%;
  height: 100%;
  width: 44px;
  height: 44px;
  top: 0;
  left: 0;
  padding: 0;
}
</style>
