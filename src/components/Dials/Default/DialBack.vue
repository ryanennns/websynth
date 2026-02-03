<script setup lang="ts"></script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 240"
    role="img"
    aria-label="Potentiometer dial"
  >
    <rect width="240" height="240" fill="none" />

    <circle cx="120" cy="120" r="106" fill="#141414" />
    <circle cx="120" cy="120" r="104" fill="#1c1c1c" />
    <circle cx="120" cy="120" r="98" fill="#0f0f0f" />

    <g transform="translate(120 120)">
      <g stroke="#ffffff" stroke-linecap="round" stroke-width="3" opacity="0.8">
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(-150)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(-120)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(-90)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(-60)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(-30)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(0)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(30)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(60)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(90)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(120)" />
        <line x1="0" y1="-92" x2="0" y2="-76" transform="rotate(150)" />
      </g>

      <g
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-width="2"
        opacity="0.35"
      >
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(-135)" />
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(-105)" />
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(-75)" />
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(-45)" />
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(-15)" />
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(15)" />
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(45)" />
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(75)" />
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(105)" />
        <line x1="0" y1="-92" x2="0" y2="-82" transform="rotate(135)" />
      </g>
    </g>
    <slot />
  </svg>
</template>

<style scoped></style>
