<template>
<ul class="player-list">
  <li
    :style="'background'"
    :class="
      currentTrackId === count
        ? 'tw-relative hover:tw-bg-green-200 tw-text-left tw-cursor-pointer tw-bg-gray-300 tw-p-2 tw-border-t-2 tw-border-gray-200'
        : 'tw-relative hover:tw-bg-green-200 tw-text-left tw-cursor-pointer tw-p-2 tw-border-t-2 tw-border-gray-200'
    "
    @click="$emit('playItem')"
  >
  <!-- {{ count + 1 + ". "
    }}<span class="tittle tw-z-40"></span> -
    {{ currentTrackId === count ? "" : "" }} -->
    <img class="list-cover" :src="song.cover" />
    <div class="list-info">
      
      <div class="info-title info-title-artist">{{ song.artist }}</div>
      <div class="info-title">{{ song.tittle }}</div>
    
   
    </div>
  </li>
  </ul>
</template>

<script>
import PlayerMixin from "./../mixins/PlayerMixin";
export default {
  name: "SongBlock",
  props: ["song", "count"],
  mixins: [PlayerMixin],
};
</script>

<style lang="scss">
.song-cover {
  width: 100%;
  height: 100%;
  width: 44px;
  height: 44px;
  top: 0;
  left: 0;
  padding: 0;
}
.player-list {
  &:hover {
    background: #e2e8f0;
  }
}
.info-title-artist{
font-weight: bold;
font-size:14px;
}

</style>
