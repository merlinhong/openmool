<template>
  <div class="sidebar-container">
    <nav class="sidebar-nav">
      <div class="top-buttons">
        <button class="add-button" @click="openPanel('drawer');">+</button>
        <button class="nav-button" @click="openPanel('js')">JS</button>
        <button class="nav-button" @click="openPanel('ref')">ref</button>
        <button class="var-button" @click="openPanel('var');">var</button>
        <!-- 其他现有按钮 -->
        <button class="page-button" @click="openPanel('page');">Page</button>
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
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="组件" name="0">
          <el-scrollbar height="75vh">
            <div class="component-list">
              <h3>基础</h3>
              <ul class="base-component">
                <li v-for="item in baseComponentList" :key="item.dataType" :data-type="item.dataType"
                  class="component-item">
                  <iEpDocument width="15px" />
                  <span>{{ item.text }}</span>
                </li>
              </ul>

              <h3>高级</h3>
              <ul class="base-component">
                <li v-for="item in seniorComponentList" :key="item.dataType" :data-type="item.dataType"
                  class="component-item">
                  <iEpDocument width="15px" />
                  <span>{{ item.text }}</span>
                </li>
              </ul>
            </div>
          </el-scrollbar>
        </el-tab-pane>

        <el-tab-pane label="模板" name="1">
          <ul class="block-component" draggable></ul>
        </el-tab-pane>
      </el-tabs>
    </aside>

    <div class="w-[260px] absolute border-r border-[#e2e2e2] bg-white h-full left-[2.3rem] z-[999]" v-if="showVar">
      <div class="flex p-5 box-border">
        <el-radio-group v-model="addType" @change="setVar">
          <el-radio-button value="添加变量" label="添加变量"></el-radio-button>
          <el-radio-button value="添加生命周期" label="添加生命周期"></el-radio-button>
        </el-radio-group>
      </div>

      <el-divider class="mt-0"></el-divider>

      <div class="p-[5px]">
        <div v-for="item in addList">{{ item }}</div>
      </div>
    </div>

    <div class="w-[400px] absolute border-r border-[#e2e2e2] bg-white h-full left-[18.6rem] z-[999]" v-if="setVarRef">
      <div class="flex justify-end p-[10px]">
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

    <div v-if="showJS" class="w-[600px] absolute border-r border-[#e2e2e2] bg-white h-full left-[2.4rem] z-[999]">
      <div class="flex justify-between items-center p-[2px_5px]">
        <h4 class="px-5">页面JS</h4>

        <div>
          <el-button type="primary" plain @click="saveEditor">保存<span class="text-red-500"
              v-if="isChange">*</span></el-button>
          <i-ep-delete></i-ep-delete>
        </div>
      </div>

      <div id="JS_editor_container" class="w-[560px] h-[90%] border border-[#c9c8c8]"></div>
    </div>

    <div v-if="showRef" class="w-[600px] absolute bg-white border-r border-[#e2e2e2] h-full left-[2.4rem] z-[999]">
      <div class="flex justify-between items-center p-[2px_5px]">
        <h4 class="px-5">页面Ref</h4>

        <div>
          <el-button type="primary" plain @click="saveEditor">保存<span class="text-red-500"
              v-if="isChange">*</span></el-button>
        </div>
      </div>

      <div id="Ref_editor_container" class="w-[560px] h-[90%] border border-[#c9c8c8]"></div>
    </div>

    <div v-if="showSchema" class="w-[600px] absolute bg-white border-r border-[#e2e2e2] h-full left-[2.4rem] z-[999]">
      <div class="flex justify-between items-center p-[2px_5px]">
        <h4 class="px-5">页面schema</h4>
        <div>
          <el-button type="primary" plain @click="saveEditor">保存<span class="text-red-500"
              v-if="isChange">*</span></el-button>
          <el-button type="primary" text @click="showSchema = false">关闭</el-button>
        </div>
      </div>

      <div id="editor_container" class="w-[560px] h-[90%] border border-[#c9c8c8]"></div>
    </div>
  </div>
  <RobotMainVue v-if="openAiRef" :schema="props.currentConf" @update:schema="updateConf"
    :foundationModel="foundationModel" class="robot-main" />
  <PagePanel v-if="showPagePanel" @close="showPagePanel = false" @selectPage="selectPage" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick, toRaw, Ref, PropType } from "vue";
import { Page, Col } from "@/mool/types";
import { baseComponentList, seniorComponentList, initEditor, type MonacoEditor } from "@/mool/utils";
import PagePanel from "./PagePanel.vue";

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

const activeName = ref("0");
const addType = ref("");
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
const jscode = ref<string[]>([]);

const closeAllPanels = () => {
  drawer.value = false;
  showSchema.value = false;
  showJS.value = false;
  showRef.value = false;
  showVar.value = false;
  setVarRef.value = false;
};

const openPagePanel = () => {
  showPagePanel.value = true;
};
const selectPage = (row: { id: string; name: string; schema: any }) => {
  showPagePanel.value = false;
  emit("editPage", row.id);
};
const openPanel = (panel: "drawer" | "schema" | "js" | "ref" | "var" | "setVar" | 'page') => {
  // 检查当前点击的面板是否已经打开
  const isCurrentPanelOpen =
    (panel === "drawer" && drawer.value) ||
    (panel === "schema" && showSchema.value) ||
    (panel === "js" && showJS.value) ||
    (panel === "ref" && showRef.value) ||
    (panel === "var" && showVar.value) ||
    (panel === "setVar" && setVarRef.value);

  // 先关闭所有面板
  closeAllPanels();

  // 如果当前面板已经打开，那么就保持关闭状态
  if (isCurrentPanelOpen) {
    return;
  }
  switch (panel) {
    case "drawer":
      drawer.value = true;
      break;
    case "schema":
      showSchema.value = true;
      if (showSchema.value) {
        nextTick(() => {
          initEditorWithCommonOptions({
            id: "editor_container",
            code: JSON.stringify(PageSchema.value, null, 2),
          });
        });
      }
      break;
    case "js":
      showJS.value = true
      break;
    case "ref":
      showRef.value = true;
      if (showRef.value) {
        nextTick(() => {
          initEditorWithCommonOptions({
            id: "Ref_editor_container",
            code: generateRefCode(),
            lang: "typescript",
          });
        });
      }
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
    case 'page':
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
          return `//选择日期时间范围的计算属性\nconst ${key}:${item.type} = vue.computed({
            get(){
              return ${item.value}
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
      emit("change", [n, '20px 40px']);
    } else {
      emit("change", [n, '20px 160px']);
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
const updateConf = (schema?: Col) => {
  let ruleProps: string[] = [];
  if (props.currentConf?.componentName == "div") {
    function collectValues(obj: Record<string, any>) {
      const stack = [obj]; // 初始化栈，第一个元素是根对象和空路径
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
        // 如果 source[key] 是对象且不是 null，递归调用
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
    let config = pageSchema.value;

    const regex = /^[;\s]*function\s+(\w+)\s*\(([^)]*)\)\s*{([\s\S]*?)}[;\s]*/;

    let matches;

    function isBracePairBalanced(codeString: string, tempArr: any[]) {
      const stack = [];

      for (let i = 0; i < codeString.length; i++) {
        const char = codeString[i];

        if (char === "{") {
          stack.push(char);
        } else if (char == "}") {
          // if(stack.length===0||stack.pop()!=='{'){

          // return false;// 错误：未匹配到右大括号或匹配不正确

          // }

          stack.pop();

          if (stack.length == 0) {
            // 当前函数匹配结束

            matches = regex.exec(codeString.substring(0, i + 1));

            if (matches) {
              matches[3] += "}" + codeString.substring(0, i).replace(matches[0], "");

              tempArr.push({
                functionName: matches[1].trim(),

                parameters: matches[2].trim(),

                body: matches[3].trim(),
              });

              // 继续匹配后面的函数

              isBracePairBalanced(codeString.substring(i + 1), tempArr);

              break; // 这里必须中止当前循环
            }
          }
        }
      }
    }

    const results: any[] = [];

    isBracePairBalanced(config, results);

    // 遍匹配结果设置到schema的方法中

    results.forEach((res) => {
      PageSchema.value.methods[res.functionName] = {
        type: "JSFunction",

        value: `function ${res.functionName}(${res.parameters}){\n${res.body}\n};`,
      };
    });
  }

  if (showSchema.value) {
    const config = JSON.parse(pageSchema.value);

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
    const config = pageSchema.value;

    const regex = /const (.*?) = vue\.ref<(.*?)>\(([^()]*)\)/g;

    let matches;

    const results = [];

    while ((matches = regex.exec(config)) !== null) {
      results.push({
        variableName: matches[1].trim(),

        type: matches[2].trim(),

        value: JSON.parse(matches[3].trim()),
      });
    }

    results.forEach((res) => {
      PageSchema.value.ref[res.variableName] = {
        type: res.type,

        value: res.value,
      };
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
const emit = defineEmits(["change", 'editPage']);
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;
  display: flex;
}

.sidebar-nav {
  background-color: #fff;
  padding: 10px 5px;
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
  width: 25px;
  height: 25px;
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
  font-size: 18px;
  font-weight: bold;
  color: #333;
  border: 2px solid #333;
}

.var-button {
  font-size: 10px;
}

.nav-button {
  font-weight: bold;
  background: none;
  border: none;
  padding: 5px;
}

.page-button {
  font-weight: bold;
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
  width: 220px;
  background-color: #fff;
  border-right: 1px solid #e2e2e2;
}

.component-list {
  margin-top: 15px;
}

.base-component,
.block-component {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    width: 90px;
    line-height: 25px;
    text-align: left;
    height: 25px;
    padding: 4px 5px;
    margin: 10px 5px;
    font-size: 13px;
    cursor: move;
    border: 1px solid @border-color-base;
    border-radius: 5px;

    &:hover {
      border: 1px dashed @primary-color !important;
    }
  }
}

.robot-main {
  z-index: 999;
  position: absolute;
  bottom: 50px;
  right: 320px;
}
</style>