<script setup lang="ts">
import Dial from "./components/Dial.vue";
import {ref, watch} from "vue";
import DialBack from "./components/Dials/Default/DialBack.vue";
import DialHead from "./components/Dials/Default/DialHead.vue";

const foo = ref<number>(0);

let counter = 0;
const sineMulti = ref<number>(0.5);
watch(sineMulti, () => counter = 0)

let on = ref<boolean>(false);
const sin = () => {
  if (!on.value) {
    return;
  }

  const val = Math.sin(sineMulti.value * counter);

  counter += 0.05;

  foo.value = (val * 100) * 0.5 + 50;

  setTimeout(sin, 10);
};

sin();
</script>

<template>
  <div class="flex flex-col gap-8">
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
      {{Math.round(foo)}}
      <button @click="() => (on = !on) && sin()">toggle</button>
    </div>
    <div class="flex-col flex justify-center items-center">
      <Dial
        :max="3"
        :min="0"
        :offset="30"
        :head="DialHead"
        :back="DialBack"
        v-model="sineMulti"
        class="h-32 w-32"
      />
      <p>{{ sineMulti.toFixed(2) }}</p>
      <p>Sine Multiplier</p>
    </div>
  </div>
</template>
