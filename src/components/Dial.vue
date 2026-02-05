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
import { computed, onMounted, ref, watch } from "vue";
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

const degrees = ref<number>(
  (() =>
    props.min < 0
      ? (((props.default ?? 0) + valueRange.value / 2) / valueRange.value) *
        angleRange.value
      : ((props.default ?? 0) / valueRange.value) * angleRange.value)(),
);
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
  const delta = (step.value * angleRange.value) / valueRange.value;

  event.wheelDelta > 0
    ? setDegrees(degrees.value + delta)
    : setDegrees(degrees.value - delta);
};

watch(props, (newValue) =>
  props.min < 0
    ? setDegrees(
        ((newValue.modelValue + valueRange.value / 2) / valueRange.value) *
          angleRange.value,
      )
    : setDegrees((newValue.modelValue / valueRange.value) * angleRange.value),
);

const emit = defineEmits(["update:modelValue"]);
watch(normalized, (newValue) =>
  emit("update:modelValue", props.min + newValue * valueRange.value),
);
onMounted(() =>
  emit("update:modelValue", props.min + normalized.value * valueRange.value),
);
</script>
