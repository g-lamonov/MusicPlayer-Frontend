<template>
  <div>
    <song-block
      class="player-list"
      v-for="(song, key) in Songs"
      :song="song"
      :count="key"
      :key="key"
      @playItem="$emit('playSelectSong', key)"
    ></song-block>
  </div>
</template>

<script>
import SongBlock from "./SongBlock";
export default {
  name: "SongsPlaylist",
  components: { SongBlock },
  props: ["Songs"],
};
</script>

<style lang="scss">
.song {
  list-style: none;
  cursor: pointer;
  &:hover {
    background: #f0f7fb;
  }
}
</style>
