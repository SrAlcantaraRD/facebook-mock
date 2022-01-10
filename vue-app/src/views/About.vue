<template>
  <div class="about">
    <h1>This is an about page</h1>
    <i class="pi pi-check" />
    <i class="pi pi-times" />
    <i class="pi pi-check" style="font-size: 2rem"></i>
    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    <Calendar v-model="value" :inline="true" />
    <Button label="Submit" @click="handleClick" />

    <p>{{ value }}</p>
    <p>{{ clicks }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutPage",
  computed: {
    clicks() {
      return this.$store.getters.getClicks;
    },
    // value() {
    //   const store = useStore();

    //   return store.getters.getAddress;
    // },
  },
  // props: {
  //   message: String,
  // },
  data() {
    return {
      value: null,
    };
  },
  methods: {
    handleClick() {
      this.$store.dispatch("increaseClicks");
    },
  },
});
</script>
