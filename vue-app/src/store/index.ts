import { createStore } from "vuex";

export const store = createStore({
  state: {
    address: "0x0",
    clicks: 1,
  },
  mutations: {
    setAddress(state, _address: string) {
      state.address = _address;
    },
    setClicks(state) {
      state.clicks++;
    },
  },
  getters: {
    getAddress(state) {
      return state.address;
    },
    getClicks(state) {
      return state.clicks;
    },
  },
  actions: {
    increaseClicks({ commit, state }) {
      const clicks = state.clicks + 1;

      commit("setClicks", clicks);
    },
    reportAddress({ commit, state }, { address }) {
      commit("setAddress", address);
    },
  },
  modules: {},
});
