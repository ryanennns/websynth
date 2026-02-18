<template>
  <div class="flex flex-row gap-16 p-4">
    <div class="grid grid-rows-2 grid-cols-2 gap-3">
      <div
        class="flex-col flex justify-center items-center"
        v-for="i in controlSurfaceX"
        :key="i"
      >
        <Dial
          :max="100"
          :min="-100"
          :offset="0"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="generators[i - 1]!"
          class="h-32 w-32"
        />
        <p>{{ Math.round(generators[i - 1]!) }}</p>
        <SineGraph :model-value="generators[i - 1]!" />
      </div>
    </div>
    <Lfo v-model="effects[0]!" />
    <Lfo v-model="effects[1]!" />
    <Lfo v-model="effects[2]!" />
  </div>
  <div class="p-12">
    <MatrixComponent
      :x="controlSurfaceX"
      :y="controlSurfaceY"
      v-model="controlSurface"
    />
  </div>
</template>

<script setup lang="ts">
import Dial from "@/components/Dial.vue";
import DialBack from "@/components/Dials/Default/DialBack.vue";
import DialHead from "@/components/Dials/Default/DialHead.vue";
import Lfo from "@/components/Lfo.vue";
import MatrixComponent from "@/components/Matrix.vue";
import { ref } from "vue";
import { counter } from "@/core.ts";
import SineGraph from "@/components/SineGraph.vue";

const controlSurfaceX = 4;
const controlSurfaceY = 3;

const generators = ref<number[]>(
  Array.from({ length: controlSurfaceX }).map(() => 0),
);
const effects = ref<number[]>(
  Array.from({ length: controlSurfaceY }).map(() => 0),
);

const controlSurface = ref<boolean[][]>(
  Array.from({ length: controlSurfaceX }).map(() =>
    Array.from({
      length: controlSurfaceY,
    }).map(() => false),
  ),
);

const loop = () => {
  counter.value += 2.5;

  generators.value = generators.value.map(() => 0);

  for (let gen = 0; gen < controlSurface.value.length; gen++) {
    for (let eff = 0; eff < controlSurface.value[gen]!.length; eff++) {
      if (controlSurface.value![gen]![eff]) {
        generators.value[gen]! += effects.value![eff] || 0;
      }
    }
  }

  setTimeout(loop, 10);
};

loop();
</script>
