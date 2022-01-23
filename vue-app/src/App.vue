<template>
  <AppBar />
  <div class="block font-bold text-center p-4 border-round mb-3">
    <router-view />
  </div>
  <!-- <vue-metamask userMessage="msg" @onComplete="onComplete"> </vue-metamask> -->
</template>

<script lang="ts">
import AppBar from "@/components/AppBar.vue";

import { Options, Vue } from "vue-class-component";

@Options({
  components: { AppBar },
  async mounted() {
    await this.$store.dispatch("connect", { connect: true });
  },
})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
