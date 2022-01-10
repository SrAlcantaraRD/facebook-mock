<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <InputText type="text" v-model="text" />
  </div>
  <router-view />
  <div class="card">
    <InputText type="text" v-model="text" class="p-ml-2 p-d-inline" />
    <p>{{ text }}</p>
  </div>
  <div class="p-d-flex">
    <div class="p-mr-2 p-order-3 p-order-md-2">{{ address }}</div>
  </div>
</template>

<script lang="ts">
// import Vue from "vue";
// const state = new Vue.observable({
//   name: "John Doe",
//   email: "fake@email.com",
//   username: "jd123",
// });

export default {
  data() {
    return {
      value: null,
    };
  },
  computed: {
    address() {
      return this.$store.state.address;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
