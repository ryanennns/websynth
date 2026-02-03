<template>
  <div class="flex flex-col align-center items-center">
    <DialBackground @mousedown="handleMouseDown">
      <!-- range - offset -->
      <DialHead :rotation="rotation" />
    </DialBackground>

    {{ normalizedValue }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DialBackground from "./Dials/DialBackground.vue";
import DialHead from "./Dials/DialHead.vue";

interface Props {
  min: number;
  max: number;
  step: number;
}

defineProps<Props>();

const offset = 30
const startRotation = computed<number>(() => -180 + offset);
const range = computed<number>(() => 360 - (2*offset))

const inFocus = ref<boolean>(false);


const mouseYOnStart = ref<number | undefined>(undefined);
const degreesOnStart = ref<number>(0);
const degrees = ref<number>(0);
const rotation = computed<number>(() => degrees.value + startRotation.value);

const normalizedValue = computed<number>(() => degrees.value / range.value)
const handleMouseDown = (event: any) => {
  inFocus.value = true;
  mouseYOnStart.value = event.clientY;
  degreesOnStart.value = degrees.value;
};

addEventListener("mouseup", () => {
  if (!inFocus.value) {
    return;
  }

  inFocus.value = false;
  mouseYOnStart.value = undefined;
});

addEventListener("mousemove", (event: any) => {
  if (!inFocus.value) {
    return;
  }

  degrees.value = Math.max(
    0,
    Math.min(degreesOnStart.value + (mouseYOnStart.value - event.clientY), range.value),
  );
});

watch(inFocus, (newValue) => console.log(newValue));
</script>

<style></style>
