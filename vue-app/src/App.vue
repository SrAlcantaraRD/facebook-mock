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
    <div class="p-mr-2 p-order-3 p-order-md-2">Item 1</div>
    <div class="p-mr-2 p-order-1 p-order-md-3">Item 2</div>
    <div class="p-mr-2 p-order-2 p-order-md-1">Item 3</div>
  </div>
</template>

<script>
import Vue from "vue";
console.log({ Vue });
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
