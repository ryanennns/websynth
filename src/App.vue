<script setup lang="ts">
import Dial from "./components/Dial.vue";
import DialBack from "./components/Dials/Default/DialBack.vue";
import DialHead from "./components/Dials/Default/DialHead.vue";
import Lfo from "./components/Lfo.vue";
import { matrix } from "@/controllers.ts";
</script>

<template>
  <div class="flex flex-row gap-16">
    <div class="flex gap-8 flex-col">
      <div class="flex-col flex justify-center items-center">
        <Dial
          :max="100"
          :min="0"
          :offset="30"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="matrix[0]![0]!"
          class="h-32 w-32"
        />
        {{ Math.round(matrix[0]![0]!) }}
      </div>
      <div class="flex-col flex justify-center items-center">
        <Dial
          :max="100"
          :min="0"
          :offset="30"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="matrix[0]![1]!"
          class="h-32 w-32"
        />
        {{ Math.round(matrix[0]![1]!) }}
      </div>
      <div class="flex-col flex justify-center items-center">
        <Dial
          :max="100"
          :min="0"
          :offset="30"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="matrix[0]![2]!"
          class="h-32 w-32"
        />
        {{ Math.round(matrix[0]![2]!) }}
      </div>
    </div>
    <Lfo v-model="matrix[0]![0]!" />
  </div>
</template>
