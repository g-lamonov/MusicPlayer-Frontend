<template>
  <div class="app">
    <div class="route-container">
      <div class="tw-flex tw-flex-col tw-items-center tw-mt-4">
        <div class="tw-inline-flex tw-flex-col tw-items-center">
          <div class="tw-inline-flex tw-flex-row"></div>
          <div
            class="tw-inline-flex tw-flex-row tw-items-center tw-align-middle tw-mt-2"
          ></div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
// import PersistentPlayer from './components/PersistentPlayer'
import { mapActions } from "vuex";
export default {
  name: "Player",
  components: {
    // PersistentPlayer
  },
  data() {
    return {
      demoPlaylist: [
        {
          audio:
            "https://raw.githubusercontent.com/g-lamonov/MusicPlayer-Frontend/master/mp3/August%20Roman%20-%20What%20You%20Did%20To%20Me.mp3",
          artist: "August Roman",
          tittle: ".mp3",
          album: "",
          cover: "https://i.ytimg.com/vi/sDbi-B9gZVI/maxresdefault.jpg",
        },
        {
          audio:
            "https://raw.githubusercontent.com/g-lamonov/MusicPlayer-Frontend/master/mp3/Defqwop%20-%20Heart%20Afire%20(feat.%20Strix)%20(LETRA)%20SUBTITULOS%20-%20ESPA%C3%91OL.mp3",
          artist: "Defqwop",
          tittle: "Heart Afire (feat. Strix)",
          album: "",
          cover:
            "https://i1.sndcdn.com/artworks-000164112282-d7xlof-t500x500.jpg",
        },
        {
          audio:
            "http://raw.githubusercontent.com/g-lamonov/MusicPlayer-Frontend/master/mp3/Diamond%20Eyes%20-%20Stars%20(LETRA)%20SUBTITULOS%20-%20ESPAÑOL.mp3",
          artist: "Diamond Eyes",
          tittle: "Stars",
          album: "",
          cover:
            "https://i1.sndcdn.com/artworks-000527427378-m040dc-t500x500.jpg",
        },
        {
          audio:
            "http://raw.githubusercontent.com/g-lamonov/MusicPlayer-Frontend/master/mp3/Distrion%20_%20Electro-Light%20-%20Drakkar%20%5BNCS%20Release%5D.mp3",
          artist: "Distrion & Electro-Light",
          tittle: "Drakkar",
          album: "",
          cover:
            "https://avatars.yandex.net/get-music-content/103235/b3809cb9.a.6126526-1/m1000x1000",
        },
        {
          audio:
            "http://raw.githubusercontent.com/g-lamonov/MusicPlayer-Frontend/master/mp3/TakeFive%20-%20Tell%20Me.mp3",
          artist: "TakeFive",
          tittle: "Tell Me",
          album: "",
          cover:
            "https://i1.sndcdn.com/artworks-000179956094-po58ps-t500x500.jpg",
        },
        {
          audio:
            "http://raw.githubusercontent.com/g-lamonov/MusicPlayer-Frontend/master/mp3/RYLLZ%20-%20Nemesis.mp3",
          artist: "RYLLZ",
          tittle: "Nemesis",
          album: "",
          cover:
            "https://i1.sndcdn.com/artworks-000579301445-fwmt1q-t500x500.jpg",
        },
        {
          audio:
            "http://raw.githubusercontent.com/g-lamonov/MusicPlayer-Frontend/master/mp3/Koven%20x%20ROY%20-%20About%20Me%20%5BNCS%20Release%5D.mp3",
          artist: "Koven x ROY",
          tittle: "About Me [NCS Release]",
          album: "",
          cover:
            "https://i1.sndcdn.com/artworks-000538864842-65y640-t500x500.jpg",
        },
        {
          audio:
            "http://raw.githubusercontent.com/g-lamonov/MusicPlayer-Frontend/master/mp3/Imagine%20Dragons%20-%20Believer%20(Romy%20Wave%20Cover)%20(NSG%20Remix)%20(promusic.me).mp3",
          artist: "Imagine Dragons",
          tittle: "Believer (Romy Wave Cover) (NSG Remix)",
          album: "",
          cover: "https://i.ytimg.com/vi/R-xlrYNidY4/maxresdefault.jpg",
        },
        {
          audio:
            "http://raw.githubusercontent.com/g-lamonov/MusicPlayer-Frontend/master/mp3/HOPEX%20-%20Conquer.mp3",
          artist: "HOPEX ",
          tittle: "Conquer",
          album: "",
          cover: "https://i.ytimg.com/vi/kvKqnNZRdC0/maxresdefault.jpg",
        },
      ],
    };
  },
  mounted() {
    this.updatePlaylist(this.demoPlaylist);
  },
  methods: {
    ...mapActions(["updatePlaylist"]),
  },
};
</script>

<style lang="scss">
.app {
  tw-font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-tw-font-smoothing: tw-antialiased;
  -motw-z-osx-tw-font-smoothing: grayscale;
  tw-text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding-top: 4.5rem;
  height: 100%;
}
.route-container {
  width: 80%;
  max-width: 1250px;
  margin: 0 auto;
  margin-top: 2rem;
  padding-bottom: 2rem;
}
.header-wrapper {
  tw-justify-content: center;
  tw-align-items: center;
}
.logo,
.player-name {
}
.logo {
  margin-left: 20px;
  height: 40px;
  width: auto;
}
.player {
  @at-root #{&}-controls {
    background-color: #fff;
    height: 80px;
    padding: 1rem;
    margin-bottom: 2rem;
    background-color: #fff;
    border-radius: 0.25rem;
    border: thin solid #e0e0e0;
  }
}
</style>
