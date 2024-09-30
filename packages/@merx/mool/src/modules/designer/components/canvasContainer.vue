<script setup lang="tsx">
import { h, type PropType, computed, resolveComponent, shallowRef, VNode } from "vue";
import type { ComponentType, Render, Col, RowScope } from "@/mool/types/BasicForm";
import { omit } from "@/mool/utils";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
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
});

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
  ElMenu: {
    render: (data, col, child) => {
      return (
        <div>
          <el-menu style={{ borderBottom: "none !important" }}>
            {col?.props.menuItems?.map((item) => {
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
            {col?.props?.option?.map((item) => {
              return <el-carousel-item>{resolveComponent()}</el-carousel-item>;
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
  Text: {
    render: (data, col) => {
      return (
        <div>
          <span>{data}</span>
        </div>
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
      return (
        <div>
          <el-input type="textarea" />
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

  ElButton: {
    render: (data, col, index, formEl) => {
      return (
        <div>
          <el-button>{col?.label}</el-button>
        </div>
      );
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
                      if (!!item.render?.schema?.children) {
                        return CanvasComp(item.render.schema, true);
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
          <el-card shadow="hover" style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}>
            Hover
          </el-card>
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
    <div
      class="mllowcode_footerBar"
      style={{
        position: "absolute",
        top: "-30px",
        left: "-2px",
        padding: "2px 5px",
        width: "fit-content",
        height: "25px",
        backgroundColor: "#32adf7",
        borderTop: "1px solid #f1f1f1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
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
const CanvasComp: (col: Col, isRenderColumn?: Boolean) => VNode = (col, isRenderColumn = false) => {
  const Component = renderForm[col?.componentName as ComponentType]?.render?.(col?.label, col) || <div></div>;
  if (props.isPreview || isRenderColumn) {
    return h(
      Component,
      {
        ...col?.props,
        style: { ...col?.props.style, boxSizing: "border-box" },
        "data-tag": col?.componentName,
        "data-id": col?.id,
        class: ["canvascomp"],
      },
      {
        default: () => [
          Array.isArray(Component.children)
            ? Component.children.map((item: VNode) => <item {...omit(col?.props, ["style"])}></item>)
            : Component.children,
          col?.children && col?.componentName != "ElTags"
            ? col?.children.length
              ? col?.children.map((child) => CanvasComp(child,isRenderColumn))
              : "请将元素拖放到此"
            : null,
        ],
      },
    );
  }
  return h(
    Component,
    {
      ...col?.props,
      style: { ...col?.props.style, boxSizing: "border-box" },
      "data-tag": col?.componentName,
      "data-id": col?.id,
      draggable: true,
      class: [
        "canvascomp",
        {
          hover_child: currAEl.value.hoverId == col?.id,
          box: col?.children !== undefined,
          dragover: currAEl.value.overId == col?.id,
          nonEmpty: !!col?.children?.length,
          enter_page: currAEl.value.hoverId == col?.id,
        },
      ],
      id: currAEl.value.clickId == col?.id ? "active" : "",
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
        currAEl.value.clickId == col?.id ? <HeaderBar name={col?.componentName} /> : null,
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
          ? Component.children.map((item: VNode) => <item {...omit(col?.props, ["style"])}></item>)
          : Component.children,
        col?.children && col?.componentName != "ElTags"
          ? col?.children.length
            ? col?.children.map((child) => CanvasComp(child,isRenderColumn))
            : "请将元素拖放到此"
          : null,
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
  <component :is="CanvasComp(schema)"> </component>
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

#active {
  position: relative;
  border: 2px solid #32adf7 !important;
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
}

.nonEmpty {
  height: fit-content;
  background-color: #fff !important;
  color: #000 !important;
}

.canvascomp {
  position: relative;
  cursor: move;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1;
}

.insertTop {
  border-top: 3px solid #32adf7 !important;
}

.insertBottom {
  border-bottom: 3px solid #32adf7 !important;
}

.enter_page {
  border: 1px dashed #32adf7;
}

.hover_child {
  position: relative;
  // padding: 0 5px 5px 0;
  box-sizing: border-box;

  &:hover {
    border: 1px dashed #32adf7;

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
  }
}

.dragover {
  position: relative;
  border: 1px dashed #32adf7;
  background-color: rgb(233, 250, 250) !important;

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
</style>
