<template>
  <div class="rounded-md p-2 bg-zinc-400 flex flex-col justify-center gap-4">
    <div class="flex justify-center items-center">
      <h1>LFO</h1>
      <div class="flex flex-col">
        <div class="flex flex-col justify-center items-center">
          <Dial
            :max="5"
            :min="0"
            :step="0.15"
            :offset="30"
            :default="0.75"
            :head="DialHead"
            :back="DialBack"
            v-model="coefficient"
            class="h-24 w-24"
          />
          <p>{{ coefficient.toFixed(2) }}</p>
          <p>Rate</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <Dial
            :max="100"
            :min="0"
            :step="1"
            :offset="30"
            :default="25"
            :head="DialHead"
            :back="DialBack"
            v-model="amplitude"
            class="h-24 w-24"
          />
          <p>{{ amplitude.toFixed(2) }}</p>
          <p>Amplitude</p>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <Dial
          :max="100"
          :min="-100"
          :step="1"
          :offset="30"
          :default="50"
          :head="DialHead"
          :back="DialBack"
          v-model="offset"
          class="h-24 w-24"
        />
        <p>{{ offset.toFixed(2) }}</p>
        <p>Offset</p>
        <Dial
          :max="360"
          :min="0"
          :step="15"
          :default="0"
          :head="DialHead"
          :back="DialBack"
          v-model="phase"
          class="h-24 w-24"
        />
        <p>{{ phase.toFixed(2) }}</p>
        <p>Phase</p>
      </div>
    </div>
    <button class="bg-zinc-900 text-white" @click="onclick">
      {{ on ? "stop" : "start" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DialHead from "./Dials/Default/DialHead.vue";
import DialBack from "./Dials/Default/DialBack.vue";
import Dial from "./Dial.vue";
import { counter } from "@/core.ts";

interface Props {
  modelValue: number;
}

defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

let on = ref<boolean>(true);
const phase = ref<number>(0.0);
const offset = ref<number>(0);
const amplitude = ref<number>(0.5);
const coefficient = ref<number>(0.5);

const sin = () => {
  if (!on.value) {
    return;
  }

  const p = ((2 * Math.PI) / 360) * phase.value;

  const value =
    Math.sin(p + coefficient.value * counter.value) * amplitude.value +
    offset.value;

  emit("update:modelValue", value);

  setTimeout(sin, 10);
};

sin();

const onclick = () => {
  on.value = !on.value;

  if (on.value) {
    sin();
  }

  if (!on.value) {
    emit("update:modelValue", 0);
  }
};
</script>
