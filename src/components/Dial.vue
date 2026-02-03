<template>
  <div class="flex flex-col align-center items-center">
    <DialBack @mousedown="handleMouseDown" class="h-32 w-32">
      <DialHead :rotation="rotation" />
    </DialBack>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import DialHead from "./Dials/Default/DialHead.vue";
import DialBack from "./Dials/Default/DialBack.vue";

interface Props {
  min: number;
  max: number;
  step: number;
  offset: number | undefined;
}

const props = defineProps<Props>();

const initMousePosition = ref<{ x: number; y: number } | undefined>(undefined);

const offset = props.offset ?? 0;
const startRotation = computed<number>(() => -180 + offset);
const range = computed<number>(() => 360 - 2 * offset);

const mouseYOnStart = ref<number | undefined>(undefined);
const degreesOnStart = ref<number>(0);
const degrees = ref<number>(0);
const rotation = computed<number>(() => degrees.value + startRotation.value);

const normalizedValue = computed<number>(() => degrees.value / range.value);
const handleMouseDown = (event: any) => {
  initMousePosition.value = {
    x: event.clientX,
    y: event.clientY,
  };

  mouseYOnStart.value = event.clientY;
  degreesOnStart.value = degrees.value;
};

addEventListener("mouseup", () => {
  if (!mouseYOnStart.value) {
    return;
  }

  mouseYOnStart.value = undefined;
});

addEventListener("mousemove", (event: any) => {
  if (!mouseYOnStart.value) {
    return;
  }

  degrees.value = Math.max(
    0,
    Math.min(
      degreesOnStart.value + (mouseYOnStart.value - event.clientY),
      range.value,
    ),
  );
});

const emit = defineEmits(['update:modelValue'])
watch(normalizedValue, (newValue) => emit("update:modelValue", newValue))
</script>
