<script setup lang="ts">
import Dial from "./components/Dial.vue";
import { ref, watch } from "vue";
import DialBack from "./components/Dials/Default/DialBack.vue";
import DialHead from "./components/Dials/Default/DialHead.vue";

const foo = ref<number>(0);

let counter = 0;
const sineMulti = ref<number>(0.5);
const sineAmpli = ref<number>(0.5);
const sineOffset = ref<number>(0);

// watch(sineOffset, () => console.log(sineOffset.value));

watch([sineMulti, sineAmpli, sineOffset], () => (counter = 0));

let on = ref<boolean>(false);
const sin = () => {
  if (!on.value) {
    return;
  }

  const val = Math.sin(sineMulti.value * counter);

  counter += 0.05;

  foo.value = val * sineAmpli.value + sineOffset.value;

  setTimeout(sin, 10);
};

sin();
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
      <button @click="() => (on = !on) && sin()">toggle</button>
    </div>
    <div class="bg-gray-400 flex justify-center items-center">
      <h1>LFO</h1>
      <div class="flex flex-col">
        <div class="flex flex-col justify-center items-center">
          <Dial
            :max="3"
            :min="0"
            :step="1"
            :offset="30"
            :head="DialHead"
            :back="DialBack"
            v-model="sineMulti"
            class="h-24 w-24"
          />
          <p>{{ sineMulti.toFixed(2) }}</p>
          <p>Rate</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <Dial
            :max="100"
            :min="0"
            :step="1"
            :offset="30"
            :default="50"
            :head="DialHead"
            :back="DialBack"
            v-model="sineAmpli"
            class="h-24 w-24"
          />
          <p>{{ sineAmpli.toFixed(2) }}</p>
          <p>Amplitude</p>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <Dial
          :max="100"
          :min="-100"
          :step="1"
          :offset="30"
          :default="1"
          :head="DialHead"
          :back="DialBack"
          v-model="sineOffset"
          class="h-32 w-32"
        />
        <p>{{ sineOffset.toFixed(2) }}</p>
        <p>Offset</p>
      </div>
    </div>
  </div>
</template>
