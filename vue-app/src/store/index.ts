import { Decentragram } from "@contractsTypes/Decentragram";
import { ethers, Signer } from "ethers";
import { createStore } from "vuex";
import Web3 from "web3";

// console.log({ DecentragramContract });

interface IStore {
  signerAddress: string;
  signer: Signer;
  provider: ethers.providers.Web3Provider;
  clicks: number;
  decentragram: Decentragram;
  error: string;
}

export const store = createStore<IStore>({
  state: {
    signer: null,
    clicks: 1,
    provider: null,
    decentragram: null,
    error: null,
    signerAddress: null,
  },
  mutations: {
    async setSigner(state, _signer: Signer) {
      const address = await _signer.getAddress();

      state.signer = _signer;
      state.signerAddress = address;
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
    setProvider(state, _provider: ethers.providers.Web3Provider) {
      state.provider = _provider;
    },
  },
  getters: {
    getSigner({ signer }) {
      return signer;
    },
    getClicks({ clicks }) {
      return clicks;
    },
    getDecentragram({ decentragram }) {
      return decentragram;
    },
    getError({ error }) {
      return error;
    },
    getProvider({ provider }) {
      return provider;
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
    async connect({ commit, dispatch }, { connect }) {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          commit("setError", "Metamask not installed!");
          return;
        }

        if (await dispatch("checkIfConnected")) {
          await dispatch("buildDecentragram");
          return;
        }

        if (connect) {
          await dispatch("requestAccess");
          return;
        }

        commit("setError", "Execute connection to ethereum process.");
        throw "Execute connection to ethereum process";

        // TODO: Crear contrato con Decentragram.sol
      } catch (error) {
        console.log(error);
        commit("setError", "Account request refused.");
      }
    },
    async checkIfConnected({ commit, state: { provider } }) {
      const _provider =
        provider || new ethers.providers.Web3Provider(window.ethereum);

      const { _address } = _provider.getSigner();

      if (!provider) commit("setProvider", _provider);

      return !!_address;
    },
    async requestAccess({ commit, dispatch, state: { provider } }) {
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();

      commit("setSigner", signer);

      await dispatch("buildDecentragram");
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
