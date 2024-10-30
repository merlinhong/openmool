<script setup lang="tsx">
import { h, type PropType, computed, resolveComponent, shallowRef, VNode, onMounted } from "vue";
import type { ComponentType, Render, Col, RowScope } from "@/mool/types/BasicForm";
import { omit } from "@/mool/utils";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import * as vue from "vue";
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  ctx: {
    type: Object as PropType<Function>,
    default: () => {},
  },
  // 页面区块的配置json schema
  schema: {
    type: Object as PropType<Col>,
    default: () => [],
  },

  currAEl: {
    type: Object as PropType<{ clickId: null | string; hoverId: string | null }>,
    default: () => ({
      clickId: null,
      hoverId: null,
    }),
  },
  componentMap: {
    type: Object as PropType<InstanceType<MapConstructor>>,
    default: () => ({}),
  },
  isPreview: {
    type: Boolean,
    default: () => false,
  },
  popup: {
    type: Array as PropType<Col[]>,
    default: () => [],
  },
});
const ctx = props.ctx?.(vue);
console.log(ctx);

type KeyType = "render" | "append" | "tooltip" | "toolbar" | "columns";

const renderForm: {
  [K in ComponentType]: Partial<{
    [K in KeyType]: Render;
  }>;
} = {
  div: {
    render: (data, col, child) => {
      return <div></div>;
    },
  },
  ElDialog: {
    render: (data, col, child) => {
      return <el-dialog v-model={ctx[col?.props?.value?.value].value}></el-dialog>;
    },
  },
  ElMenu: {
    render: (data, col, child) => {
      return (
        <div>
          <el-menu>
            {col?.props.option?.map((item) => {
              if (item.subMenu) {
                return (
                  <el-sub-menu
                    index={item.index}
                    v-slots={{
                      title: () => item.title,
                    }}
                  >
                    {item.subMenu.map((subItem) => {
                      return <el-menu-item index={subItem.index}>{subItem.title}</el-menu-item>;
                    })}
                  </el-sub-menu>
                );
              } else {
                return <el-menu-item index={item.index}>{item.title}</el-menu-item>;
              }
            })}
          </el-menu>
        </div>
      );
    },
  },

  ElCarousel: {
    render: (dta, col, child) => {
      return (
        <div>
          <el-carousel>
            {col?.props.option?.map((item) => {
              return (
                <el-carousel-item {...item} >{item.schema && CanvasComp(item.schema, false, true)}</el-carousel-item>
              );
            })}
          </el-carousel>
        </div>
      );
    },
  },
  ElForm: {
    render: (data, col, child) => {
      return <el-form></el-form>;
    },
  },
  ElFormItem: {
    render: (data, col, child) => {
      return <el-form-item></el-form-item>;
    },
  },
  ElContainer: {
    render: (data, col, child) => {
      return <el-container></el-container>;
    },
  },
  ElHeader: {
    render: (data, col, child) => {
      return <el-header></el-header>;
    },
  },
  ElFooter: {
    render: (data, col, child) => {
      return <el-footer></el-footer>;
    },
  }, 
  ElMain: {
    render: (data, col, child) => {
      return <el-main></el-main>;
    },
  },
  ElAside: {
    render: (data, col, child) => {
      return <el-aside></el-aside>;
    },
  },
  Text: {
    render: (data, col) => {
      return (
        // <div>
        <span>{col?.label}</span>
        // </div>
      );
    },
  },
  ElInput: {
    render: (data, col) => {
      return (
        <div>
          <el-input />
        </div>
      );
    },
    append: (data, col) => {
      return <div></div>;
    },
    tooltip: (data, col) => {
      return <div></div>;
    },
  },
  TextArea: {
    render: (data, col) => {
      return <el-input type="textarea" />;
    },
    append: (data, col) => {
      return <div></div>;
    },
    tooltip: (data, col) => {
      return <div></div>;
    },
  },
  ElSelect: {
    render: (data, col, child) => {
      let option: { label: string; value: number }[] = [];
      for (const obj of col?.props?.option) {
        option[obj.order] = {
          label: obj.label,
          value: obj.value,
        };
      }
      return (
        <div>
          <el-select>
            {option?.map((item) => {
              return <el-option label={item.label} value={item.value}></el-option>;
            })}
          </el-select>
        </div>
      );
    },
    append: (data, col) => {
      return <div></div>;
    },
    tooltip: (data, col) => {
      return <div></div>;
    },
  },
  ElRadio: {
    render: (data, col) => {
      let option: { label: string; value: number }[] = [];
      for (const obj of col?.props?.option!) {
        option[obj.order] = {
          label: obj.label,
          value: obj.value,
        };
      }

      return (
        <div>
          <el-radio-group>
            {option.map((item) => {
              return <el-radio label={item.value}>{item.label}</el-radio>;
            })}
          </el-radio-group>
        </div>
      );
    },
    append: (data, col) => {
      return <div></div>;
    },
    tooltip: (data, col) => {
      return <div></div>;
    },
  },
  ElCheckBox: {
    render: (data, col) => {
      let option: { label: string; value: number }[] = [];
      for (const obj of col?.props?.option!) {
        option[obj.order] = {
          label: obj.label,
          value: obj.value,
        };
      }
      return (
        <div>
          <el-checkbox-group>
            {option.map((item) => {
              return <el-checkbox label={item.value}>{item.label}</el-checkbox>;
            })}
          </el-checkbox-group>
        </div>
      );
    },
    append: (data, col) => {
      return <el-input />;
    },
    tooltip: (data, col) => {
      return <el-input />;
    },
  },
  ElDatePicker: {
    render: (data, col) => {
      return (
        <div>
          <el-date-picker />
        </div>
      );
    },
  },
  ElImage: {
    render: (data, col) => {
      return (
        <div>
          <el-image />
        </div>
      );
    },
  },
  ElIcon: {
    render: (data, col) => {
      const IconComponent = ElementPlusIconsVue[col?.props.icon as keyof typeof ElementPlusIconsVue];
      console.log(IconComponent);
      return (
        <div>
          <el-icon>
            <IconComponent />
          </el-icon>
        </div>
      );
    },
  },
  ElButton: {
    render: (data, col, index, formEl) => {
      if (!props.isPreview) {
        return <el-button>{col?.label}</el-button>;
      } else {
        return (
          <el-button
            onClick={() => {
              col.props.onClick && ctx[col.props.onClick?.value]?.();
            }}
          >
            {col?.label}
          </el-button>
        );
      }
    },
  },
  ElTable: {
    render(data, col) {
      return (
        <div>
          <el-table>
            {col?.props?.columns?.map((item: any, index: number) => {
              return (
                <el-table-column
                  label={item.title}
                  prop={item.dataIndex}
                  {...item}
                  v-slots={{
                    default: (scope: RowScope) => {
                      if (item.render?.schema?.children.length==1) {
                        return CanvasComp(item.render.schema, false, true);
                      } else {
                        return scope.row.data;
                      }
                    },
                  }}
                ></el-table-column>
              );
            })}
          </el-table>
          <el-pagination
            v-model:current-page={((col?.pagerConfig ?? {}).value ?? {}).currentPage}
            v-model:page-size={((col?.pagerConfig ?? {}).value ?? {}).pageSize}
            {...col?.pagerConfig?.value}
          />
        </div>
      );
    },
  },
  ElCard: {
    render(data, col) {
      return (
        <div>
          <el-card style={{ width: "100%", height: "100%" }}></el-card>
        </div>
      );
    },
  },
  ElTags: {
    render(data, col) {
      return (
        <div>
          <el-tabs
            type="card"
            modelValue={col?.active}
            onTabChange={(n: number) => {
              props.componentMap.set(col?.id, { ...col, active: n });
            }}
          >
            {col?.props.tabItems?.map((item: any) => (
              <el-tab-pane label={item.label} name={item.name}>
                {item?.children.length ? (
                  item.children.map((_col: Col) => {
                    return CanvasComp(_col);
                  })
                ) : (
                  <p style={{ margin: "auto" }}>{"请将元素拖放到此"}</p>
                )}
              </el-tab-pane>
            ))}
          </el-tabs>
        </div>
      );
    },
  },
  ElBreadCrumb: {
    render(data, col) {
      return (
        <div>
          <el-breadcrumb separator-icon={<i-ep-arrowRight />}>
            {col?.props.option?.map((opt) => {
              return <el-breadcrumb-item>{opt.label}</el-breadcrumb-item>;
            })}
          </el-breadcrumb>
        </div>
      );
    },
  },
  ElDivider: {
    render(data, col) {
      return <el-divider />;
    },
  },
  ElSteps: {
    render(data, col) {
      return (
        <div>
          <el-steps>
            <el-step title="步骤1" description="描述信息" />
            <el-step title="步骤2" description="描述信息" />
            <el-step title="步骤3" description="描述信息" />
          </el-steps>
        </div>
      );
    },
  },
  ElCol: {
    render(data, col) {
      return <el-col></el-col>;
    },
  },
  ElRow: {
    render(data, col) {
      return <el-row></el-row>;
    },
  },
  ElPageHeader: {
    render(data, col) {
      return (
        <div>
          <el-page-header
            style={{ background: "#333", color: "#fff", padding: "5px" }}
            v-slots={{
              title: () => {
                return <div style={{ fontSize: "20px" }}>{"MlDesigner"}</div>;
              },
              extra: () => {
                return <el-button>登录</el-button>;
              },
              content: () => {
                return (
                  <div>
                    {" "}
                    <el-dropdown style={{ color: "#fff" }}>
                      <span class="el-dropdown-link">
                        Dropdown List
                        <el-icon class="el-icon--right">
                          <arrow-down />
                        </el-icon>
                      </span>
                    </el-dropdown>
                  </div>
                );
              },
            }}
          />
        </div>
      );
    },
  },
};
const FooterBar = function () {
  return (
    <div
      class="mllowcode_footerBar"
      style={{
        position: "absolute",
        bottom: "-25px",
        right: 0,
        width: "3rem",
        height: "25px",
        backgroundColor: "#32adf7",
        borderTop: "1px solid #f1f1f1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <i-ep-document-copy
        style={{ color: "#fff", fontSize: "1rem", cursor: "pointer" }}
        onClick={() => {
          emit("copy", currAEl.value.clickId);
        }}
      />
      <i-ep-delete
        style={{ color: "#fff", fontSize: "1rem", cursor: "pointer" }}
        onClick={() => {
          emit("delete", currAEl.value.clickId);
        }}
      />
    </div>
  );
};
const HeaderBar = function (props: { name?: string }) {
  return (
    <div class="mllowcode_footerBar absolute -top-[30px] -left-[2px] px-[5px] py-[2px] w-fit h-[25px] bg-[#32adf7] border-t border-[#f1f1f1] flex justify-center items-center z-[999]">
      <span style={{ color: "#fff", fontSize: "16px" }}>{props.name}</span>
      <i-ep-setting
        style={{ color: "#fff", fontSize: "0.8rem", cursor: "pointer" }}
        onClick={() => {
          // 打开设置弹窗
        }}
      />
    </div>
  );
};
const CanvasComp: (col: Col, isSlot?: Boolean, isRender?: Boolean) => VNode = (
  col,
  isSlot = false,
  isRender = false,
) => {
  const Component = renderForm[col?.componentName as ComponentType]?.render?.(col?.label, col) || <div></div>;
  const _props_: Record<string, any> = {
    ...col?.props,
    style: { ...col?.props.style, boxSizing: "border-box" },
    "data-tag": col?.componentName,
    "data-id": col?.id,
    class: ["canvascomp", ...(typeof col?.props.class == "string" ? [col?.props.class] : [])],
  };

  if (props.isPreview || isRender) {
    return h(Component, _props_, {
      default: () => [
        Array.isArray(Component.children)
          ? Component.children.map((node: VNode | string | (() => VNode)) => {
              if (typeof node === "string") return node;
              const ChildNode = node as () => VNode;
              return (
                <ChildNode {...omit(col?.props, ["style", "class"])}>
                  {isSlot
                    ? col?.children && col?.componentName != "ElTags"
                      ? col?.children.length
                        ? col?.children.map((child) => CanvasComp(child, child?.componentName == "ElCard", isRender))
                        : ""
                      : null
                    : (node as VNode).children?.default?.()}
                </ChildNode>
              );
            })
          : Component.children?.default?.() || Component.children,
        isSlot
          ? null
          : col?.children && col?.componentName != "ElTags"
            ? col?.children.length
              ? col?.children.map((child) => CanvasComp(child, child?.componentName == "ElCard", isRender))
              : ""
            : null
        
      ],
    });
  }
  return h(
    Component,
    {
      ...col?.props,
      style: { ...col?.props.style, boxSizing: "border-box", position: "relative" },
      "data-tag": col?.componentName,
      "data-id": col?.id,
      draggable: true,
      class: [
        "canvascomp",
        {
          hover_child: currAEl.value.hoverId == col?.id,
          box: col?.children && !col?.children?.length,
          dragover: currAEl.value.overId == col?.id,
          nonEmpty: !!col?.children?.length,
          active: currAEl.value.clickId == col?.id,
        },
        ...(typeof col?.props.class == "string" ? [col?.props.class] : []),
      ],
      onClick: (e) => {
        e.stopPropagation();
        currAEl.value.clickId = col?.id as string;
        emit("current", col);
      },
      onMouseover: (e: MouseEvent) => {
        e.stopPropagation();
        currAEl.value.hoverId = col?.id as string;
      },
      onMouseleave: (e: MouseEvent) => {
        e.stopPropagation();
        currAEl.value.hoverId = null;
      },
      onDragstart(el) {
        emit("start", el);
      },
    },
    {
      default: () => [
        h("div", {
          "data-id": col?.id,
          class: [
            "overlay",
            {
              insertBottom: currAEl.value.insertBottomId == col?.id,
              insertTop: currAEl.value.insertTopId == col?.id,
            },
          ],
          style: { zIndex: col?.componentName == "ElTags" ? 0 : 1 },
          onDragenter(el) {
            emit("enter", el);
            el.preventDefault();
          },
          onDragleave(el) {
            el.preventDefault();
            emit("leave", el);
          },
          onDragover(el) {
            emit("over", el);
            el.preventDefault();
          },
          onDrop(el) {
            emit("end", el);
          },
        }),
        Array.isArray(Component.children)
          ? Component.children.map((node: VNode | string | (() => VNode)) => {
              if (typeof node === "string") return node;
              const ChildNode = node as () => VNode;
              return (
                <ChildNode {...omit(col?.props, ["style", "class"])}>
                  {isSlot
                    ? col?.children && col?.componentName != "ElTags"
                      ? col?.children.length
                        ? col?.children.map((child) => CanvasComp(child, child?.componentName == "ElCard", isRender))
                        : "拖拽组件到此处"
                      : null
                    : (node as VNode).children?.default?.()}
                </ChildNode>
              );
            })
          : Component.children?.default?.() || Component.children,
        isSlot
          ? null
          : col?.children && col?.componentName != "ElTags"
            ? col?.children.length
              ? col?.children.map((child) => CanvasComp(child, child?.componentName == "ElCard", isRender))
              : "拖拽组件到此处"
            : null,
        currAEl.value.clickId == col?.id ? <HeaderBar name={col?.componentName} /> : null,
        currAEl.value.clickId == col?.id ? <FooterBar /> : null,
      ],
    },
  );
};
const emit = defineEmits(["delete", "copy", "start", "enter", "leave", "over", "end", "current"]);
const currAEl = defineModel<{
  clickId: null | string;
  hoverId: null | string;
  overId: null | string;
  insertTopId: string | null;
  insertBottomId: string | null;
}>("currAEl", {
  required: true,
});
const schema = computed<Col>(() => {
  return props.schema;
});
</script>

<template>
  <component :is="CanvasComp(schema, schema.componentName == 'ElCard', false)"> </component>
  <template v-if="props.isPreview">
    <component :is="CanvasComp(item, false, false)" v-for="(item, index) in props.popup" :key="index"> </component>
  </template>
</template>

<style lang="less" scoped>
:deep(.hover-effect) {
  &:hover {
    background-color: #f1f1f1 !important;
  }
}

:deep(.el-col) {
  position: relative;
}

:deep(.el-form-item__content) {
  align-items: start;
  position: static;
}

.box {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 3px 0;
  height: 50px;
  font-size: 13px;
  background-color: #f1f1f1;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nonEmpty {
  height: fit-content;
  padding: 5px;
  background-color: #fff;
}

.canvascomp {
  position: relative;
  cursor: move;
  box-sizing: border-box;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.insertTop {
  border-top: 3px solid #32adf7 !important;
}

.insertBottom {
  border-bottom: 3px solid #32adf7 !important;
}

.hover_child {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px dashed #32adf7;
    pointer-events: none;
  }

  &::before {
    display: block;
    content: attr(data-tag);
    position: absolute;
    top: -20px;
    left: 0;
    width: fit-content;
    color: #32adf7;
    z-index: 999;
  }

  // 新增：为表格组件添加特殊处理
  &[data-tag="ElTable"] {
    &::after {
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      pointer-events: none;
    }
  }
}

.active {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #32adf7;
    pointer-events: none;
  }

  // 新增：为表格组件添加特殊处理
  &[data-tag="ElTable"] {
    &::after {
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      pointer-events: none;
    }
  }
}

.dragover {
  position: relative;
  background-color: rgb(233, 250, 250) !important;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px dashed #32adf7;
    pointer-events: none;
  }

  &::before {
    display: block;
    content: attr(data-tag);
    position: absolute;
    top: -20px;
    left: 0;
    width: fit-content;
    color: #32adf7;
  }
}

.editBtn {
  //绝对定位布局

  position: absolute;

  right: 10px;

  bottom: 3px;

  font-size: 20px;

  color: #ccc;

  cursor: pointer;

  color: #838383;

  border-radius: 20px;

  border: 1px solid #ccc;

  background-color: #fff;

  padding: 4px 0;

  width: 55px;

  font-size: 12px;

  height: 13px;

  display: flex;

  justify-content: space-evenly;
}

.page_search {
  background-color: #f1f1f1;

  height: auto;

  border-radius: 5px;

  padding: 10px 20px;

  :deep(.linebreak) {
    .el-form-item__label {
      width: 80px;

      height: auto !important;

      line-height: 20px;

      text-align: right;
    }
  }

  .form6-inline {
    padding: 10px 0 0 30px;
  }
}

:deep(.el-form-item__label-wrap) {
  margin-left: 0px !important;
}

:deep(.el-radio:last-child) {
  margin-right: 32px;
}

:deep(.el-radio-group) {
  align-items: start;
}

.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  height: 88%;
}

:deep(.el-tabs__content) {
  padding: 22px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-menu {
  border: none;
}
</style>
