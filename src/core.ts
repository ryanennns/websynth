import { ref } from "vue";

export interface MenuItemType {
  title: string;
  key: string;
}

export const counter = ref<number>(0);
