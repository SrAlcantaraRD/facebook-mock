<template>
  <div class="home">
    <span v-html="addressImage"></span>
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
  },
})
export default class Home extends Vue {}
</script>
