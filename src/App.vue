<script setup lang="ts">
import Dial from "./components/Dial.vue";
import { computed, ref, watch } from "vue";
import DialBack from "./components/Dials/Default/DialBack.vue";
import DialHead from "./components/Dials/Default/DialHead.vue";

const foo = ref<number>(0);
const bar = ref<number>(0);
const see = ref<number>(0.5);

const sineMulti = computed<number>(() => see.value * 3);

let counter = 0;
let on = ref<boolean>(false);
const sin = () => {
  if (!on.value) {
    return;
  }

  const val = Math.sin(sineMulti.value * counter);

  counter += 0.05;

  foo.value = val * 0.5 + 0.5;
  bar.value = val * 100;

  setTimeout(sin, 10);
};

sin();
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex-col flex justify-center items-center">
      <Dial
        :step="0.01"
        :offset="30"
        :default="0.5"
        :head="DialHead"
        :back="DialBack"
        v-model="foo"
        class="h-32 w-32"
      />
      <button @click="() => (on = !on) && sin()">toggle</button>
    </div>
    <div class="flex-col flex justify-center items-center">
      <Dial
        :offset="30"
        :default="0.5"
        :head="DialHead"
        :back="DialBack"
        v-model="see"
        class="h-32 w-32"
      />
      <p>{{ sineMulti }}</p>
      <p>Sine Multiplier</p>
    </div>
  </div>
</template>
