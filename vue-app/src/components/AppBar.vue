<template>
  <div id="panel-container" class="flex">
    <div
      class="flex-none flex align-items-center justify-content-center font-bold m-2 px-5 py-3 border-round"
    >
      <router-link :to="item.to" v-for="item in items" :key="item.label">
        <div
          class="flex align-items-center justify-content-center h-4rem font-bold text-white border-round m-2 p-2"
        >
          {{ item.label }}
        </div>
      </router-link>
    </div>
    <div
      class="flex-grow-1 flex align-items-center justify-content-center font-bold m-2 px-5 py-3 border-round"
    />
    <div
      class="flex-none flex align-items-center justify-content-center font-bold m-2 px-5 py-3 border-round"
    >
      <div class="p-text-justify">{{ address }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
  data() {
    return {
      items: [
        {
          to: "/",
          label: "Home",
        },
        {
          to: "/loadImage",
          label: "LoadImage",
        },
        {
          to: "/about",
          label: "About",
        },
      ],
    };
  },
  computed: {
    address() {
      return this.$store.getters.getSignerAddress;
    },
  },
})
export default class AppBar extends Vue {}
</script>

<style scoped>
#panel-container {
  background-color: var(--primary-color);
  color: var(--text-color);
}

#panel-container a {
  font-weight: bold;
  color: var(--text-color-text);
}

#panel-container a.router-link-exact-active {
  color: var(--primary-color-text);
}
</style>
