<script setup lang="ts">
import Dial from "./components/Dial.vue";
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <Dial :min="0" :max="100" :step="10" :offset="30" />
  </div>
</template>

<style scoped></style>
