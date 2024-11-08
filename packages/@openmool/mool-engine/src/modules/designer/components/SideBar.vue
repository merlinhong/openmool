<template>
  <div class="sidebar-container">
    <nav class="sidebar-nav">
      <div class="top-buttons">
        <div v-for="item in btnGroup" :key="item.name" style="padding: 5px; width: 100%;"
          :class="[{ 'active-button': item.active }]">
          <button @click="openPanel(item.name as any)" :class="item.className" style="margin: 5px auto;">
            {{ item.name }}
          </button>
        </div>
      </div>

      <div class="bottom-buttons">
        <button class="icon-button" @click="openRobot">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fell="currentColor"
              d="M13.5 2c0 .444-.193.843-.5 1.118V5h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h5V3.118A1.5 1.5 0 1 1 13.5 2M6 7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-4 3H0v6h2zm20 0h2v6h-2zM9 14.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" />
          </svg>
        </button>
        <button class="icon-button" @click="openPanel('schema')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
            <g fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
              <rect width="13" height="13" x=".5" y=".5" rx="1" />
              <path d="M.5 4h13m-9 3L3 8.5L4.5 10M10 7l1.5 1.5L10 10m-3.5.5L8 6" />
            </g>
          </svg>
        </button>
      </div>
    </nav>

    <aside v-if="drawer" class="component-drawer">
      <el-tabs v-model="activeName" class="centered-tabs">
        <el-tab-pane label="组件" name="0">
          <el-scrollbar height="80vh">
            <div class="component-list">
              <ElCollapse v-model="activeGroups">
                <ElCollapseItem v-for="(group, index) in componentGroups" :key="index" :title="group.title" :name="index">
                  <ul class="base-component">
                    <li v-for="item in group.components" :key="item.dataType" :data-type="item.dataType"
                      class="component-item">
                      <div class="component-item-inner">
                        <span>{{ item.text }}</span>
                      </div>
                    </li>
                  </ul>
                </ElCollapseItem>
              </ElCollapse>
            </div>
          </el-scrollbar>
        </el-tab-pane>

        <el-tab-pane label="模板" name="1">
          <ul class="block-component" draggable></ul>
        </el-tab-pane>
      </el-tabs>
    </aside>

    <div class="w-[260px] absolute border-r border-l border-[#e2e2e2] bg-white h-full left-[44px] z-[999]" v-if="showVar">
      <div class="flex px-5 pt-5 box-border">
        <el-radio-group v-model="addType" @change="setVar">
          <el-radio-button value="添加变量" label="添加变量"></el-radio-button>
          <el-radio-button value="添加生命周期" label="添加生命周期"></el-radio-button>
        </el-radio-group>
      </div>

      <el-divider class="mt-0 "></el-divider>

      <div class="p-[5px]">
        <div v-for="item in addList">{{ item }}</div>
      </div>
    </div>

    <div class="w-[400px] absolute border-r border-[#e2e2e2] bg-white h-full left-[304px] z-[999]" v-if="setVarRef">
      <div class="flex justify-end p-3  box-border">
        <el-button type="primary" plain size="small" @click="saveEditor">保存<span class="text-red-500"
            v-if="isChange">*</span></el-button>
      </div>

      <el-divider class="mt-0"></el-divider>

      <div class="p-[5px]">
        <el-form-item :label="labelTypeList[addType]">
          <el-input v-model="typeName" />
        </el-form-item>

        <span class="text-sm">初始值</span>

        <div id="var_editor_container" class="w-full h-[200px] border border-[#c9c8c8]"></div>
      </div>
    </div>

    <div v-if="showJS" class="w-[600px] absolute border-r border-[#e2e2e2] bg-white h-full left-[44px] z-[999] ">
      <div class="flex justify-between items-center p-[2px_5px]">
        <h4 class="px-5">页面JS</h4>
        <div>
          <el-button type="primary" plain @click="saveEditor">保存<span class="text-red-500"
              v-if="isChange">*</span></el-button>
          <i-ep-delete></i-ep-delete>
        </div>
      </div>
      <MlEditorMonaco :ref="setRefs('editor')" height="100%" v-model="jscode" lang="typescript" border></MlEditorMonaco>
    </div>

    <div v-if="showRef" class="w-[600px] absolute bg-white border-r border-[#e2e2e2] h-full left-[44px] z-[999]">
      <div class="flex justify-between items-center p-[2px_5px]">
        <h4 class="px-5">页面Ref</h4>
        <div>
          <el-button type="primary" plain @click="saveEditor">保存<span class="text-red-500"
              v-if="isChange">*</span></el-button>
        </div>
      </div>
      <MlEditorMonaco :ref="setRefs('editor')" height="100%" v-model="refcode" lang="typescript" border></MlEditorMonaco>
    </div>

    <div v-if="showSchema" class="w-[600px] absolute bg-white border-r border-[#e2e2e2] h-full left-[44px] z-[999]">
      <div class="flex justify-between items-center p-[2px_5px]">
        <h4 class="px-5">页面schema</h4>
        <div>
          <el-button type="primary" plain @click="saveEditor">保存<span class="text-red-500"
              v-if="isChange">*</span></el-button>
          <el-button type="primary" text @click="showSchema = false">关闭</el-button>
        </div>
      </div>
      <MlEditorMonaco :ref="setRefs('editor')" height="85%" v-model="schemaCode" border></MlEditorMonaco>
    </div>
  </div>
  <PagePanel v-if="showPagePanel" @close="showPagePanel = false" @selectPage="selectPage" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick, toRaw, Ref, PropType, watchEffect } from "vue";
import { Page, Col } from "@/mool/types";
import { useMool } from "@/mool";
import { baseComponentList, seniorComponentList, initEditor, type MonacoEditor } from "@/mool/utils";
import PagePanel from "./PagePanel.vue";
import { componentGroups } from "@/mool/utils/schema";
import { ElCollapse, ElCollapseItem } from "element-plus";

const { refs, setRefs } = useMool();
const props = defineProps({
  pageConfig: {
    type: Object as PropType<Page>,
    required: true,
  },
  width: {
    type: String,
    default: "100%",
  },
  currentConf: {
    type: Object as PropType<Col | null>,
    required: true,
  },
});
const PageSchema = defineModel<Page>("pageConfig", { required: true });
const OpenPanel = defineModel<Record<"js" | "ref", boolean>>("openPanel");
const activeName = ref("0");
const addType = ref("");

// 侧边栏按钮组
const btnGroup = ref<{ name: string; className: string; active?: boolean }[]>([
  { name: "+", className: "add-button" },
  { name: "JS", className: "nav-button" },
  { name: "ref", className: "nav-button" },
  { name: "var", className: "var-button" },
  { name: "Page", className: "page-button" },
]);
const labelTypeList: Record<string, string> = {
  添加变量: "变量名",

  添加生命周期: "函数名",
};
const showPagePanel = ref(false);
const drawer = ref(false);
const showSchema = ref(false);
const showJS = ref(false);
const showRef = ref(false);
const showVar = ref(false);
const setVarRef = ref(false);
const isChange = ref(false);
const jscode = ref<string>("");
const refcode = ref<string>("");
const schemaCode = ref<string>("");
const closeAllPanels = () => {
  drawer.value = false;
  showSchema.value = false;
  showJS.value = false;
  showRef.value = false;
  showVar.value = false;
  setVarRef.value = false;
};
watch(
  () => OpenPanel.value,
  () => {
    if (OpenPanel.value?.js) {
      openPanel("JS");
    }
    if (OpenPanel.value?.ref) {
      openPanel("ref");
    }
  },
  { deep: true },
);
const openPagePanel = () => {
  showPagePanel.value = true;
};
const selectPage = (row: { id: string; name: string; schema: any }) => {
  showPagePanel.value = false;
  emit("editPage", [row.id, row.name]);
};
const openPanel = (panel: "+" | "schema" | "JS" | "ref" | "var" | "setVar" | "Page") => {
  // 检查当前点击的面板是否已经打开
  const isCurrentPanelOpen =
    (panel === "+" && drawer.value) ||
    (panel === "schema" && showSchema.value) ||
    (panel === "JS" && showJS.value) ||
    (panel === "ref" && showRef.value) ||
    (panel === "var" && showVar.value) ||
    (panel === "setVar" && setVarRef.value);

  // 先关闭所有面板
  closeAllPanels();
  if (panel == 'setVar') {
    showVar.value = true;
    setVarRef.value = true;
  }
  // 如果当前面板已经打开，那么就保持关闭状态
  if (isCurrentPanelOpen) {

    btnGroup.value.forEach((item) => {
      if (item.name == panel && panel != 'setVar') {
        item.active = false;
      }
    });
    return;
  }
  btnGroup.value.forEach((item) => {
    if (item.name == panel) {
      item.active = true;
    } else {
      panel != 'setVar' && (item.active = false);
    }
  });

  switch (panel) {
    case "+":
      drawer.value = true;
      break;
    case "schema":
      showSchema.value = true;
      if (showSchema.value) {
        schemaCode.value = JSON.stringify(PageSchema.value, null, 2);
      }
      break;
    case "JS":
      showJS.value = true;
      jscode.value = generateJsCode();
      break;
    case "ref":
      showRef.value = true;
      refcode.value = generateRefCode();
      break;
    case "var":
      showVar.value = true;
      break;
    case "setVar":
      setVarRef.value = true;
      if (setVarRef.value) {
        nextTick(() => {
          initEditorWithCommonOptions({
            id: "var_editor_container",
            code: "",
            lang: "javascript",
            callback(ins) {
              editor.value = ins;
            },
          });
        });
      }
      break;
    case "Page":
      openPagePanel();
      break;
  }
};

const generateRefCode = () => {
  return Object.entries(PageSchema.value.ref)
    .map(([key, item]) => {
      if (!item.type) {
        return `//页面表单绑定数据\nconst ${key} = vue.ref(${JSON.stringify(item, null, 2)})`;
      } else {
        if (item.type == "ComputedRef") {
          return `//选择日期时间范围的计算属性\nconst ${key} = vue.computed({
            get(){
              return 
            },
            set(){
            }
          })`;
        }
        return `${/onSearch/.test(key) ? "//查询表格入参\n" : ""}const ${key} = vue.ref<${item.type}>(${JSON.stringify(item.value, null, 2)})`;
      }
    })
    .join("\n\n");
};

const generateJsCode = () => {
  return Object.entries(PageSchema.value.methods)
    .map(([key, item]) => {
      return `${item.value}`;
    })
    .join("\n\n");
};

const initEditorWithCommonOptions = (options: {
  id?: string;
  code: string;
  lang?: string;
  callback?: (ins: MonacoEditor) => void;
}) => {
  initEditor({
    ...options,
    update: (val) => {
      pageSchema.value = val;
    },
    change() {
      isChange.value = true;
    },
  });
};

const setVar = () => {
  console.log(33);

  openPanel("setVar");
};

const pageSchema = ref<string>("");

const editor = ref<MonacoEditor>(null);

const addList = ref<string[]>([]);

const typeName = ref("");

watch(
  () => drawer.value,
  (n, o) => {
    if (n) {
      emit("change", [n, "20px 40px"]);
    } else {
      emit("change", [n, "20px 160px"]);
    }
  },

  { flush: "post" },
);
// ai
const foundationModel = ref("gpt-4o-mini");
const openAiRef = ref(false);
const openRobot = () => {
  openAiRef.value = !openAiRef.value;
};

// 获取AI返回的结果进行schema赋值
const updateConf = (schema?: Col, isneed = true) => {
  if (!isneed) {
    console.log(1);
    
    return props.pageConfig.children.push(schema as Col);
  }
  let ruleProps: string[] = [];
  if (props.currentConf?.componentName == "div") {
    function collectValues(obj: Record<string, any>) {
      const stack = [obj]; // 初始化栈，第一个元素是根对象和空径
      const result = [];

      while (stack.length > 0) {
        const obj = stack.pop(); // 弹出栈顶元素
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (key === "value") {
              // 收集到value属性的值
              result.unshift(value.value);
            } else if (typeof value === "object" && value !== null) {
              // 如果是对象，则将其压入栈中
              stack.push(value);
            }
          }
        }
      }
      return result;
    }
    ruleProps = collectValues(schema as Col);
    props.currentConf.children?.push(schema as Col);
  } else {
    function updateObject(target: Record<string, any>, source: Record<string, any>) {
      for (const key in source) {
        // 如果 source[key] 对象且不是 null，递归调用
        if (source[key] !== null && typeof source[key] === "object") {
          if (key == "props" && "value" in source[key]) {
            ruleProps.push(source[key].value.value);
          }
          // 如果 target[key] 不存在，初始化为一个空对象
          if (!target[key]) {
            if (Array.isArray(source[key])) {
              target[key] = [];
            } else {
              target[key] = {};
            }
          }
          updateObject(target[key], source[key]); // 递归更新
        } else {
          // 否则直接赋值
          target[key] = source[key];
        }
      }
    }
    updateObject(props.currentConf as Col, schema as Col);
  }

  const setProp = (conf: Col) => {
    conf?.children?.forEach((child, index) => {
      console.log(child);
      if (!child.props.style) {
        child.props.style = {};
      }
      if (child.componentName == "ElFormItem" && !child.props.prop) {
        child.props.prop = ruleProps.shift();
      } else {
        setProp(child);
      }
    });
  };
  setProp(props.currentConf as Col);
};

const saveEditor = () => {
  if (showJS.value) {
    let config = refs.editor.getContent();
    // 新的函数解析逻辑
    const parseFunctions = (code: string) => {
      const results = [];
      let bracketCount = 0;
      let currentFunction = null;
      let buffer = "";

      for (let i = 0; i < code.length; i++) {
        const char = code[i];
        buffer += char;

        if (char === "{") {
          bracketCount++;
          if (bracketCount === 1) {
            // 函数开始
            const match = buffer.match(/function\s+(\w+)\s*\(([^)]*)\)\s*{/);
            if (match) {
              currentFunction = {
                functionName: match[1].trim(),
                parameters: match[2].trim(),
                body: "",
              };
              buffer = "";
            }
          }
        } else if (char === "}") {
          bracketCount--;
          if (bracketCount === 0 && currentFunction) {
            // 函数结束
            currentFunction.body = buffer.slice(0, -1).trim(); // 移最后的 '}'
            results.push(currentFunction);
            currentFunction = null;
            buffer = "";
          }
        }
      }

      return results;
    };

    const functions = parseFunctions(config);

    // 清空现有的方法
    PageSchema.value.methods = {};

    // 添加解析出的函数
    functions.forEach((func) => {
      PageSchema.value.methods[func.functionName] = {
        type: "JSFunction",
        value: `function ${func.functionName}(${func.parameters}){\n${func.body}\n}`,
      };
    });
  }

  if (showSchema.value) {
    const config = JSON.parse(schemaCode.value);
    PageSchema.value = config;
    findFetchData(PageSchema.value as Page);
    function findFetchData(list: Page | Col) {
      list.children?.forEach((child, index, li) => {
        if (child.fetchData && child.fetchData.order !== null && child.componentName == "ElTable") {
          PageSchema.value.ref.searchParams.value[child.fetchData.order] = child.fetchData.params;
        } else {
          findFetchData(child as Col);
        }
      });
    }

    // findComp();
  }

  if (setVarRef.value) {
    if (addType.value == "添加变量") {
      PageSchema.value.state[typeName.value] = {
        type: "JSExpression",

        value: pageSchema.value,
      };
    } else {
      PageSchema.value.lifeCycles[typeName.value] = {
        type: "JSFunction",

        value: pageSchema.value,
      };
    }

    addList.value.push(typeName.value);

    addType.value = "";
  }

  if (showRef.value) {
    let config = refs.editor.getContent();
    const regex = /(const|let|var)\s+(\w+)\s*=\s*vue\.(ref|computed|reactive)\s*\(([\s\S]*?)(?:\)\s*;|\)(?=\s*$))/g;
    let matches;
    const results = [];

    while ((matches = regex.exec(config)) !== null) {
      console.log(matches);

      const variableName = matches[2].trim();
      const vueFunction = matches[3];
      let value = matches[4];

      try {
        // 尝试解析值
        value = new Function(`return ${value}`)();
      } catch (e) {
        // 如果解析失败，保留原始字符串
        console.warn(`Failed to parse value for ${variableName}: ${e.message}`);
      }

      results.push({
        variableName,
        vueFunction,
        value,
      });
    }
    PageSchema.value.ref = {};
    results.forEach((res) => {
      if (res.vueFunction == "computed") {
        PageSchema.value.ref[res.variableName] = {
          type: "ComputedRef",
          value: res.value,
        };
      } else {
        PageSchema.value.ref[res.variableName] = res.value;
      }
    });

    function findFetchData(list: Page | Col) {
      list.children?.forEach((child, index, li) => {
        if (child.fetchData && child.fetchData.order !== null && child.componentName == "ElTable") {
          child.fetchData.params = PageSchema.value.ref?.searchParams[child.fetchData.order];
        } else {
          findFetchData(child as Col);
        }
      });
    }

    findFetchData(PageSchema.value as Page);
  }

  closeAllPanels();
};
const emit = defineEmits(["change", "editPage"]);

const activeGroups = ref([0]); // 默认展开第一个分组
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;
  display: flex;
}

.sidebar-nav {
  background-color: #fff;
  padding: 10px 0px;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #c9c8c8;
}

.top-buttons,
.bottom-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-button,
.var-button,
.nav-button,
.icon-button {
  width: 20px;
  height: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
}

.add-button,
.var-button {
  font-size: 16px;
  border: 1px solid #333;
}

.var-button {
  font-size: 10px;
}

.nav-button {
  background: none;
  border: none;
  padding: 5px;
}

.page-button {
  background: none;
  border: none;
}

.bottom-buttons {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.icon-button {
  width: 22px;
  height: 22px;
  margin-top: 15px;
  background: none;
  border: none;
  cursor: pointer;
}

.component-drawer {
  width: 240px;
  background-color: #fff;
  border-right: 1px solid #e2e2e2;
}

.component-list {
  padding: 10px;
}

:deep(.el-collapse-item__header) {
  font-size: 15px !important;
  color: #303133;
  background-color: transparent;
  border-radius: 4px;
  padding: 0 5px;
  margin-bottom: 5px;
}

:deep(.el-collapse-item__content) {
  padding: 0;
}

.base-component {
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style-type: none;
  margin: 5px 0;
  background-color: transparent !important;
}

.component-item {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: move;

  &:hover {
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
}

.component-item-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.component-item i {
  margin-right: 8px;
  font-size: 18px;
  color: #409eff;
}

.component-item span {
  font-size: 14px;
  color: #606266;
}

:deep(.el-tabs__item) {
  font-size: 14px;
  font-weight: 500;
}

:deep(.el-tabs__nav-wrap::after) {
  height: 1px;
}

.robot-main {
  z-index: 999;
  position: absolute;
  bottom: 50px;
  right: 320px;
}

.component-list {
  /* 保留原有样式 */
}

.base-component {
  /* 保留原有样式 */
}

.component-item {
  /* 保留原有样式 */
}

/* 可能需要添加一些额外的样式来优化 ElCollapse 的外观 */
:deep(.el-collapse-item__header) {
  font-size: 16px;
  font-weight: bold;
}

:deep(.el-collapse-item__content) {
  padding: 0;
}

/* 添加以下样式 */
.centered-tabs :deep(.el-tabs__header) {
  display: flex;
  justify-content: center;
}

.centered-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 0;
  /* 移除底部的线 */
}

.centered-tabs :deep(.el-tabs__nav) {
  float: none;
  justify-content: center;
}

.active-button {
  border-right: 2px solid #409eff;
}
</style>
