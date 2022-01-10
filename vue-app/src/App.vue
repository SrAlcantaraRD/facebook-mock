<template>
  <AppBar />
  <div class="block font-bold text-center p-4 border-round mb-3">
    <router-view />
  </div>
  <!-- <vue-metamask userMessage="msg" @onComplete="onComplete"> </vue-metamask> -->
</template>

<script lang="ts">
import AppBar from "@/components/AppBar.vue";
import Web3 from "web3/dist/web3.min.js";
// import Web3 from "web3";

export default {
  components: {
    AppBar,
  },
  data() {
    return {
      msg: "This is demo net work",
    };
  },
  async mounted() {
    await this.checkWeb3();
  },
  methods: {
    async checkWeb3() {
      const web3: Web3 = new Web3(Web3.givenProvider);

      if (this.web3 == undefined) this.web3 = web3;

      console.log({ web3: this.web3 });
      // eslint-disable-next-line
      // @ts-ignore
      const accounts: string[] = await window.ethereum.enable();

      if (accounts?.length > 0)
        this.$store.dispatch("reportAddress", { address: accounts.pop() });
    },
    // checkAccounts() {
    //   if (this.web3 === null) return;
    //   this.web3.eth.getAccounts((err, accounts) => {
    //     console.log();
    //     if (err != null)
    //       return this.Log(this.MetamaskMsg.NETWORK_ERROR, "NETWORK_ERROR");
    //     if (accounts.length === 0) {
    //       this.MetaMaskAddress = "";
    //       this.Log(this.MetamaskMsg.EMPTY_METAMASK_ACCOUNT, "NO_LOGIN");
    //       return;
    //     }
    //     this.MetaMaskAddress = accounts[0]; // user Address
    //   });
    // },
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
