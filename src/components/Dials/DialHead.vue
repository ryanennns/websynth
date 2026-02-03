<template>
  <circle cx="120" cy="120" r="74" fill="#bdbdbd" />
  <circle cx="120" cy="120" r="66" fill="#1d1d1d" />
  <circle
    cx="120"
    cy="120"
    r="64"
    fill="none"
    stroke="#ffffff"
    stroke-opacity="0.10"
    stroke-width="2"
  />

  <g :transform="`translate(120 120) rotate(${rotation})`">
    <line
      x1="0"
      y1="-54"
      x2="0"
      y2="-20"
      stroke="#ffffff"
      stroke-width="6"
      stroke-linecap="round"
    />
    <line
      x1="0"
      y1="-54"
      x2="0"
      y2="-20"
      stroke="#ffffff"
      stroke-opacity="0.25"
      stroke-width="2"
      stroke-linecap="round"
    />
  </g>

  <circle cx="120" cy="120" r="14" fill="#000" fill-opacity="0.35" />
  <circle
    cx="120"
    cy="120"
    r="12"
    fill="#111"
    stroke="#fff"
    stroke-opacity="0.12"
  />
</template>

<script setup lang="ts">
interface Props {
  rotation: number;
}

defineProps<Props>();
</script>
