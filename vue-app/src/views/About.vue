<template>
  <div class="about">
    <h1>This is an about page</h1>
    <i class="pi pi-check" />
    <i class="pi pi-times" />
    <i class="pi pi-check" style="font-size: 2rem"></i>
    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    <Calendar v-model="value" :inline="true" />
    <Button label="Submit" @click="handleClick(value)" />

    <p>{{ value }}</p>
    <p>{{ clicks }}</p>
  </div>
</template>

<script lang="ts">
import Calendar from "primevue/calendar";
import { Options, Vue } from "vue-class-component";
import Button from "primevue/button";

@Options({
  components: {
    Calendar,
    Button,
  },
})
export default class About extends Vue {
  message = "Hello World!";
  value = null;
  clicks = 0;

  handleClick = (value: string) => {
    this.clicks++;
    console.log({ cli: this.clicks });
  };
}
</script>
