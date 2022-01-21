import { Decentragram } from "@contracts/Decentragram";
import { createStore } from "vuex";
// import { ethers } from "ethers";
// import DecentragramContract from "@/types/artifacts/Decentragram.json";

// console.log({ DecentragramContract });

interface IStore {
  address: string;
  clicks: number;
  decentragram: Decentragram;
}

export const store = createStore<IStore>({
  state: {
    address: "0x0",
    clicks: 1,
    decentragram: null,
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
  },
  getters: {
    getAddress(state) {
      return state.address;
    },
    getClicks(state) {
      return state.clicks;
    },
    setDecentragram(state) {
      return state.decentragram;
    },
  },
  actions: {
    increaseClicks({ commit, state }) {
      const clicks = state.clicks + 1;

      commit("setClicks", clicks);
    },
    reportAddress({ commit }, { address }) {
      commit("setAddress", address);
    },
  },
  modules: {},
});
