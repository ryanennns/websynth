<script setup lang="ts">
import Dial from "./components/Dial.vue";
import { ref, watch } from "vue";

const foo = ref<number>();
watch(foo, (newVal) => console.log(newVal));
</script>

<template>
  <div class="h-screen flex-col flex justify-center items-center">
    <Dial :min="0" :max="100" :step="15" :offset="30" v-model="foo" />
    {{foo}}
  </div>
</template>

<style scoped></style>
