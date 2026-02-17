import { ref } from "vue";

export const matrix = ref<Array<Array<number>>>(
  Array.from({ length: 10 }).map(() => Array.from({ length: 10 }).map(() => 0)),
);
