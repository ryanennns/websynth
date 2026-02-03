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
    {{ raw }}
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

interface Props {
  val: number;
  step?: number;
  offset?: number;
  default?: number;
  head?: any;
  back?: any;
}

const props = defineProps<Props>();

const offset = computed<number>(() => props.offset ?? 0);
const step = computed<number>(() => props.step ?? 1);
const defaultRef = computed<number>(() => props.default ?? props.val ?? 0);
const startRotation = computed<number>(() => -180 + offset.value);
const range = computed<number>(() => 360 - 2 * offset.value);

const mouseYOnMouseDown = ref<number | undefined>(undefined);
const valueOnMouseDown = ref<number>(0);
const dialHeadRotation = computed<number>(
  () => degrees.value + startRotation.value,
);

const raw = ref<number>(defaultRef.value);
const degrees = ref<number>(range.value * raw.value);
const normalized = computed<number>(() => degrees.value / range.value);

const clampBetween = (min: number, max: number, val: number) =>
  Math.max(min, Math.min(max, val));

const handleMouseDown = (event: any) => {
  mouseYOnMouseDown.value = event.clientY;
  valueOnMouseDown.value = degrees.value;
};

const setRaw = (val: number) => (raw.value = clampBetween(0, range.value, val));

const setDegrees = (val: number) =>
  (degrees.value = clampBetween(
    0,
    range.value,
    Math.ceil(val / step.value) * step.value,
  ));

const handleMousewheel = (event: any) => {
  event.wheelDelta > 0
    ? (() => {
        setRaw(raw.value + step.value);
        setDegrees(degrees.value + step.value);
      })()
    : (() => {
        setRaw(raw.value - step.value);
        setDegrees(degrees.value - step.value);
      })();
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
onMounted(() => emit("update:modelValue", defaultRef.value));

watch(
  props,
  (newValue) => setRaw(newValue.val) && setDegrees(range.value * newValue.val),
);
</script>
