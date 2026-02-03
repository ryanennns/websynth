<template>
  <div
    class="flex flex-col align-center items-center"
    @mousewheel="handleMousewheel"
  >
    <DialBack @mousedown="handleMouseDown" class="h-32 w-32">
      <DialHead :rotation="dialHeadRotation" />
    </DialBack>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DialHead from "./Dials/Default/DialHead.vue";
import DialBack from "./Dials/Default/DialBack.vue";

interface Props {
  min: number;
  max: number;
  step?: number | undefined;
  offset?: number | undefined;
}

const props = defineProps<Props>();

const offset = computed<number>(() => props.offset ?? 0);
const step = computed<number>(() => props.step ?? 1);
const startRotation = computed<number>(() => -180 + offset.value);
const range = computed<number>(() => 360 - 2 * offset.value);

const mouseYOnMouseDown = ref<number | undefined>(undefined);
const valueOnMouseDown = ref<number>(0);
const dialHeadRotation = computed<number>(
  () => degrees.value + startRotation.value,
);

const raw = ref<number>(0);
const degrees = ref<number>(0);
const normalized = computed<number>(() => degrees.value / range.value);

const handleMouseDown = (event: any) => {
  mouseYOnMouseDown.value = event.clientY;
  valueOnMouseDown.value = degrees.value;
};

const setRaw = (val: number) => {
  raw.value = Math.max(0, Math.min(val, range.value));
};

const setDegrees = (val: number) => {
  degrees.value = Math.max(
    0,
    Math.min(Math.ceil(val / step.value) * step.value, range.value),
  );
};

const handleMousewheel = (event: any) => {
  if (event.wheelDelta > 0) {
    setDegrees(degrees.value + step.value);
    setRaw(raw.value + step.value);
  }

  if (event.wheelDelta < 0) {
    setDegrees(degrees.value - step.value);
    setRaw(raw.value - step.value);
  }
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

  setRaw(valueOnMouseDown.value + (mouseYOnMouseDown.value - event.clientY));
  setDegrees(raw.value);
});

const emit = defineEmits(["update:modelValue"]);
watch(normalized, (newValue) => emit("update:modelValue", newValue));
</script>
