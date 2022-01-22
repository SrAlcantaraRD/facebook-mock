import DecentragramContract from "@/utils/smarthContracts/Decentragram.sol/Decentragram.json";
import { Decentragram } from "@contractsTypes/Decentragram";
import { ethers } from "ethers";
import { createStore } from "vuex";
import Web3 from "web3";

const { VUE_APP_DECENTRAGRAM_CONTRACT_ADDRESS } = process.env;

interface IStore {
  signerAddress: string;
  clicks: number;
  decentragram: Decentragram;
  error: string;
}
const PROVIDER = new ethers.providers.Web3Provider(window.ethereum);

export const store = createStore<IStore>({
  state: {
    clicks: 1,
    decentragram: null,
    error: null,
    signerAddress: null,
  },
  mutations: {
    setClicks(state) {
      state.clicks++;
    },
    setDecentragram(state, _decentragram: Decentragram) {
      state.decentragram = _decentragram;
    },
    setError(state, _error: string) {
      state.error = _error;
    },
    setSignerAddress(state, _signerAddress: string) {
      state.signerAddress = _signerAddress;
    },
  },
  getters: {
    getClicks({ clicks }) {
      return clicks;
    },
    getDecentragram({ decentragram }) {
      return decentragram;
    },
    getError({ error }) {
      return error;
    },
    getSignerAddress({ signerAddress }) {
      return signerAddress;
    },
  },
  actions: {
    increaseClicks({ commit, state }) {
      const clicks = state.clicks + 1;

      commit("setClicks", clicks);
    },
    async connect({ commit, dispatch }) {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          commit("setError", "Metamask not installed!");
          return;
        }

        if (!(await dispatch("checkIfConnected"))) {
          console.log("Conectado...");
          await dispatch("requestAccess");
        }

        console.log("¡Conectado!");

        await dispatch("loadSmartContractData");
        await dispatch("buildDecentragram");

        commit("setError", "Execute connection to ethereum process.");
      } catch (error) {
        console.log(error);
        commit("setError", "Account request refused.");
      }
    },
    async checkIfConnected() {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });

      return accounts.length > 0;
    },
    async requestAccess() {
      await PROVIDER.send("eth_requestAccounts", []);
    },
    async loadSmartContractData({ commit }) {
      const signer = PROVIDER.getSigner();
      const address = await signer.getAddress();

      const decentragramContract = new ethers.Contract(
        VUE_APP_DECENTRAGRAM_CONTRACT_ADDRESS,
        DecentragramContract.abi,
        signer
      );

      const images = await decentragramContract.functions.imageCounter();
      console.log(images);

      commit("setDecentragram", decentragramContract);
      commit("setSignerAddress", address);
    },
  },
  modules: {},
});

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
    web3: Web3;
  }
}
