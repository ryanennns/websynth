<script setup lang="ts">
import Dial from "./components/Dial.vue";
import { ref, watch } from "vue";

const foo = ref<number>(0);
watch(foo, (newVal) => console.log(newVal));
</script>

<template>
  <div class="h-screen flex-col flex justify-center items-center">
    <Dial
      class="h-32 w-32"
      :step="15"
      :offset="30"
      :default="0.5"
      v-model="foo"
    />
    {{ foo }}
  </div>
</template>

<style scoped></style>
