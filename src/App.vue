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
      :step="0.1"
      :offset="30"
      :default="0.5"
      :head="DialHead"
      :back="DialBack"
      v-model="foo"
      class="h-32 w-32"
    />
    <button @click="foo += 0.05">increment</button>
  </div>
</template>
