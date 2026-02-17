<template>
  <div class="relative">
    <div class="fixed opacity-10 bg-red-300" style="width: 101vw; height: 101vh; left: 0; top: 0; display:none;" @click="menuBackgroundClick" ref="menuBackground"></div>
    <ul class="text-gray-200 fixed flex-col bg-gray-800" ref="menu" style="display: none">
      <slot/>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const menuBackground = ref<HTMLDivElement>();
const menu = ref<HTMLDivElement>();

const menuBackgroundClick = (e: PointerEvent) => {
  e.preventDefault;
  menuBackground.value!.style.display = "none";
  menu.value!.style.display = "none";
}

const onContextMenu = (e: PointerEvent) => {
  console.log({
    x: e.clientX,
    y: e.clientY,
  })

  e.preventDefault();
  menu.value!.style.left = `${e.clientX}px`;
  menu.value!.style.top = `${e.clientY}px`;
  menuBackground.value!.style.display = "block";
  menu.value!.style.display = "flex";
  console.log("onContextMenu");
};
</script>
