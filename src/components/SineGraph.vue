<template>
  <canvas ref="canvas" />
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  modelValue: number;
}

const props = defineProps<Props>();

let canvas = ref<HTMLCanvasElement>();

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
    history.push(height / 2 + props.modelValue);
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
</script>
