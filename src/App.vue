<script setup lang="ts">
import Dial from "./components/Dial.vue";
import { ref } from "vue";
import DialBack from "./components/Dials/Default/DialBack.vue";
import DialHead from "./components/Dials/Default/DialHead.vue";
import Lfo from "./components/Lfo.vue";

const foo = ref<number>(0);
</script>

<template>
  <div class="flex gap-8">
    <div class="flex-col flex justify-center items-center">
      <Dial
        :max="100"
        :min="0"
        :step="0.01"
        :offset="30"
        :default="0"
        :head="DialHead"
        :back="DialBack"
        v-model="foo"
        class="h-32 w-32"
      />
      {{ Math.round(foo) }}
    </div>
    <Lfo v-model="foo" />
  </div>
</template>
