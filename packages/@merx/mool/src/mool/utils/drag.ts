import { useDrag } from "@/mool/hooks";
import { JsonSchema } from "./schema";
import { Ref, ref, nextTick, watchEffect } from "vue";
import { Page, ComponentType, Col } from "@/mool/types/BasicForm";
import {cloneDeep} from "lodash-es";
import { uuid } from "./index";

export type RemoveDrag = ReturnType<typeof useDrag> | null;

type CurrAEl = {
  /**
   * 当前点击的元素id
   */
  clickId: string | null;
  /**
   * 当前鼠标经过的元素id
   */
  overId: string | null;
  /**
   * 鼠标hover当前组件的id
   */
  hoverId: string | null;
  /**
   * 鼠标覆盖当前元素的顶部
   */
  insertTopId: string | null;
  /**
   * 鼠标覆盖当前元素的底部
   */
  insertBottomId: string | null;
};

export class DragUtil {
  private _removeDrag: RemoveDrag = null;

  /**
   * 设置当前组件激活的状态类型，分别为点击状态，覆盖状态，hover状态
   */
  private currAEl: CurrAEl = {
    clickId: null,
    overId: null,
    hoverId: null,
    insertTopId: null,
    insertBottomId: null,
  };

  private copyCurrAEl = { ...this.currAEl };

  public componentMap = new Map();

  /**
   * 当前拖拽的元素id
   */
  private compId: string | null = null;

  // 拖拽相关的属性
  private top: number = 0;
  private bottom: number = 0;
  private currId: string | null = null;
  private enterId: string = "";
  private _child: Col | null = null;
  private rect: number | null = null;

  private targetEle: {
    [key in "drag" | "canvasDrag"]: { startEle: string[]; endEle: string };
  };

  private pointcenter = ref<boolean>(false);
  private pointinElement = ref<boolean>(false);
  private lastIsInElement: null | boolean = null; // 上一个 isInElement 的值
  private lastIsInCenter: null | boolean = null; // 上一个 isInCenter 的值
  private lastIsTop: null | boolean = null; // 上一个 isInCenter 的值

  /** 初始化组件映射 */
  public initializeComponentMap = (list: Page | (Col & { parentId: string }))=> {
    this.componentMap.set(list.id, list);
    if (list.children) {
      for (const child of list.children) {
        this.componentMap.set(child.id, { ...child, parentId: list.id });
        this.initializeComponentMap({ ...child, parentId: list.id as string });
      }
    }
  }

  constructor(
    option: {
      [key in "drag" | "canvasDrag"]: { startEle: string[]; endEle: string };
    },
    onDrag?: (currAEl: CurrAEl) => void
  ) {
    // this.dragCompToCanvas = this.dragCompToCanvas.bind(this); // 绑定 this
    this.targetEle = option;
    this.currAEl = new Proxy({} as CurrAEl, {
      get(target, prop) {
        return target[prop as keyof CurrAEl];
      },
      set(target, prop, value) {
        target[prop as keyof CurrAEl] = value;
        onDrag?.(target);
        return true;
      },
    });
  }

  /**
   * 开始拖拽组件到画布上
   * @param pageConfig 页面schema配置,响应式Ref变量
   * @param callback 拖拽结束回调
   * @returns
   */
  public dragCompToCanvas = (
    pageConfig: Ref<Page>,
    callback?: (arg: Col) => void,
    doc: Document = window.document
  ) => {
    this.initializeComponentMap(pageConfig.value);
    const { drag, canvasDrag } = this.targetEle;
    const remove = useDrag(drag.startEle, drag.endEle, {
      start: (el) => {
        this._removeDrag?.();
      },

      enter: (el, sort, insertIndex) => {
        this.compId = (el.target as HTMLElement).dataset.id as string;
        this.currAEl.hoverId = this.compId;
      },
      over() {},
      leave: (el) => {
        // this.currAEl.overId = null;
      },

      end: (el, data, insertIndex) => {
        if (!data) return;
        const target = el.target as HTMLElement;
        const id = uuid();
        const config = JsonSchema[data as ComponentType];
        console.log(config);
        
        // 编辑组件样式必须的配置,防止AI生成组件时没有生成style
        if (!config.props.style) {
          config.props.style = {};
        }
        
        if (!target.classList.contains(canvasDrag.endEle.replace(".", ""))) {
          const comp = cloneDeep({ ...config, id });
          pageConfig.value.children?.push(comp);
          this.componentMap.set(id, { ...comp, parentId: pageConfig.value.id });
        } else {
          const component = this.componentMap.get(this.compId) as Col;
          const comp = cloneDeep({ ...config, id });
          if (this.currAEl.insertBottomId) {
            this.insertItem(this.currAEl.insertBottomId, comp);
            return;
          }
          if (this.currAEl.insertTopId) {
            this.insertItem(this.currAEl.insertTopId, comp, 0);
            return;
          }
          if (
            component?.componentName == "ElTags" &&
            component?.active !== undefined
          ) {
            component?.props.tabItems[component?.active - 1]?.children.push(
              comp
            );
          } else {
            component?.children?.push(comp);
          }
          this.componentMap.set(id, {
            ...comp,
            parentId: this.compId,
          });
        }
        callback?.(this.componentMap.get(id));
        this.compId = null;
      },
    },doc);
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
    this.rect = +getComputedStyle(target).height;

    // this.currAEl.overId = target.dataset.id as string;
    this.enterId = target.dataset.id as string;
    // this.currAEl.insertBottomId = target.dataset.id as string;

    this.bottom = target.getBoundingClientRect().bottom;
    this.top = target.getBoundingClientRect().top;

    const component = this.componentMap.get(target.dataset.id);
    if (component?.children) {
      this.compId = target.dataset.id as string;
      this._child = component;
    }
  };

  /** 离开画布组件 */
  public leave = (el: DragEvent) => {
    this.pointinElement.value = false;
    this.pointcenter.value = false;
    this.currAEl.insertBottomId = null;
    this.currAEl.insertTopId = null;
    this.lastIsInCenter = null;
    this.lastIsInElement = null;
  };

  /** 覆盖画布组件 */
  public over = (el: DragEvent) => {
    nextTick(() => {
      const clientY = el.clientY;

      if (
        this.currId &&
        (this.currId === this.currAEl.insertBottomId ||
          this.currId === this.currAEl.insertTopId)
      )
        return;

      const isBottom = this.bottom >= clientY && this.bottom - 10 < clientY;
      const isTop = this.top < clientY && this.top + 10 > clientY;
      const isInCenter = clientY > this.top + 10 && clientY < this.bottom - 10;
      console.log(isTop);

      if (
        isBottom !== this.lastIsInElement ||
        isInCenter !== this.lastIsInCenter ||
        isTop !== this.lastIsTop
      ) {
        this.lastIsInElement = isBottom;
        this.lastIsInCenter = isInCenter;
        this.lastIsTop = isTop;
        const newState: Record<string, string | null> = {
          insertBottomId: null,
          insertTopId: null,
          id: null,
        };

        if (isInCenter && this._child) {
          newState.insertBottomId = null;
          newState.insertTopId = null;
          newState.id = this.enterId;
          this.currAEl.overId = this.enterId;
        } else {
          if (isTop) {
            newState.insertTopId = this.enterId;
            console.log(2);
          }
          if (isBottom) {
            newState.insertBottomId = this.enterId;
          }
          this.currAEl.overId = null;
        }

        Object.assign(this.currAEl, newState);
      }
    });
  };

  /** 结束拖拽 */
  public end = (el: DragEvent, callback: (arg: Col) => void) => {
    this.clearId();

    if (
      this.currId &&
      (this.currId === this.currAEl.insertBottomId ||
        this.currId === this.currAEl.insertTopId)
    )
      return;

    if (this.currAEl.insertBottomId && this.currAEl.insertTopId && this._child)
      return;
    if (!this.currId) return;
    this.deleteItem(this.currId, (conf) => {
      if (this.currAEl.insertBottomId) {
        this.insertItem(this.currAEl.insertBottomId, conf);
        return;
      }

      if (this.currAEl.insertTopId) {
        this.insertItem(this.currAEl.insertTopId, conf, 0);
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
    const index = waitChildren.value.findIndex(
      (child: any) => child.id == component.id
    );
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
      console.log("parent", parent, component);
      const waitChildren = ref(parent?.children);
      if (parent && parent.children) {
        if (parent.componentName == "ElTags") {
          waitChildren.value =
            parent.props.tabItems[parent.active - 1].children;
        }
        const index = waitChildren.value.findIndex(
          (child: any) => child.id == id
        );
        if (index !== -1) {
          waitChildren.value.splice(index, 1);
          this.componentMap.set(parent.id, {
            ...parent,
            children: waitChildren.value,
          });
          callback?.(component);
        }
      }
    }
  };

  /** 插入当前组件 */
  public insertItem = (id: string | null, config: Col, pos: number = 1) => {
    const targetComponent = this.componentMap.get(id);

    const parent = this.componentMap.get(targetComponent.parentId);
    const waitChildren = ref(parent?.children);
    if (parent && parent.children) {
      if (parent.componentName == "ElTags") {
        waitChildren.value = parent.props.tabItems[parent.active - 1].children;
      }
      const index = waitChildren.value.findIndex(
        (child: any) => child.id == id
      );
      waitChildren.value.splice(index + pos, 0, config);
      this.componentMap.set(config.id, { ...config, parentId: parent.id });
    }
  };

  /**清除当前组件的状态 */
  private clearId = () => {
    setTimeout(() => {
      Object.assign(this.currAEl, this.copyCurrAEl);
    }, 100);
  };
}
