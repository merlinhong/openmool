import { defineStore } from "pinia";
import { ref } from "vue";

export type CanvasType = 'pc' | 'mobile';

export const useCanvasStore = defineStore("canvas", () => {
  const canvasType = ref<CanvasType>('pc');

  function setCanvasType(type: CanvasType) {
    canvasType.value = type;
  }

  return {
    canvasType,
    setCanvasType,
  };
});