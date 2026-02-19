<template>
  <svg viewBox="0 0 180 180" width="180" height="180">
    <circle cx="90" cy="90" r="55.5" fill="#282422" />

    <circle cx="90" cy="90" r="54" fill="#1c1a18" />

    <circle cx="90" cy="90" r="44.5" fill="#0e0c0b" />

    <circle cx="90" cy="90" r="43" fill="#141210" />

    <circle
      cx="90"
      cy="90"
      r="42.5"
      fill="none"
      stroke="#343230"
      stroke-width="0.75"
    />
    <g :transform="`translate(90 90) rotate(${rotation})`">
      <line
        x1="0"
        y1="-53"
        x2="0"
        y2="-46"
        stroke="#c8bfa8"
        stroke-width="3.5"
        stroke-linecap="butt"
      />
      <line
        x1="0"
        y1="-41"
        x2="0"
        y2="-16"
        stroke="#ffffff"
        stroke-width="3.5"
        stroke-linecap="butt"
      />
    </g>

    <circle cx="90" cy="90" r="10" fill="#0e0c0b" />
    <circle cx="90" cy="90" r="8.5" fill="#090807" />
    <circle
      cx="90"
      cy="90"
      r="7.5"
      fill="none"
      stroke="#2a2826"
      stroke-width="0.75"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  rotation: number;
}

defineProps<Props>();
</script>
