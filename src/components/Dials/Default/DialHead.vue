<template>
  <!-- viewBox keeps proportions while rendered size can be controlled via width/height -->
  <svg viewBox="0 0 180 180" width="180" height="180">
    <!-- knob body -->
    <circle cx="90" cy="90" r="55.5" fill="#bdbdbd" />
    <circle cx="90" cy="90" r="49.5" fill="#1d1d1d" />
    <circle
      cx="90"
      cy="90"
      r="48"
      fill="none"
      stroke="#ffffff"
      stroke-opacity="0.10"
      stroke-width="1.5"
    />

    <!-- indicator line -->
    <g :transform="`translate(90 90) rotate(${rotation})`">
      <line
        x1="0"
        y1="-40.5"
        x2="0"
        y2="-15"
        stroke="#ffffff"
        stroke-width="4.5"
        stroke-linecap="round"
      />
      <line
        x1="0"
        y1="-40.5"
        x2="0"
        y2="-15"
        stroke="#ffffff"
        stroke-opacity="0.25"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </g>

    <!-- center cap -->
    <circle cx="90" cy="90" r="10.5" fill="#000" fill-opacity="0.35" />
    <circle
      cx="90"
      cy="90"
      r="9"
      fill="#111"
      stroke="#fff"
      stroke-opacity="0.12"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  rotation: number;
}

defineProps<Props>();
</script>
