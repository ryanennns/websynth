<template>
  <input type="range" :min="min" :max="max" :step="step" v-model="range"/>
  <p>{{range}}</p>
</template>

<script setup lang="ts">
import {ref} from "vue";

interface Props {
  min: number;
  max: number;
  step: number;
}

defineProps<Props>();

const range = ref<number>(0);
</script>

<style>
input {
  writing-mode: vertical-lr;
}
</style>
