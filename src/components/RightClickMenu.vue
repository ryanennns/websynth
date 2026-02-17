<template>
  <div class="relative" @contextmenu="onContextMenu">
    <div
      class="z-[9999] fixed"
      style="width: 101vw; height: 101vh; left: 0; top: 0; display: none"
      @click="close"
      @contextmenu="(e) => e.preventDefault"
      ref="menuBackground"
    ></div>
    <ul
      class="z-[9999] text-zinc-200 fixed flex-col bg-zinc-800"
      ref="menu"
      style="display: none"
    >
      <li v-for="menuGroup in menuGroups">
        <MenuHeader>{{ menuGroup.header }}</MenuHeader>
        <MenuItem
          v-for="item in menuGroup.menuItems"
          :key="item.title"
          @click="emit('click', item) > close()"
          >{{ item.title }}</MenuItem
        >
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuItem from "./MenuItem.vue";
import { type MenuItemType } from "../core.ts";
import MenuHeader from "./MenuHeader.vue";

interface Props {
  menuItems?: MenuItemType[];
  menuGroups?: {
    header: string;
    menuItems: MenuItemType[];
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
