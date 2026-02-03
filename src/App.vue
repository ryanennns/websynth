<script setup lang="ts">
import Dial from "./components/Dial.vue";
import { ref, watch } from "vue";
import DialBack from "./components/Dials/Default/DialBack.vue";
import DialHead from "./components/Dials/Default/DialHead.vue";

const foo = ref<number>(0);
watch(foo, (newVal) => console.log(newVal));
</script>

<template>
  <div class="h-screen flex-col flex justify-center items-center">
    <Dial
      :step="30"
      :offset="30"
      :head="DialHead"
      :back="DialBack"
      class="h-32 w-32"
      v-model="foo"
    />
    {{ foo }}
  </div>
</template>

<style scoped></style>
