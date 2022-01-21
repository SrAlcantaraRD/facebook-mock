import { Decentragram } from "@contracts/Decentragram";
import { createStore } from "vuex";
import Web3 from "web3";
// import { ethers } from "ethers";
// import DecentragramContract from "@/types/artifacts/Decentragram.json";

// console.log({ DecentragramContract });

interface IStore {
  address: string;
  clicks: number;
  decentragram: Decentragram;
  error: string;
}

export const store = createStore<IStore>({
  state: {
    address: "0x0",
    clicks: 1,
    decentragram: null,
    error: null,
  },
  mutations: {
    setAddress(state, _address: string) {
      state.address = _address;
    },
    setClicks(state) {
      state.clicks++;
    },
    setDecentragram(state, _decentragram: Decentragram) {
      state.decentragram = _decentragram;
    },
    setError(state, _error: string) {
      state.error = _error;
    },
  },
  getters: {
    getAddress(state) {
      return state.address;
    },
    getClicks(state) {
      return state.clicks;
    },
    getDecentragram(state) {
      return state.decentragram;
    },
    getError(state) {
      return state.error;
    },
  },
  actions: {
    increaseClicks({ commit, state }) {
      const clicks = state.clicks + 1;

      commit("setClicks", clicks);
    },
    async connect({ commit, dispatch }, { connect }) {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          commit("setError", "Metamask not installed!");
          return;
        }

        if (!(await dispatch("checkIfConnected")) && connect) {
          await dispatch("requestAccess");
        }
      } catch (error) {
        console.log(error);
        commit("setError", "Account request refused.");
      }
    },
    async checkIfConnected({ commit }) {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length === 0) return false;

      commit("setAddress", accounts[0]);

      return true;
    },
    async requestAccess({ commit }) {
      const { ethereum } = window;

      const [address] = await ethereum.enable();

      commit("setAddress", address);
    },
  },
  modules: {},
});

declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
  }
}
