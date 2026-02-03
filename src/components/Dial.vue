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
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import { clampBetween } from "../helpers/helpers.ts";

interface Props {
  modelValue: number;
  max: number;
  min: number;
  step?: number;
  offset?: number;
  default?: number;
  head?: any;
  back?: any;
}

const props = defineProps<Props>();

const offset = computed<number>(() => props.offset ?? 0);
const angleRange = computed<number>(() => 360 - 2 * offset.value);
const valueRange = computed<number>(() => props.max - props.min);
const step = computed<number>(() => props.step ?? 1);

const mouseYOnMouseDown = ref<number | undefined>(undefined);
const valueOnMouseDown = ref<number>(0);

const zeroValueRotation = computed<number>(() => -180 + offset.value);
const dialHeadRotation = computed<number>(
  () => zeroValueRotation.value + degrees.value,
);

const degrees = ref<number>((props.default ?? 0));
const setDegrees = (val: number) => {
  degrees.value = clampBetween(0, angleRange.value, val);
};

const normalized = computed<number>(() => degrees.value / angleRange.value);

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
watch(normalized, (newValue) =>
  emit("update:modelValue", newValue * valueRange.value),
);

watch(props, (newValue) =>
  setDegrees((newValue.modelValue / props.max) * angleRange.value),
);

onMounted(() => emit("update:modelValue", normalized.value * valueRange.value))
</script>
