<script setup lang="ts">
import Dial from "./components/Dial.vue";
import { ref, shallowRef } from "vue";
import DialBack from "./components/Dials/Default/DialBack.vue";
import DialHead from "./components/Dials/Default/DialHead.vue";
import Lfo from "./components/Lfo.vue";

const state = ref<{
  a: number;
  b: number;
  c: number;
}>({
  a: 0,
  b: 0,
  c: 0,
});

const selectedTarget = shallowRef<"a" | "b" | "c">("a");
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
          v-model="state.a"
          class="h-32 w-32"
        />
        {{ Math.round(state.a) }}
      </div>
      <div class="flex-col flex justify-center items-center">
        <Dial
          :max="100"
          :min="0"
          :offset="30"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="state.b"
          class="h-32 w-32"
        />
        {{ Math.round(state.b) }}
      </div>
      <div class="flex-col flex justify-center items-center">
        <Dial
          :max="100"
          :min="0"
          :offset="30"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="state.c"
          class="h-32 w-32"
        />
        {{ Math.round(state.c) }}
      </div>
    </div>
    <Lfo v-model="state[selectedTarget]" />
  </div>
  <select v-model="selectedTarget">
    <option value="a">a</option>
    <option value="b">b</option>
    <option value="c">c</option>
  </select>
</template>
