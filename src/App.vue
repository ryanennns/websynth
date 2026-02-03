<script setup lang="ts">
import Dial from "./components/Dial.vue";
</script>

<template>
  <Dial
      :min="0"
      :max="100"
      :step="10"
  />
</template>

<style scoped></style>
