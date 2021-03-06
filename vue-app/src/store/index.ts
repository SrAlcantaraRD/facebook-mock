import DecentragramContract from "@/utils/smarthContracts/Decentragram.sol/Decentragram.json";
import { Decentragram } from "@contractsTypes/Decentragram";
import { BigNumber, ethers } from "ethers";
import { createStore } from "vuex";
import Web3 from "web3";
import { toSvg } from "jdenticon";

const { VUE_APP_DECENTRAGRAM_CONTRACT_ADDRESS } = process.env;

interface IStore {
  signerAddress: string;
  clicks: number;
  error: string;
  signerBalance: string;
  web3: Web3;
  images: Image[];
}

interface Image {
  id: BigNumber;
  hash: string;
  description: string;
  tipAmount: BigNumber;
  autor: string;
}

const PROVIDER = new ethers.providers.Web3Provider(window.ethereum);
const web3 = new Web3("http://127.0.0.1:8545/");
console.log(web3);
// console.log({ c });

export const store = createStore<IStore>({
  state: {
    clicks: 1,
    error: null,
    signerAddress: null,
    signerBalance: null,
    web3: web3,
    images: [],
  },
  mutations: {
    setClicks(state) {
      state.clicks++;
    },
    setError(state, _error: string) {
      state.error = _error;
    },
    setSignerAddress(state, _signerAddress: string) {
      state.signerAddress = _signerAddress;
    },
    setSignerBalance(state, _signerBalance: string) {
      state.signerBalance = _signerBalance;
    },
    setSignerImages(state, _images: Image[]) {
      state.images = _images;
    },
  },
  getters: {
    getClicks({ clicks }) {
      return clicks;
    },
    getError({ error }) {
      return error;
    },
    getSignerAddress({ signerAddress }) {
      return signerAddress;
    },
    getBalance({ signerBalance }) {
      return signerBalance;
    },
    getSignerImages({ images }) {
      return images;
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

        window.ethereum.on("accountsChanged", async () => {
          await dispatch("buildDecentragram");
          await dispatch("loadUserData");
        });

        await dispatch("buildDecentragram");
        await dispatch("loadUserData");

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

    getDecentragramContract() {
      const signer = PROVIDER.getSigner();

      const decentragramContract = new ethers.Contract(
        VUE_APP_DECENTRAGRAM_CONTRACT_ADDRESS,
        DecentragramContract.abi,
        signer
      );

      return decentragramContract;
    },

    async loadUserData({ commit }) {
      const signer = PROVIDER.getSigner();
      const address = await signer.getAddress();

      const _signerBalance = await signer.getBalance();
      const ammout = web3.utils.fromWei(_signerBalance.toString(), "ether");

      const decentragramContract: Decentragram = await this.dispatch(
        "getDecentragramContract"
      );

      const images = [];
      const imagesCounter = Number(await decentragramContract.imageCounter());
      console.log({ imagesCounter });

      for (let index = 0; index <= imagesCounter - 1; index++) {
        const image = await decentragramContract.images(index);
        const tipAmmout = web3.utils.fromWei(image[3].toString(), "ether");

        images.push({
          id: Number(image.id),
          hash: image.hash,
          description: image.description,
          tipAmount: Number(tipAmmout),
          autor: image.autor,
          imageContent: toSvg(image.hash, 200),
        });
      }
      console.log({ images });

      commit("setSignerAddress", address);
      commit("setSignerBalance", ammout);
      commit("setSignerImages", images);
    },
  },
  modules: {},
});

declare global {
  interface Window {
    ethereum: ICustomExternalProvider;
    web3: Web3;
  }
}

interface ICustomExternalProvider extends ethers.providers.ExternalProvider {
  on: (event: string, callback: (...args: any[]) => void) => void;
}
