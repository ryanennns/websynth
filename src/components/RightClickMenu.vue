<template>
  <div class="relative" @contextmenu="onContextMenu">
    <div
      class="fixed"
      style="width: 101vw; height: 101vh; left: 0; top: 0; display: none"
      @click="close"
      @contextmenu="(e) => e.preventDefault"
      ref="menuBackground"
    ></div>
    <ul
      class="z-[9999] text-gray-200 fixed flex-col bg-gray-800 cursor-pointer"
      ref="menu"
      style="display: none"
    >
      <MenuItem
        v-for="item in menuItems"
        :key="item.title"
        @click="emit('click', item) > close()"
        >{{ item.title }}</MenuItem
      >
    </ul>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuItem from "./MenuItem.vue";

interface Props {
  menuItems: {
    title: string;
  }[];
}

defineProps<Props>();

const emit = defineEmits(["close", "click"]);

const menuBackground = ref<HTMLDivElement>();
const menu = ref<HTMLDivElement>();

const close = () => {
  menuBackground.value!.style.display = "none";
  menu.value!.style.display = "none";

  emit("close");
};

const onContextMenu = (e: PointerEvent) => {
  e.preventDefault();

  if (menu.value!.style.display !== "none") {
    return;
  }

  menu.value!.style.left = `${e.clientX}px`;
  menu.value!.style.top = `${e.clientY}px`;
  menu.value!.style.display = "flex";

  menuBackground.value!.style.display = "block";
};
</script>
