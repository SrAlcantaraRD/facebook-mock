<template>
  <div class="home">
    QmNRCQWfgze6AbBCaT1rkrkV5tJ2aP4oTNPb5JZcXYywve
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
