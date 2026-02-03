<template>
  <div class="flex flex-col align-center items-center">
    <component :is="back">
      <component
        :is="head"
        :rotation="dialHeadRotation"
        @mousewheel="handleMousewheel"
        @mousedown="handleMouseDown"
      />
    </component>
    <p>{{ normalized }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { clampBetween } from "../helpers/helpers.ts";

interface Props {
  modelValue: number;
  step?: number;
  offset?: number;
  default?: number;
  head?: any;
  back?: any;
}

const props = defineProps<Props>();

const offset = computed<number>(() => props.offset ?? 0);
const step = computed<number>(() => props.step ?? 1);
const range = computed<number>(() => 360 - 2 * offset.value);

const mouseYOnMouseDown = ref<number | undefined>(undefined);
const valueOnMouseDown = ref<number>(0);

const zeroValueRotation = computed<number>(() => -180 + offset.value);
const dialHeadRotation = computed<number>(
  () => zeroValueRotation.value + degrees.value,
);

const degrees = ref<number>(0);
const setDegrees = (val: number) =>
  (degrees.value = clampBetween(
    0,
    range.value,
    Math.ceil(val / step.value) * step.value,
  ));

const normalized = computed<number>(() => degrees.value / range.value);

const handleMouseDown = (event: any) => {
  mouseYOnMouseDown.value = event.clientY;
  valueOnMouseDown.value = degrees.value;
};

addEventListener("mouseup", () => {
  if (!mouseYOnMouseDown.value) {
    return;
  }

  mouseYOnMouseDown.value = undefined;
});

addEventListener("mousemove", (event: any) => {
  if (!mouseYOnMouseDown.value) {
    return;
  }

  setDegrees(
    valueOnMouseDown.value + (mouseYOnMouseDown.value - event.clientY),
  );
});

const handleMousewheel = (event: any) => {
  event.wheelDelta > 0
      ? setDegrees(degrees.value + step.value)
      : setDegrees(degrees.value - step.value);
};

const emit = defineEmits(["update:modelValue"]);
watch(normalized, (newValue) => emit("update:modelValue", newValue));

watch(props, (newValue) => setDegrees(range.value * newValue.modelValue));
</script>
