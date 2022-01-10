<template>
  <div id="panel-container" class="flex">
    <div
      class="flex-none flex align-items-center justify-content-center font-bold m-2 px-5 py-3 border-round"
    >
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
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
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppBar",
  computed: {
    address() {
      return this.$store.state.address;
    },
  },
});
</script>
>

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
