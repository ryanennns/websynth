<template>
  <div class="flex flex-row gap-16">
    <div class="flex gap-8 flex-col">
      <div class="flex-col flex justify-center items-center">
        <Dial
          :max="100"
          :min="-100"
          :offset="0"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="generators[0]!"
          class="h-32 w-32"
        />
        <p>{{ Math.round(generators[0]!) }}</p>
      </div>
      <div class="flex-col flex justify-center items-center">
        <Dial
          :max="100"
          :min="0"
          :offset="30"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="generators[1]!"
          class="h-32 w-32"
        />
        <p>{{ Math.round(generators[1]!) }}</p>
      </div>
      <div class="flex-col flex justify-center items-center">
        <Dial
          :max="100"
          :min="0"
          :offset="30"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="generators[2]!"
          class="h-32 w-32"
        />
        <p>{{ Math.round(generators[2]!) }}</p>
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

const generators = ref<number[]>([0, 0, 0]);

const effects = ref<number[]>([0, 0, 0]);

const controlSurfaceX = 3;
const controlSurfaceY = 3;
const controlSurface = ref<boolean[][]>(
  Array.from({ length: controlSurfaceX }).map(() =>
    Array.from({
      length: controlSurfaceY,
    }).map(() => false),
  ),
);

const loop = () => {
  counter.value += 2.5

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
