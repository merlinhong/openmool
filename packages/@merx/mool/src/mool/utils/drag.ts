import { useDrag } from "@/mool/hooks";
import { JsonSchema } from "./schema";
import { Ref, ref, nextTick } from "vue";
import { Page, ComponentType, Col } from "@/mool/types/BasicForm";
import cloneDeep from "lodash/cloneDeep";
import { uuid } from "./index";

export type RemoveDrag = ReturnType<typeof useDrag> | null;

interface CurrAEl {
  id: string | null;
  clickId: string | null;
  overId: string | null;
  insertTopId: string | null;
  insertBottomId: string | null;
}
class DragUtil {
  private _removeDrag: RemoveDrag = null;

  public currAEl = ref<CurrAEl>({
    clickId: null,
    id: null,
    overId: null,
    insertTopId: null,
    insertBottomId: null,
  });

  public componentMap = new Map();

  // 拖拽相关的属性
  private top: number = 0;
  private bottom: number = 0;
  private currId: string | null = null;
  private enterId: string = "";
  private _child: Col | null = null;

  private pointcenter = ref<boolean>(false);
  private pointinElement = ref<boolean>(false);
  private lastIsInElement: null | boolean = null; // 上一个 isInElement 的值
  private lastIsInCenter: null | boolean = null; // 上一个 isInCenter 的值

  /** 初始化组件映射 */
  public initializeComponentMap(list: Page | (Col & { parentId: string })) {
    this.componentMap.set(list.id, list);
    if (list.children) {
      for (const child of list.children) {
        this.componentMap.set(child.id, { ...child, parentId: list.id });
        this.initializeComponentMap({ ...child, parentId: list.id as string });
      }
    }
  }

  constructor() {
    // this.dragCompToCanvas = this.dragCompToCanvas.bind(this); // 绑定 this
  }

  /** 开始拖拽组件到画布上 */
  public dragCompToCanvas = (
    targetEle: { [key in "drag" | "canvasDrag"]: { startEle: string[]; endEle: string } },
    pageConfig: Ref<Page>,
    callback: (arg: Col) => void,
  ) => {
    const { drag, canvasDrag } = targetEle;
    const remove = useDrag(drag.startEle, drag.endEle, {
      start: (el) => {
        this._removeDrag?.();
      },

      enter: (el, sort, insertIndex) => {
        this.currAEl.value.overId = pageConfig.value.id;
        this.currAEl.value.id = (el.target as HTMLElement).dataset.id as string;
      },
      over() {},
      leave: (el) => {
        this.currAEl.value.overId = null;
      },

      end: (el, data, insertIndex) => {
        if (!data) return;
        const target = el.target as HTMLElement;
        const id = uuid();
        const config = JsonSchema[data as ComponentType];

        // 编辑组件样式必须的配置,防止AI生成组件时没有生成style
        if (!config.props.style) {
          config.props.style = {};
        }
        if (!target.classList.contains(canvasDrag.endEle.replace(".", ""))) {
          const comp = cloneDeep({ ...config, id });
          pageConfig.value.children?.push(comp);
          this.componentMap.set(id, { ...comp, parentId: pageConfig.value.id });
        } else {
          const component = this.componentMap.get(this.currAEl.value.id) as Col;
          const comp = cloneDeep({ ...config, id });

          if (component?.componentName == "ElTags" && component?.active !== undefined) {
            component?.props.tabItems[component?.active - 1]?.children.push(comp);
          } else {
            component?.children?.push(comp);
          }
          this.componentMap.set(id, { ...comp, parentId: this.currAEl.value.id });
        }
        callback?.(this.componentMap.get(id));
        this.currAEl.value.id = null;
      },
    });
    return [remove];
  };

  /** 画布中组件拖拽开始 */
  public start = (el: DragEvent) => {
    const target = el.target as HTMLElement;
    this.currId = target.dataset.id as string;
  };

  /** 进入画布组件 */
  public enter = (el: DragEvent) => {
    this._child = null;
    const target = el.target as HTMLElement;

    this.currAEl.value.overId = target.dataset.id as string;
    this.enterId = target.dataset.id as string;
    this.currAEl.value.insertBottomId = target.dataset.id as string;

    this.bottom = target.getBoundingClientRect().bottom;
    this.top = target.getBoundingClientRect().top;

    const component = this.componentMap.get(target.dataset.id);
    if (component?.children) {
      this.currAEl.value.id = target.dataset.id as string;
      this._child = component;
    }
  };

  /** 离开画布组件 */
  public leave = (el: DragEvent) => {
    this.pointinElement.value = false;
    this.pointcenter.value = false;
    this.currAEl.value.insertBottomId = null;
    this.currAEl.value.insertTopId = null;
  };

  /** 覆盖画布组件 */
  public over = (el: DragEvent) => {
    nextTick(() => {
      const clientY = el.clientY;

      if (this.currId === this.currAEl.value.insertBottomId || this.currId === this.currAEl.value.insertTopId) return;

      const isInElement = this.bottom >= clientY && this.bottom - 15 < clientY;
      const isInCenter = clientY > this.top + 15 && clientY < this.bottom - 15;

      if (isInElement !== this.lastIsInElement || isInCenter !== this.lastIsInCenter) {
        this.lastIsInElement = isInElement;
        this.lastIsInCenter = isInCenter;

        const newState: Record<string, string | null> = {
          insertBottomId: null,
          insertTopId: null,
          id: null,
        };

        if (isInCenter && this._child) {
          newState.insertBottomId = null;
          newState.insertTopId = null;
          newState.id = this.enterId;
        } else {
          if (!isInElement) {
            newState.insertTopId = this.enterId;
          } else {
            newState.insertBottomId = this.enterId;
          }
        }

        this.currAEl.value = { ...this.currAEl.value, ...newState };
      }
    });
  };

  /** 结束拖拽 */
  public end = (el: DragEvent, callback: (arg: Col) => void) => {
    // clearId(this.currAEl);

    if (this.currId === this.currAEl.value.insertBottomId || this.currId === this.currAEl.value.insertTopId) return;

    if (this.currAEl.value.insertBottomId && this.currAEl.value.insertTopId && this._child) return;

    this.deleteItem(this.currId, (conf) => {
      if (this.currAEl.value.insertBottomId) {
        this.insertItem(this.currAEl.value.insertBottomId, conf);
        return;
      }

      if (this.currAEl.value.insertTopId) {
        this.insertItem(this.currAEl.value.insertTopId, conf, 0);
        return;
      }

      if (this._child) {
        this._child?.children?.push(conf);
        this.componentMap.set(conf.id, { ...conf, parentId: this._child.id });
        this._child = null;
        return;
      }
    });

    this.currId = null; // 拖拽完毕后置空
  };

  /**复制当前组件 */
  public copyItem = (id: string | null) => {
    console.log(id);

    const component = this.componentMap.get(id);
    const parent = this.componentMap.get(component.parentId);
    const waitChildren = ref(parent?.children);
    if (parent.componentName == "ElTags") {
      waitChildren.value = parent.props.tabItems[parent.active - 1].children;
    }
    const index = waitChildren.value.findIndex((child: any) => child.id == component.id);
    const cloneChild = cloneDeep(component);
    function resetId(_child: Col) {
      _child.children?.map((item: any) => {
        item.id = uuid();
        if (item.children?.length != 0 && item.children != undefined) {
          resetId(item);
        }
      });
    }
    resetId(cloneChild);
    const _id = uuid();
    waitChildren.value.splice(index + 1, 0, {
      ...cloneChild,
      id: _id,
    });
    this.componentMap.set(_id, {
      ...cloneChild,
      id: _id,
      parentId: parent.id,
    });
  };

  /** 删除当前组件 */
  public deleteItem = (id: string | null, callback?: (config: Col) => void) => {
    const component = this.componentMap.get(id);

    if (component) {
      const parent = this.componentMap.get(component.parentId); // 假设每个组件有 parentId
      const waitChildren = ref(parent?.children);
      if (parent && parent.children) {
        if (parent.componentName == "ElTags") {
          waitChildren.value = parent.props.tabItems[parent.active - 1].children;
        }
        const index = waitChildren.value.findIndex((child: any) => child.id == id);
        if (index !== -1) {
          waitChildren.value.splice(index, 1);
          this.componentMap.set(parent.id, { ...parent, children: waitChildren.value });
          callback?.(component);
        }
      }
    }
  };

  /** 插入当前组件 */
  public insertItem = (id: string | null, config: Col, pos: number = 1) => {
    const targetComponent = this.componentMap.get(id);

    const parent = this.componentMap.get(targetComponent.parentId);
    const index = parent.children.findIndex((child: any) => child.id == id);
    if (parent) {
      parent.children.splice(index + pos, 0, config);
      this.componentMap.set(config.id, { ...config, parentId: parent.id });
    }
  };
}
export const dragUtil = new DragUtil();
