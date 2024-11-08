import { ref } from "vue";
const insertIndex = ref<number | null>(null);
let sourceIndex: number | null = null;
let divRect = {} as DOMRect;
let offsetX: number, offsetY: number;

/**
 * 开始进入拖拽排序
 */
const startDrag = (
  el: DragEvent,

  targetNode: HTMLElement,

  parentNode: HTMLElement,
) => {
  // 判断鼠标是否进入了div

  let enterDiv =
    el.clientX - offsetX > divRect.left &&
    el.clientX - offsetX < divRect.right &&
    el.clientY - offsetY > divRect.top &&
    el.clientY - offsetY < divRect.bottom;

  if (enterDiv) return;

  enterDiv = true;

  sourceIndex = Array.prototype.indexOf.call(parentNode.children, el.target);

  insertIndex.value = Array.prototype.indexOf.call(parentNode.children, targetNode);

  drag();

  function drag() {
    if (sourceIndex != -1) {
      if (insertIndex.value! <= sourceIndex!) {
        targetNode &&
          parentNode.insertBefore(
            targetNode,

            (el.target as HTMLElement).nextElementSibling,
          );

        enterDiv = false;
      } else {
        targetNode && parentNode.insertBefore(targetNode, el.target as HTMLElement);

        enterDiv = false;
      }

      sourceIndex = Array.prototype.indexOf.call(
        parentNode.children,

        el.target,
      );

      insertIndex.value = Array.prototype.indexOf.call(
        parentNode.children,

        targetNode,
      );

      divRect = targetNode!.getBoundingClientRect();
    }
  }
};

export const useDrag = (
  sourceEl: string[],

  targetEl: string,

  option: {
    enter?: (
      ...arg: [el: DragEvent, sort: typeof startDrag, insertIndex: typeof insertIndex, sourceIndex?: typeof sourceIndex]
    ) => void;

    start?: (el: DragEvent, sourceIndex: number | null) => void;

    over?: (el: DragEvent) => void;

    leave?: (el: DragEvent) => void;

    end?: (...arg: [el: DragEvent, data: string, insertIndex: typeof insertIndex]) => void;
  },
  doc: Document = window.document,
) => {
  function start(el: DragEvent) {
    const target = el.currentTarget as HTMLElement;

    const source = Array.prototype.indexOf.call(
      target.parentNode?.children,

      target,
    );

    option.start && option.start(el, source);

    // currentRowIndex.value = null;

    el.dataTransfer?.setData("text/plain", target.dataset.type ?? "");

    offsetX = el.offsetX;

    offsetY = el.offsetY;
  }

  sourceEl.forEach((el) => {
    document.querySelectorAll<HTMLElement>(el).forEach((element) => {
      element.draggable = true;

      element.addEventListener("dragstart", start);
    });
  });

  function enter(el: DragEvent) {
    el.dataTransfer!.dropEffect = "copy";

    option.enter && option.enter(el, startDrag, insertIndex);

    el.preventDefault();
  }
  function over(el: DragEvent) {
    option.over && option.over(el);
    el.preventDefault();
  }
  function leave(el: DragEvent) {
    el.preventDefault();

    option.leave && option.leave(el);
  }
  function end(el: DragEvent) {
    const data = el.dataTransfer!.getData("text/plain");

    option.end && option.end(el, data, insertIndex);
  }
  const EVENTLIST = { dragenter: enter, dragover: over, dragleave: leave, drop: end };
  for (const [name, event] of Object.entries(EVENTLIST)) {
    const eventName = name as keyof HTMLElementEventMap;
    doc.querySelectorAll<HTMLElement>(targetEl)!.forEach((el) => {
      console.log(el);
      
      el.addEventListener(eventName, event as EventListenerOrEventListenerObject);
    });
  }
  function removeDrag() {
    for (const [name, event] of Object.entries(EVENTLIST)) {
      const eventName = name as keyof HTMLElementEventMap;
      doc.querySelectorAll<HTMLElement>(targetEl)!.forEach((el) => {
        el.removeEventListener(eventName, event as EventListenerOrEventListenerObject);
      });
    }
  }

  return removeDrag;
};
