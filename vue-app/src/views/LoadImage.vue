<template>
  <div class="loadImagePage">
    <h1>Cargar Imagen</h1>

    <div class="p-fluid grid">
      <div class="field col-12 md:col-12">
        <span class="p-float-label">
          <Textarea id="textarea" v-model="imageDescription" rows="3" />
          <label for="textarea">Descripción</label>
        </span>
      </div>
      <div class="field col-12">
        <span class="p-float-label p-input-icon-left">
          <i class="pi pi-search" />
          <InputText id="inputtext-right" type="text" v-model="imageHash" />
          <label for="inputtext-right">Hash</label>
        </span>
      </div>
      <div class="field col-12">
        <span v-html="imageContent"></span>
      </div>
      <div class="field col-12 md:col-12">
        <Button label="Submit" @click="loadImage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toSvg } from "jdenticon";

import FileUpload from "primevue/fileupload";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import { Options, Vue } from "vue-class-component";
import * as _ from "lodash";

@Options({
  name: "LoadImagePage",
  components: { InputText, Textarea, FileUpload },
  data() {
    return {
      value: null,
      imageContent: null,
      imageHash: null,
      imageDescription: null,
    };
  },
  computed: {},
  watch: {
    // cada vez que la descripcion cambia, se actualiza el hash y con este, la imagen relacionada con el hash
    imageDescription: function () {
      this.debouncedUpdateHash();
    },
  },

  async created() {
    this.debouncedUpdateHash = _.debounce(this.loadImage, 500);
  },
  methods: {
    async loadImage() {
      const hash = await this.hash(this.imageDescription);
      const _hex = this.in_hex(hash);

      this.imageHash = _hex;
      this.imageContent = toSvg(_hex, 200);
    },
    uploadToSmartcontract(event) {
      const files = event.dataTransfer
        ? event.dataTransfer.files
        : event.target.files;
      console.log({ files });

      // const data = await this.IPFS.add(event.files);
      // this.imageHash = data.hash;
      // console.log(data);
    },
    async hash(message: string) {
      const text_encoder = new TextEncoder();
      const data = text_encoder.encode(message);
      const message_digest = await window.crypto.subtle.digest("SHA-512", data);

      return message_digest;
    },
    in_hex(data: ArrayBuffer) {
      const octets = new Uint8Array(data);

      const hex = [].map
        .call(octets, (octet) => octet.toString(16).padStart(2, "0"))
        .join("");

      return hex;
    },
  },
})
export default class LoadImagePage extends Vue {}
</script>

<style scoped>
/* #sizes {
  #p-inputtext {
    display: block;
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
} */

.field * {
  display: block;
}
</style>
