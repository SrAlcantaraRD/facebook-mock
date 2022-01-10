<template>
  <AppBar />
  <div class="block font-bold text-center p-4 border-round mb-3">
    <router-view />
  </div>
  <vue-metamask userMessage="msg" @onComplete="onComplete"> </vue-metamask>
</template>

<script lang="ts">
import AppBar from "@/components/AppBar.vue";
import Web3 from "web3";
// import VueMetamask from "vue-metamask";

const loadWeb3 = async () => {
  // const _web3 = new Web3(window.ethereum);
  // window.web3 = _web3;
  // await window.ethereum.enable();
  // var _web3 = new Web3(useLocalProvider ? web3Provider : Web3.givenProvider);
  // console.log({ _web3 });
  // if (_web3) setWeb3(_web3);
};

loadWeb3();

export default {
  components: {
    AppBar,
    // VueMetamask,
  },
  data() {
    return {
      msg: "This is demo net work",
    };
  },
  methods: {
    onComplete(data: any) {
      console.log("data:", data);
    },
  },
};
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
