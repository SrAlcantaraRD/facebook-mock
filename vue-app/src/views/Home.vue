<template>
  <div class="home">
    <span v-html="addressImage"></span>

    <div class="card">
      <div class="flex flex-row flex-wrap card-container blue-container">
        <div
          v-for="image in images"
          :key="image.id"
          class="flex align-items-center justify-content-center font-bold text-white border-round"
        >
          <div>
            <span v-html="image.imageContent"></span>
            <!-- <span>{{ image.description }}</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toSvg } from "jdenticon";
import { Options, Vue } from "vue-class-component";

@Options({
  computed: {
    addressImage() {
      return toSvg(this.$store.getters.getSignerAddress, 200);
    },
    images() {
      const _images = this.$store.getters.getSignerImages;

      return _images;
    },
  },
})
export default class Home extends Vue {}
</script>
