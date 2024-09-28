<script setup lang="tsx">
import { onMounted, ref, watch, nextTick, toRaw, Ref } from "vue";

import { Page, Col } from "@/mool/types";

import BasicPage from "$/designer/components/canvasContainer.vue";

import {
  uuid,
  initEditor,
  baseComponentList,
  seniorComponentList,
  DragUtil,
  RemoveDrag,
  type MonacoEditor,
} from "@/mool/utils";

import ConfigPlane from "$/designer/components/settings.vue";

import RobotMainVue from "$/robot/views/Main.vue";

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
const currAEl = ref<CurrAEl>({
  clickId: null,
  overId: null,
  hoverId: null,
  insertTopId: null,
  insertBottomId: null,
})

const {
  dragCompToCanvas,
  initializeComponentMap,
  componentMap,
  start,
  enter,
  over,
  leave,
  end,
  deleteItem,
  copyItem,
} = new DragUtil({
  drag: {
    startEle: [".base_component li"],
    endEle: ".page-design-content",
  },
  canvasDrag: {
    startEle: [".page .canvascomp"],
    endEle: ".overlay",
  },
},(AEl)=>Object.assign(currAEl.value, AEl));

const pageConfig: Ref<Page> = ref({
  ref: {},
  lifeCycles: {},
  state: {},
  methods: {},
  componentName: "Page",
  props: {
    style: {
      marginBottom: "18px",
      backgroundColor: "#fff",
    },
  },
  children: [],

  id: uuid(),

  css: "",
});
const currentConf = ref<Col>();

const isShowConfig = ref<boolean>(false);

const pageSchema = ref<string>("");

const activeName = ref("0");

const editor = ref<MonacoEditor>(null);

const drawer = ref(false);

const showSchema = ref(false);

const showJS = ref(false);

const showRef = ref(false);

const showVar = ref(false);

const addList = ref<string[]>([]);

const setVarRef = ref(false);

const openAiRef = ref(false);

const addType = ref("");

const labelTypeList: Record<string, string> = {
  添加变量: "变量名",

  添加生命周期: "函数名",
};

const isChange = ref(false);

const typeName = ref("");

let removeDrag: RemoveDrag = null;


watch(
  () => drawer.value,
  (n, o) => {
    if (n) {
      const [remove] = dragCompToCanvas(pageConfig, (conf) => {
        getCurrent(conf);
      });
      removeDrag = remove;
    } else {
      removeDrag && removeDrag();
    }
  },

  { flush: "post" }
);

const openEditor = () => {
  showSchema.value = !showSchema.value;
  drawer.value = false;

  showJS.value = false;

  showVar.value = false;

  showRef.value = false;

  setVarRef.value = false;

  if (showSchema.value) {
    initEditor({
      code: JSON.stringify(pageConfig.value, null, 2),

      update: (val) => {
        pageSchema.value = val;
      },

      change() {
        isChange.value = true;
      },
    });
  }
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
              matches[3] +=
                "}" + codeString.substring(0, i).replace(matches[0], "");

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

    // 遍历匹配结果设置到schema的方法中

    results.forEach((res) => {
      pageConfig.value.methods[res.functionName] = {
        type: "JSFunction",

        value: `function ${res.functionName}(${res.parameters}){\n${res.body}\n};`,
      };
    });
  }

  if (showSchema.value) {
    const config = JSON.parse(pageSchema.value);

    pageConfig.value = config;

    findFetchData(pageConfig.value as Page);

    function findFetchData(list: Page | Col) {
      list.children?.forEach((child, index, li) => {
        if (
          child.fetchData &&
          child.fetchData.order !== null &&
          child.componentName == "ElTable"
        ) {
          pageConfig.value.ref.searchParams.value[child.fetchData.order] =
            child.fetchData.params;
        } else {
          findFetchData(child as Col);
        }
      });
    }

    // findComp();
  }

  if (setVarRef.value) {
    if (addType.value == "添加变量") {
      pageConfig.value.state[typeName.value] = {
        type: "JSExpression",

        value: pageSchema.value,
      };
    } else {
      pageConfig.value.lifeCycles[typeName.value] = {
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
      pageConfig.value.ref[res.variableName] = {
        type: res.type,

        value: res.value,
      };
    });

    function findFetchData(list: Page | Col) {
      list.children?.forEach((child, index, li) => {
        if (
          child.fetchData &&
          child.fetchData.order !== null &&
          child.componentName == "ElTable"
        ) {
          child.fetchData.params =
            pageConfig.value.ref?.searchParams[child.fetchData.order];
        } else {
          findFetchData(child as Col);
        }
      });
    }

    findFetchData(pageConfig.value as Page);
  }

  showSchema.value = false;

  setVarRef.value = false;

  isChange.value = false;

  showJS.value = false;

  showRef.value = false;
};

const openMaterial = () => {
  setVarRef.value = false;

  drawer.value = !drawer.value;

  showSchema.value = false;

  showJS.value = false;

  showVar.value = false;

  showRef.value = false;
};

const jscode = ref<string[]>([]);

const openJs = () => {
  setVarRef.value = false;

  showJS.value = !showJS.value;

  showRef.value = false;

  showVar.value = false;

  drawer.value = false;

  showSchema.value = false;

  jscode.value = Object.values(pageConfig.value.methods).map(
    (item) => item.value
  );

  if (showJS.value) {
    initEditor({
      id: "JS_editor_container",

      code: jscode.value.join("\n"),

      update: (val) => {
        pageSchema.value = val;
      },

      lang: "typescript",

      change() {
        isChange.value = true;
      },
    });
  }
};

const openRef = () => {
  setVarRef.value = false;

  showVar.value = false;

  showJS.value = false;

  showRef.value = !showRef.value;

  drawer.value = false;

  showSchema.value = false;

  jscode.value = Object.entries(pageConfig.value.ref).map(([key, item]) => {
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
  });

  if (showRef.value) {
    initEditor({
      id: "Ref_editor_container",

      code: jscode.value.join("\n"),

      update: (val) => {
        pageSchema.value = val;
      },

      lang: "typescript",

      change() {
        isChange.value = true;
      },
    });
  }
};

const openVar = () => {
  showJS.value = false;

  showRef.value = false;

  showVar.value = !showVar.value;

  drawer.value = false;

  showSchema.value = false;

  setVarRef.value = false;

  addType.value = "";

  // if (showVar.value) {

  // initEditor({

  // id: 'var_editor_container',

  // code: jscode.value.join('\n'),

  // update: (val) => {

  // pageSchema.value = val;

  // },

  // lang: 'javascript',

  // change() {

  // isChange.value = true

  // }

  // });

  // };
};

const setVar = () => {
  setVarRef.value = true;

  toRaw(editor.value)?.dispose();

  initEditor({
    id: "var_editor_container",

    code: "",

    update: (val) => {
      pageSchema.value = val;
    },

    lang: "javascript",

    change() {
      isChange.value = true;
    },

    callback(ins) {
      editor.value = ins;
    },
  });
};

const del = (id: string) => {
  deleteItem(id);
  isShowConfig.value = false;
};

const copy = (id: string) => {
  copyItem(id);
};

const activeCurrent = (e: Event) => {
  const target = e.target as HTMLElement;

  currAEl.value.clickId = target.dataset.id as string;
};

const getCurrent = (conf: Col) => {
  currentConf.value = conf;

  currAEl.value.clickId = conf.id as string;

  isShowConfig.value = true;
};

const statuIcon = ref<"info" | "success" | "warning" | "error">("info");

const statuTitle = ref("正在出码，请稍等....");

const generateCoding = ref(false);

const preview = () => {};

const genCode = async () => {
  try {
    // 请求文件夹选择

    const folderHandle = await self.showDirectoryPicker();

    generateCoding.value = true;

    fetch(
      "/api/generate-code",

      {
        method: "POST", // 或 'GET', 'PUT', 'DELETE', 等

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          pageInfo: {
            name: "page",
            schema: pageConfig.value,
          },

          blocksData: [],
        }),
      }
    )
      .then((response) => {
        return response.json();
      })

      .then(async (res) => {
        const pageCode = res.data[0].panelValue

          .replace(/\n\r/, "")

          .replace(/&quot;/g, "'");

        const tsCode = res.data[0].panelTsCode

          .replace(/\n\r/, "")

          .replace(/&quot;/g, "'");

        const requestCode = res.data[0].panelRqCode

          .replace(/\n\r/, "")

          .replace(/&quot;/g, "'");

        // 创建文件

        [
          {
            name: "type.ts",

            code: tsCode,
          },

          {
            name: "page.vue",

            code: pageCode,
          },

          {
            name: "utils/request.ts",

            code: requestCode,
          },
        ].map(async (item) => {
          async function write(file: any, code: any) {
            const writable = await file.createWritable();

            await writable.write(code.replace(/^`|`$/g, ""));

            await writable.close();
          }

          if (item.name.indexOf("/") != -1) {
            // 创建一个新的文件夹

            const newFolderHandle = await folderHandle.getDirectoryHandle(
              item.name.split("/")[0],

              { create: true }
            );

            const writeFile = await newFolderHandle.getFileHandle(
              item.name.split("/")[1],

              { create: true }
            );

            write(writeFile, item.code);
          } else {
            const writeFile = await folderHandle.getFileHandle(item.name, {
              create: true,
            });

            write(writeFile, item.code);
          }

          // 写入内容

          setTimeout(() => {
            statuIcon.value = "success";

            statuTitle.value = "下载成功!";
          }, 2000);
        });
      });
  } catch (error) {
    console.error("错误:", error);
  }
};

const saveSchema = () => {
  fetch("/api/save-schema", {
    method: "post", // 或 'GET', 'PUT', 'DELETE', 等

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      pageInfo: {
        name: "page",

        schema: pageConfig.value,
      },

      blocksData: [],
    }),
  }).then((res) => {
    ElMessage.success("保存成功");
  });
};
const foundationModel = ref("gpt-4o-mini");

const openRobot = () => {
  openAiRef.value = !openAiRef.value;
};

// 获取AI返回的结果进行schema赋值
const updateConf = (schema?: Col) => {
  let ruleProps: string[] = [];
  if (currentConf.value?.componentName == "Box") {
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
    currentConf.value.children?.push(schema as Col);
  } else {
    function updateObject(
      target: Record<string, any>,
      source: Record<string, any>
    ) {
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
    updateObject(currentConf.value as Col, schema as Col);
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
  setProp(currentConf.value as Col);
};

onMounted(() => {
  fetch("/api/query-schema", {
    method: "get", // 或 'GET', 'PUT', 'DELETE', 等
  })
    .then((res) => res.json())

    .then((res) => {
      pageConfig.value = JSON.parse(res.data).pageInfo.schema;

      nextTick(() => {
        // 创建 <style> 元素并插入样式

        const styleEle = document.createElement("style");

        styleEle.dataset.id = pageConfig.value.id;

        styleEle.innerHTML = pageConfig.value.css;

        document.head.appendChild(styleEle);

        initializeComponentMap(pageConfig.value);
      });
    });
});
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header
        style="
          display: flex;

          justify-content: space-between;

          align-items: center;

          background-color: #fff;
        "
      >
        <div style="width: 100px; text-align: center">{{ "< 未命名表单" }}</div>

        <div>表单设计</div>

        <div style="width: 300px; text-align: center">登录</div>
      </el-header>

      <div
        class="toolbar"
        style="
          display: flex;

          justify-content: space-between;

          align-items: center;

          background-color: #fff;

          padding: 10px 20px;

          border-top: 1px solid #eee;

          border-bottom: 1px solid #eee;

          shadow-color: #eee;

          box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.1);
        "
      >
        <span style="font-size: 12px; color: #0b9142">查看新手引导</span>

        <div>
          <el-button type="warning" plain>撤销</el-button>

          <el-button type="primary">重做</el-button>

          <el-button type="primary" plain @click="preview">预览</el-button>

          <el-button type="success" @click="saveSchema">保存</el-button>

          <el-button type="primary" @click="genCode">出码</el-button>

          <!-- <input type="file" webkitdirectory @change="handleFolderSelect" ref="fileInput" style="display:none" /> -->
        </div>
      </div>

      <el-result
        style="
          width: 20rem;

          position: absolute;

          background: #fff;

          left: 45%;

          top: 40%;

          z-index: 9999;

          border: 1px solid #e2e2e2;
        "
        v-if="generateCoding"
        :icon="statuIcon"
        :title="statuTitle"
      >
        <template #extra v-if="statuIcon == 'success'">
          <el-button type="primary" @click="generateCoding = false"
            >好的</el-button
          >
        </template>
      </el-result>

      <el-container form-design-container style="height: calc(100vh - 120px)">
        <el-aside
          class="page-design-component"
          width="30px"
          style="
            background-color: #fff;
            padding: 0 5px;
            box-sizing: content-box;
            display: flex;

            flex-direction: column;

            justify-content: space-between;

            border-right: 1px solid #c9c8c8;
          "
        >
          <div>
            <div
              style="
                margin-top: 20px;

                height: 15px;

                width: 15px;

                border: 2px solid #333;

                font-size: 20px;

                text-align: center;

                line-height: 12px;

                cursor: pointer;

                border-radius: 5px;
              "
              @click="openMaterial"
            >
              +
            </div>

            <div
              style="font-weight: bold; margin-top: 10px; cursor: pointer"
              @click="openJs"
            >
              JS
            </div>

            <div
              style="font-weight: bold; margin-top: 10px; cursor: pointer"
              @click="openRef"
            >
              ref
            </div>

            <div
              style="
                margin-top: 10px;

                height: 15px;

                width: 15px;

                border: 2px solid #333;

                font-size: 10px;

                text-align: center;

                line-height: 12px;

                cursor: pointer;

                border-radius: 5px;
              "
              @click="openVar"
            >
              var
            </div>
          </div>

          <div style="margin-bottom:20px;cursor: pointer;">
            <svg
                @click="openRobot"
                xmlns="http://www.w3.org/2000/svg"
                style="width: 22px; height: 22px;"
                width="128" height="128"
                viewBox="0 0 24 24"
              >
                <path
                  fell="currentColor"
                  d="M13.5 2c0 .444-.193.843-.5 1.118V5h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h5V3.118A1.5 1.5 0 1 1 13.5 2M6 7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-4 3H0v6h2zm20 0h2v6h-2zM9 14.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                />
              </svg>
            <svg @click="openEditor" style="width: 22px; height: 22px;margin-top: 15px" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 14 14"><g fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x=".5" y=".5" rx="1"/><path d="M.5 4h13m-9 3L3 8.5L4.5 10M10 7l1.5 1.5L10 10m-3.5.5L8 6"/></g></svg>

          </div>
        </el-aside>

        <div
          style="
            width: 230px;

            background-color: #fff;

            border-right: 1px solid #e2e2e2;
          "
          v-if="drawer"
        >
          <el-tabs
            type="card"
            v-model="activeName"
            style="height: 100%; display: flex; flex-direction: column"
          >
            <el-tab-pane label="组件" name="0">
              <div style="margin-top: 15px">
                <span style="padding: 15px"> 基础</span>

                <ul class="base_component">
                  <li
                    :data-type="item.dataType"
                    class="component_item"
                    v-for="item in baseComponentList"
                  >
                    <iEpDocument
                      width="15px"
                      style="vertical-align: text-top; margin-right: 4px"
                    />{{ item.text }}
                  </li>
                </ul>

                <span style="padding: 15px"> 高级</span>

                <ul class="base_component">
                  <li
                    :data-type="item.dataType"
                    class="component_item"
                    v-for="item in seniorComponentList"
                  >
                    <iEpDocument
                      width="15px"
                      style="vertical-align: text-top; margin-right: 4px"
                    />{{ item.text }}
                  </li>
                </ul>
              </div>
            </el-tab-pane>

            <el-tab-pane label="区块" name="1">
              <div style="margin-top: 15px">
                <ul class="block_component" draggable></ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div
          style="
            width: 260px;

            position: absolute;

            border-right: 1px solid #e2e2e2;

            background-color: #fff;

            height: 100%;

            left: 2.3rem;

            z-index: 999;
          "
          v-if="showVar"
        >
          <div style="display: flex; padding: 20px; box-sizing: border-box">
            <el-radio-group v-model="addType" @change="setVar">
              <el-radio-button
                value="添加变量"
                label="添加变量"
              ></el-radio-button>

              <el-radio-button
                value="添加生命周期"
                label="添加生命周期"
              ></el-radio-button>
            </el-radio-group>
          </div>

          <el-divider style="margin-top: 0px"></el-divider>

          <div style="padding: 5px">
            <div v-for="item in addList">{{ item }}</div>
          </div>
        </div>

        <div
          style="
            width: 400px;

            position: absolute;

            border-right: 1px solid #e2e2e2;

            background-color: #fff;

            height: 100%;

            left: 18.6rem;

            z-index: 999;
          "
          v-if="setVarRef"
        >
          <div style="display: flex; justify-content: end; padding: 10px">
            <el-button type="primary" plain size="small" @click="saveEditor"
              >保存<span style="color: red" v-if="isChange">*</span></el-button
            >
          </div>

          <el-divider style="margin-top: 0px"></el-divider>

          <div style="padding: 5px">
            <el-form-item :label="labelTypeList[addType]">
              <el-input v-model="typeName" />
            </el-form-item>

            <span style="font-size: 14px">初始值</span>

            <div
              id="var_editor_container"
              style="width: 100%; height: 200px; border: 1px solid #c9c8c8"
            ></div>
          </div>
        </div>

        <div
          v-if="showJS"
          style="
            width: 600px;

            position: absolute;

            border-right: 1px solid #e2e2e2;

            background-color: #fff;

            height: 100%;

            left: 2.4rem;

            z-index: 999;
          "
        >
          <div
            style="
              display: flex;

              justify-content: space-between;

              align-items: center;

              padding: 2px 5px;
            "
          >
            <h4 style="padding: 0 20px">页面JS</h4>

            <div>
              <el-button type="primary" plain @click="saveEditor"
                >保存<span style="color: red" v-if="isChange"
                  >*</span
                ></el-button
              >

              <i-ep-delete></i-ep-delete>
            </div>
          </div>

          <div
            id="JS_editor_container"
            style="width: 560px; height: 90%; border: 1px solid #c9c8c8"
          ></div>
        </div>

        <div
          v-if="showRef"
          style="
            width: 600px;

            position: absolute;

            background-color: #fff;

            border-right: 1px solid #e2e2e2;

            height: 100%;

            left: 2.4rem;

            z-index: 999;
          "
        >
          <div
            style="
              display: flex;

              justify-content: space-between;

              align-items: center;

              padding: 2px 5px;
            "
          >
            <h4 style="padding: 0 20px">页面Ref</h4>

            <div>
              <el-button type="primary" plain @click="saveEditor"
                >保存<span style="color: red" v-if="isChange"
                  >*</span
                ></el-button
              >
            </div>
          </div>

          <div
            id="Ref_editor_container"
            style="width: 560px; height: 90%; border: 1px solid #c9c8c8"
          ></div>
        </div>

        <div
          v-if="showSchema"
          style="
            width: 600px;

            position: absolute;

            background-color: #fff;

            border-right: 1px solid #e2e2e2;

            height: 100%;

            left: 2.4rem;

            z-index: 999;
          "
        >
          <div
            style="
              display: flex;

              justify-content: space-between;

              align-items: center;

              padding: 2px 5px;
            "
          >
            <h4 style="padding: 0 20px">页面schema</h4>

            <div>
              <el-button type="primary" plain @click="saveEditor"
                >保存<span style="color: red" v-if="isChange"
                  >*</span
                ></el-button
              >

              <el-button type="primary" text @click="showSchema = false"
                >关闭</el-button
              >
            </div>
          </div>

          <div
            id="editor_container"
            style="width: 560px; height: 90%; border: 1px solid #c9c8c8"
          ></div>
        </div>

        <el-container>
          <el-main style="padding: 0; background-color: #eef0f5">
            <div
              :class="['page-design-content']"
              style="
                width: calc(100vw - 620px);

                height: calc(100vh - 160px);

                margin: 20px auto;

                background-color: #e5e5e5;

                box-sizing: border-box;
              "
            >
              <!-- 表单为空时的占位：从左侧拖拽来添加表单 -->

              <div
                :class="[
                  'page-design-placeholder',

                  {
                    hover: !currAEl.clickId,

                    enter_page: currAEl.overId == pageConfig.id,
                  },
                ]"
                :id="currAEl.clickId == pageConfig.id ? 'active' : ''"
                v-if="!pageConfig.children?.length"
                style="
                  height: 100%;

                  text-align: center;

                  display: flex;

                  align-items: center;

                  justify-content: center;

                  flex-direction: column;

                  box-sizing: border-box;
                "
              >
                <span style="font-size: 14px; color: #999"
                  >从左侧拖拽来添加表单</span
                >
              </div>

              <div
                v-else
                :style="{
                  width: '100%',

                  height: '100%',

                  boxSizing: 'border-box',

                  ...pageConfig.props.style,
                }"
                :class="[
                  'page',

                  {
                    hover_child: currAEl.hoverId == pageConfig.id,

                    enter_page: currAEl.hoverId == pageConfig.id,
                  },
                ]"
                :data-tag="pageConfig.componentName"
                :data-id="pageConfig.id"
                @click="activeCurrent"
                :id="currAEl.clickId == pageConfig.id ? 'active' : ''"
                @mouseover="currAEl.hoverId = pageConfig.id"
                @mouseleave="currAEl.hoverId = null"

              >
                <BasicPage
                  v-for="(box, ind) in pageConfig.children"
                  :key="ind"
                  :schema="box"
                  v-model:currAEl="currAEl"
                  :componentMap="componentMap"
                  @delete="del"
                  @copy="copy"
                  @current="getCurrent"
                  @start="start"
                  @enter="enter"
                  @leave="leave"
                  @over="over"
                  @end="end"
                />
              </div>
            </div>
          </el-main>

          <el-aside
            class="page-design-config"
            width="280px"
            style="background-color: #fff"
          >
            <config-plane
              :is-show-config="isShowConfig"
              v-model:current="currentConf"
              v-model:pageConfig="pageConfig"
              @save="saveEditor"
              @openJs="openJs"
              @openRef="openRef"
            />
          </el-aside>
        </el-container>
      </el-container>
    </el-container>

    <RobotMainVue
      v-if="openAiRef"
      :schema="currentConf"
      @update:schema="updateConf"
      :foundationModel="foundationModel"
      style="z-index: 999; position: absolute; bottom: 50px; right: 320px"
    />
  </div>
</template>

<style lang="less" scoped>
:deep(.hover-effect) {
  &:hover {
    background-color: #f1f1f1 !important;
  }
}

.common-layout {
  position: relative;
}

.enter_page {
  border: 1px dashed #32adf7;
}

.base_component,
.block_component {
  list-style: none;

  display: flex;

  flex-wrap: wrap;

  padding: 5px;

  margin: 0;

  li {
    width: 80px;

    line-height: 25px;

    text-align: left;

    height: 25px;

    padding: 4px 5px;

    margin: 10px 5px;

    font-size: 13px;

    cursor: move;

    border: 1px solid #dfdfdf;

    border-radius: 5px;

    &:hover {
      border: 1px dashed @success-color !important;
    }
  }
}

.hover_child {
  position: relative;

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
    }
  }
}

#active {
  position: relative;

  border: 2px solid #32adf7 !important;

  // &::before {

  // display: block;

  // content: attr(data-tag);

  // position: absolute;

  // left: -2px;

  // bottom: -20px;

  // width: fit-content;

  // padding: 0 5px;

  // height: 20px;

  // background-color: #1cd88a;

  // color: #fff;

  // line-height: 20px;

  // text-align: center;

  // }
}

:deep(.dragging) {
  background-color: #fff;

  border: 1px dashed @success-color;

  position: relative;

  &:after {
    content: "";

    width: 100%;

    height: 100%;

    background-color: #fff;

    position: absolute;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    z-index: 999;
  }
}

.hover {
  &:hover {
    border: 1px dashed #32adf7;
  }
}
</style>
