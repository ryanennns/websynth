<script setup lang="ts"></script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 240"
    role="img"
    aria-label="Moog-style potentiometer dial"
  >
    <rect width="240" height="240" fill="none" />

    <circle cx="120" cy="120" r="110" fill="#201e1c" />
    <circle cx="120" cy="120" r="108" fill="#181614" />

    <circle cx="120" cy="120" r="106" fill="#0e0c0b" />

    <circle
      cx="120"
      cy="120"
      r="100"
      fill="none"
      stroke="#1c1a18"
      stroke-width="2"
    />
    <circle cx="120" cy="120" r="99" fill="#0b0908" />

    <path
      d="M 82 185.8 A 76 76 0 1 0 158 185.8"
      fill="none"
      stroke="#2c2a28"
      stroke-width="1.5"
    />

    <g
      transform="translate(120 120)"
      stroke="#ddd0b0"
      stroke-linecap="butt"
      stroke-width="2.5"
    >
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(-150)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(-120)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(-90)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(-60)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(-30)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(0)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(30)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(60)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(90)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(120)" />
      <line x1="0" y1="-96" x2="0" y2="-78" transform="rotate(150)" />
    </g>

    <g
      transform="translate(120 120)"
      stroke="#ddd0b0"
      stroke-linecap="butt"
      stroke-width="1.5"
      opacity="0.4"
    >
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(-135)" />
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(-105)" />
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(-75)" />
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(-45)" />
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(-15)" />
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(15)" />
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(45)" />
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(75)" />
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(105)" />
      <line x1="0" y1="-96" x2="0" y2="-87" transform="rotate(135)" />
    </g>

    <g transform="translate(120 120)" fill="#ddd0b0">
      <circle cx="0" cy="-96" r="2.5" transform="rotate(-150)" />
      <circle cx="0" cy="-96" r="2.5" transform="rotate(150)" />
    </g>

    <g transform="translate(30 30)">
      <slot />
    </g>
  </svg>
</template>

<style scoped></style>
