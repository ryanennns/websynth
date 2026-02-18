<template>
  <div class="rounded-md p-2 bg-zinc-400 flex flex-col justify-center gap-4">
    <canvas ref="canvas" />
    <h1 class="text-center font-bold">LFO</h1>
    <div class="flex justify-center items-center">
      <div class="flex flex-col">
        <div class="flex flex-col justify-center items-center">
          <Dial
            :max="2"
            :min="0"
            :step="0.01"
            :offset="30"
            :default="0.01"
            :head="DialHead"
            :back="DialBack"
            v-model="frequency"
            class="h-24 w-24"
          />
          <p>{{ frequency.toFixed(2) }}</p>
          <p>Frequency</p>
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
          :default="0"
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
import { computed, ref } from "vue";
import DialHead from "./Dials/Default/DialHead.vue";
import DialBack from "./Dials/Default/DialBack.vue";
import Dial from "./Dial.vue";
import { counter } from "@/core.ts";

interface Props {
  modelValue: number;
}

defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

let canvas = ref<HTMLCanvasElement>();

let on = ref<boolean>(true);
const phase = ref<number>(0.0);
const offset = ref<number>(0);
const amplitude = ref<number>(0.5);
const frequency = ref<number>(0.5);

const history: (number | undefined)[] = Array.from({
  length: canvas.value?.getContext("2d")!.canvas.width ?? 300,
}).map(() => undefined);
const draw = () => {
  const plotSine = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(66,44,255)";

    let x = 0;
    history.shift();
    history.push(
      height / 2 +
        amplitude.value * Math.sin((x + counter.value) * frequency.value),
    );
    while (x < width) {
      ctx.lineTo(x, history[x]!);
      x++;
    }
    ctx.stroke();
    ctx.save();
  };

  const ctx = canvas.value?.getContext("2d");

  if (!ctx) {
    requestAnimationFrame(draw);
    return;
  }

  ctx.clearRect(0, 0, 500, 500);

  plotSine(ctx);

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);

const v = computed<number>(() => {
  const p = ((2 * Math.PI) / 360) * phase.value;

  return (
    Math.sin(p + frequency.value * counter.value) * amplitude.value +
    offset.value
  );
});
const sin = () => {
  if (!on.value) {
    return;
  }

  emit("update:modelValue", v.value);

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
