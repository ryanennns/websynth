<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2" v-for="i in x" :key="i">
      <div v-for="j in y" :key="j">
        <div :class="`${c(i, j)}`" @click="() => onClick({ x: i, y: j })"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  x: number;
  y: number;
}

const props = defineProps<Props>();

const m = ref<boolean[][]>(
  Array.from({ length: props.x }).map(() =>
    Array.from({
      length: props.y,
    }).map(() => false),
  ),
);
const c = (x: number, y: number) =>
  "w-6 h-6 cursor-pointer " +
  (!!m.value[x - 1]![y - 1]! ? "bg-purple-500" : "bg-zinc-500");

c(1, 1);

const onClick = (e: { x: number; y: number }) => {
  const v = m.value;
  v![e.x - 1]![e.y - 1] = !v![e.x - 1]![e.y - 1];
  m.value = [...v];
};

const emit = defineEmits(["update:modelValue"]);
watch(m, (newM) => emit("update:modelValue", newM));
</script>
