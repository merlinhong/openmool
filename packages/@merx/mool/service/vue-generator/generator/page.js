const { capitalize, hyphenate } = require("@vue/shared");

const {
  getTypeOfSchema,

  avoidDuplicateString,

  toPascalCase,

  isOn,

  toEventKey,

  addAccessorRecord,
} = require("../utils/index.js");

// const {

// validateByParse,

// validateByCompile,

// } = require("../utils/vue-sfc-validator.js");
const fs = require("fs-extra");
const path = require("path");
const { traverseState, unwrapExpression } = require("../parser/state.js");

const { preProcess } = require("../pre-processor/index.js");

const {
  DEFAULT_COMPONENTS_MAP,

  BUILTIN_COMPONENT_NAME,

  JS_FUNCTION,

  JS_RESOURCE,

  JS_SLOT,

  BUILTIN_COMPONENTS_MAP,
} = require("../constant/index.js");

function recurseChildren(children, state, description, result) {
  if (Array.isArray(children)) {
    const subTemplate = children

      .map((child) => generateTemplate(child, state, description))

      .join("");

    result.push(subTemplate);
  } else if (children?.type === "JSExpression") {
    result.push(`{{ ${children.value.replace(/this\.(props\.)?/g, "")} }}`);

    Object.keys(description.jsResource).forEach((key) => {
      description.jsResource[key] = description.jsResource[key] || children.value.includes(`.${key}.`);
    });
  } else if (children?.type === "i18n") {
    result.push(`{{ t('${children.key}') }}`);
  } else {
    result.push(children || "");
  }

  return result;
}

const isEmptySlot = (componentName, children) =>
  componentName === BUILTIN_COMPONENT_NAME.TEMPLATE && !(children?.length || children?.type);

function handleSlotBinding(item) {
  const { name, params } = item;

  let slot = `#${name || item}`;

  if (Array.isArray(params)) {
    slot = `#${name}="{ ${params.join(",")} }"`;
  } else if (typeof params === "string") {
    slot = `#${name}="${params}"`;
  }

  return slot;
}

const handleEventBinding = (key, item) => {
  const eventKey = toEventKey(key);

  let eventBinding = "";

  // vue 事件绑定，仅支持：内联事件处理器 or 方法事件处理器（绑定方法名或对某个方法的调用）

  if (item?.type === "JSExpression") {
    const eventHandler = item.value.replace(/this\.(props\.)?/g, "");

    // Vue Template 中，为事件处理函数传递额外的参数时，需要使用内联箭头函数

    if (item.params?.length) {
      const extendParams = item.params.join(",");

      eventBinding = `@${eventKey}="(...eventArgs) => ${eventHandler}(eventArgs, ${extendParams})"`;
    } else {
      eventBinding = `@${eventKey}="${eventHandler}"`;
    }
  }

  return eventBinding;
};

const handleLiteralBinding = ({
  key,

  item,

  attrsArr,

  description,

  state,

  component,
}) => {
  // 字面量

  // string 直接静态绑定

  if (typeof item === "string") return attrsArr.push(`${key}="${item.replace(/"/g, "&quot;")}"`);

  // // TODO: 拿到这里的场景 case？

  if (item?.componentName === BUILTIN_COMPONENT_NAME.ICON) {

  const iconName = handleIconInProps(description, item)

  return attrsArr.push(`:${key}="${iconName}"`)

  }

  // 复杂类型（not null），解析协议（如：i18n）后，使用 v-bind 绑定，注意：双引号与单引号的处理

  if (typeof item === "object") {
    const exteralArr = ['el-menu','el-select','el-table']
    traverseState(item, description);

    const canotBind =
      description.internalTypes.has(JS_FUNCTION) ||
      description.internalTypes.has(JS_RESOURCE) ||
      description.internalTypes.has(JS_SLOT);

    // 不能直接绑定的，新建临时变量，以 state 变量的形式绑定

    if (canotBind) {
      description.internalTypes = new Set();

      const valueKey = avoidDuplicateString(Object.keys(state), key);
      state[valueKey] = item;

      return component != "el-table" && component != "el-select" && attrsArr.push(`:${key}="state.${valueKey}"`);
    }

    const parsedValue = unwrapExpression(JSON.stringify(item)).replace(
      /props\./g,

      "",
    );

    if (key == "option" || key == "data") {
      if (component == "el-menu") {
        key = "menuOption";
      }
      const valueKey = avoidDuplicateString(Object.keys(state), key);

      state[key == "data" ? "table" + valueKey : valueKey] = item;

      return attrsArr.push(`:${key}="state.${key == "data" ? "table" + valueKey : valueKey}"`);
    }

    return !exteralArr.includes(component)&&attrsArr.push(`:${key}="${parsedValue.replace(/"/g, "&quot;")}"`);
  }

  // number/boolean/expression 使用 v-bind 绑定

  return attrsArr.push(`:${key}="${item}"`);
};

function handleBinding(props, attrsArr, description, state, component) {
  Object.entries(props).forEach(([key, item]) => {
    // 处理 className

    if (key === "className") {
      key = "class";
    }

    // 处理 slot

    if (key === "slot") {
      let slot = handleSlotBinding(item);

      return attrsArr.push(slot);
    }

    const propType = item?.type || "literal";

    // 事件名，协议约定以 on 开头的 camelCase 形式，template 中使用 kebab-case 形式

    if (isOn(key)) {
      const eventBinding = handleEventBinding(key, item);

      return attrsArr.push(eventBinding);
    }

    if (propType === "literal") {
      return handleLiteralBinding({
        key,

        item,

        attrsArr,

        description,

        state,

        component,
      });
    }

    if (propType === "JSExpression") {
      // 支持带参数的 v-model

      if (item.model) {
        const modelArgs = item.model?.prop ? `:${item.model.prop}` : "";

        return attrsArr.push(`v-model${modelArgs}="${item.value.replace(/this\.(props\.)?/g, "")}"`);
      }

      // 弥补在recurseChildren方法中，当children为undefined，但是该元素的props存在变量绑定的情况，此变量绑定的为

      // 当前JSResources在props的使用场景为变量绑定，使用范式一般为：this.xxx

      const pickResourceKeys = item.value?.match(/(?<=this\.)\w+/g) || [];

      const itemObject = Object.fromEntries(pickResourceKeys.map((key) => [key, true]));

      Object.keys(description.jsResource).forEach((jsResourceKey) => {
        description.jsResource[jsResourceKey] = description.jsResource[jsResourceKey] || itemObject[jsResourceKey];
      });

      // expression 使用 v-bind 绑定

      return attrsArr.push(`:${key}="${item.value.replace(/this\.(props\.)?/g, "")}"`);
    }

    if (propType === "i18n") {
      const tArguments = [`'${item.key}'`];

      const i18nParams = JSON.stringify(item.params)?.replace(/"/g, "'");

      i18nParams && tArguments.push(i18nParams);

      return attrsArr.push(`:${key}="t(${tArguments.join(",")})"`);
    }

    return attrsArr;
  });
}

function generateTemplate(schema, state, description, isRootNode = false) {
  const result = [];

  const {
    componentName,

    fileName,

    loop,

    label,

    loopArgs = ["item"],

    condition,

    props = {},

    children,

    pager = false,
  } = schema;

  // // 不生成空 div 作为根节点，兼容支持有页面属性的 div 根节点

  // if (isEmptyRoot(isRootNode, props)) {

  // return recurseChildren(children, description, result)

  // }

  // 不生成空插槽，否则会影响插槽的默认内容

  if (isEmptySlot(componentName, children)) {
    return "";
  }

  let component = "";

  if (isRootNode) {
    component = "div";
  } else if (componentName === BUILTIN_COMPONENT_NAME.BLOCK && fileName) {
    component = hyphenate(fileName);

    description.blockSet.add(fileName);
  } else {
    component = hyphenate(componentName || "div");

    description.componentSet.add(componentName);
  }
  if (schema.option) {
    result.push(
      `\n<${component} ${Object.entries(schema.option)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")}>`,
    );
    result.push(`</${component}>`);
  } else {
    result.push(`\n<${component} `);

    const attrsArr = [];

    // 循环渲染 v-for, 循环数据支持：变量表达式、数组/对象字面量

    if (loop) {
      const loopData = loop.type
        ? loop.value.replace(/this\.(props\.)?/g, "")
        : JSON.stringify(loop).replace(/"/g, "&quot;");

      attrsArr.push(`v-for="(${loopArgs.join(",")}) in ${loopData}"`);
    }

    // 处理 condition, 条件渲染

    if (typeof condition === "object" || typeof condition === "boolean") {
      const conditionValue = condition?.type ? condition.value.replace(/this\.(props\.)?/g, "") : condition;

      const directive = condition?.kind || "if";

      const conditionStr = directive === "else" ? "v-else" : `v-${directive}="${conditionValue}"`;

      attrsArr.push(conditionStr);
    }

    handleBinding(props, attrsArr, description, state, component);

    result.push(attrsArr.join(" "));

    // 处理 Void elements: 使用自闭合标签，如：<img />

    const VOID_ELEMENTS = ["img", "input", "br", "hr", "link"];

    if (VOID_ELEMENTS.includes(component)) {
      result.push(" />");
    } else {
      result.push(">");
      let compInd = 0;
      switch (component) {
        case "el-table":
          Object.keys(state).forEach((key) => {
            if (/columns/.test(key)) {
              compInd++;
            }
          });

          result.push(
            `<el-table-column v-for="(item,index) in state.columns${compInd - 1 || ""}" :label="item.title" :prop="item.dataIndex" v-bind="item" :key="index">

            <template #default="scope" v-if="item.render">

            <component :is="item.render(scope, scope.row[item.dataIndex])"></component>

            </template>

            </el-table-column>

          `,
          );

          break;

        case "el-select":
          Object.keys(state).forEach((key) => {
            if (/option/.test(key)) {
              compInd++;
            }
          });

          result.push(
            `<el-option v-for="(item,index) in state.option${compInd - 1 || ""}" :label="item.label" :value="item.value" :key="index"></el-option>`,
          );

          break;
        case "el-menu":
          Object.keys(state).forEach((key) => {
            if (/menuOption/.test(key)) {
              compInd++;
            }
          });
          result.push(
            `
            <template v-for="item in state.menuOption${compInd - 1 || ""}" :key="item.id">
              <el-sub-menu
              :index="item.index"
               v-if="item.subItems"
              >
                <template #title>{{ item.name }}</template>
                <el-menu-item
                  v-for="subItem in item.subItems"
                  :key="subItem.id"
                  :index="subItem.index"
                >
                  {{ subItem.name }}
                </el-menu-item>
              </el-sub-menu>
            </template>

            <template v-for="item in state.menuOption${compInd - 1 || ""}" :key="item.id">
              <el-menu-item
                :index="item.index"
                v-if="!item.subItems"
              >
                {{ item.name }}
              </el-menu-item>
            </template>
            `,
          );
          break;

        default:
          break;
      }
      result.push(label);
      recurseChildren(children, state, description, result);

      result.push(`</${component}>`);

      if (pager) {
        result.push(
          `

          <div class="demo-pagination-block">

          <el-pagination

          @current-change="

          (val) => {
          
          onSearch({
          
          currentPage: val,
          
          });
          
          }

          "

          @size-change="

          (val) => {
          
          onSearch({
          
          currentPage: 1,
          
          pageSize: val,
          
          });

          }

          "

          v-bind="pagerConfig[${compInd - 1}]"

          v-model:page-size="pagerConfig[${compInd - 1}].pageSize"

          v-model:current-page="pagerConfig[${compInd - 1}].currentPage"

          />

          </div>

        `,
        );
      }
    }
  }

  return result.join("");
}

const generateImports = (description, moduleName, type, componentsMap, importType) => {
  const { blockSet, componentSet } = description;

  const imports = [];
  const importsFromVue = [
    'import * as vue from "vue"',
    `import { defineProps, defineEmits,${importType['vueType'].join(",").replace(/^,|,$/g, "")} } from "vue"`,
    `import {request} from "./utils/request"`,
  ];
  importType['customType'].length &&
    importsFromVue.push(`import {type ${importType['customType'].join(",").replace(/^,|,$/g, "")}} from "./type.ts"`);
  imports.push(importsFromVue.join("\n"));

  // import components, support alias import, import from multi packages

  const componentsInSFC = [...componentSet];

  const componentDeps = componentsMap.filter((item) => componentsInSFC.includes(item.componentName));

  const componentPacks = {};

  componentDeps.forEach((item) => {
    const { package: pkg } = item;

    if (!componentPacks[pkg]) {
      componentPacks[pkg] = [];
    }

    componentPacks[pkg].push(item);
  });

  Object.entries(componentPacks).forEach(([pkgName, deps]) => {
    console.log(deps);
    const items = deps.map((dep) => {
      const { componentName, exportName } = dep;

      // if (componentName.startsWith(TINY_ICON)) {

      // addIconRecord(description, componentName)

      // return exportName

      // }

      return exportName && exportName !== componentName ? `${exportName} as ${componentName}` : `${componentName}`;
    });

    imports.push(`import { ${items.join(",")} } from '${pkgName}'`);
  });

  // import blocks, support PascalCase or kebab-case of blockName

  const importBlocks = [...blockSet];

  const blocksName = importBlocks.map((item) => toPascalCase(item));

  const blocks = [];

  const blocksPathMap = componentsMap

    .filter((item) => !item.package && typeof item.main === "string")

    .reduce(
      (acc, { componentName: block, main: path }) => ({
        ...acc,

        [block]: path,
      }),

      {},
    );

  const componentNames = componentsMap.map(({ componentName }) => componentName);

  const needImportBlocks = blocksName.filter((name) => componentNames.includes(name));

  needImportBlocks.forEach((block) => {
    const { [moduleName]: fromPath, [block]: toPath } = blocksPathMap;

    if (typeof toPath === "string") {
      let depPath = toPath || ".";

      if (typeof fromPath !== "string") {
        depPath = toPath || ".";
      } else if (toPath === fromPath) {
        depPath = ".";
      } else {
        const path = require("path");

        const relativePath = path

          ?.relative(fromPath, toPath)

          .replace(/\\/g, "/");

        depPath = relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
      }

      blocks.push(`import ${block} from '${depPath}/${block}.vue'`);
    } else {
      const blockDefaultPath =
        type === "Block"
          ? `import ${block} from './${block}.vue'`
          : `import ${block} from '../components/${block}.vue'`;

      blocks.push(blockDefaultPath);
    }
  });

  imports.push(...blocks);

  return { imports };
};

const generateVueCode = ({ schema, name, type, componentsMap }) => {
  const {
    css = "",

    schema: { properties = [], events = {} } = {},

    state = {},

    ref = {},

    computed = {},

    lifeCycles = {},

    methods = {},

    popup = []
  } = schema;
  if (!ref.pagerConfig) {
    const allPagerConfigs = [];
    const findPagerConfig = (list) => {
      list.children?.forEach((child, index, li) => {
        if (child.pagerConfig) {
          allPagerConfigs[child.pagerConfig.order] = child.pagerConfig.value;
        } else {
          findPagerConfig(child);
        }
      });
    };
    findPagerConfig(schema);
    allPagerConfigs.length &&
      (ref.pagerConfig = {
        type: "Pagination",
        value: allPagerConfigs,
      });
  }
  const description = {
    blockSet: new Set(),

    componentSet: new Set(),

    iconComponents: { componentNames: [], exportNames: [] },

    stateAccessor: [],

    internalTypes: new Set(),

    hasJSX: true,

    jsResource: { utils: false, bridge: false },
  };

  const template = generateTemplate(schema, state, description, true);
  const dialogTemplate = popup.map(pop=>generateTemplate(pop, state, description, false));
  const propsArr = [];

  const propsAccessor = [];

  properties.forEach(({ content = [] }) => {
    content.forEach(({ property, type, defaultValue, accessor }) => {
      let propType = capitalize(type);

      let propValue = defaultValue;

      if (propType === "String") {
        propValue = JSON.stringify(defaultValue);
      } else if (["Array", "Object"].includes(propType)) {
        propValue = `() => (${JSON.stringify(defaultValue)})`;
      } else if (propType === "Function") {
        propValue = defaultValue.value;
      }

      propsArr.push(`${property}: { type: ${propType}, default: ${propValue} }`);

      addAccessorRecord(accessor, propsAccessor);
    });
  });

  const emitsArr = Object.keys(events).map(toEventKey);

  // 转换 state 中的特殊类型
  const importType = {
    'customType':[],
    'vueType':[],
    'otherType':[]
  };
  traverseState(state, description);
  if (state.columns) {
    importType['customType'].push("SearchTableColumn");
  }
  const reactiveStatement = `const state = vue.reactive<{ ${importType['customType'].includes("SearchTableColumn") ? "columns?: SearchTableColumn[];" : ""}[key: string]: any }>(${unwrapExpression(JSON.stringify(state, null, 2))})`;

  const allAccessor = [...propsAccessor, ...description.stateAccessor];

  const accessorStatement = allAccessor

    .map((func) => `vue.watchEffect(${func})`)

    .join("\n");

  const methodsName = Object.keys(methods);

  const methodsArr = Object.entries(methods).map(([key, item]) => `const ${key} = ${item.value}`);

  const _ref = Object.entries(ref).map(([key, item]) => {
    // ts类型处理收集
    if (key == "searchParams" || key == "pagerConfig") {
      importType['customType'].push(item.type);
      return `const ${key} = vue.ref<${item.type}[]>(${unwrapExpression(JSON.stringify(item.value, null, 2))})`;
    }
    if (typeof item === "object" && !Array.isArray(item) && !item.type) {
      return `
        interface ${capitalize(key)}{
          ${Object.entries(item)
            .map(([_key, value]) => `${_key}: string`)
            .join(";\n")}
        }
        const ${key} = vue.ref<${capitalize(key)}>(${unwrapExpression(JSON.stringify(item, null, 2))})
        `;
    }
    if (typeof item === "object" && item.type) {
      // if (item.type.indexOf("|") != -1) {
      //   importType.push(item.type.split("|")[0]);
      // } else {
      //   item.type.indexOf("typeof") == -1 && importType.push(item.type);
        
      // }
      if (item.type == "ComputedRef") {
        importType['vueType'].push(item.type);
        return `const ${key} = vue.computed<${item.type}>({
          get(){
            return ${item.value}
          },
          set(){
            
          }
        })`;
      } else {
        return `const ${key} = vue.ref<${item.type}>(${item.value})`;
      }
    }
    if(typeof item === "string"){
      return `const ${key} = vue.ref<string>('${item}')`
    }
    if (typeof item === "number"|| typeof item === "boolean") {
      return `const ${key} = vue.ref<${typeof item}>(${item})`;
    }
  });

  const lifecycles = Object.entries(lifeCycles).map(
    ([key, item]) => `vue.${key}(()=>{
    ${item.value}
  })`,
  );

  const scriptLang = description.hasJSX ? 'lang="tsx"' : "";

  const { imports } = generateImports(description, name, type, componentsMap, importType);

  const { componentNames, exportNames } = description.iconComponents;

  const iconStatement = componentNames.length
    ? `const [${componentNames.join(",")}] = [${exportNames.map((name) => `${name}()`).join(",")}]`
    : "";

  const contextArr = ["stores", "state", ...methodsName];

  const result = `

<template>

${template}
${dialogTemplate}
</template>

  


<script setup ${scriptLang}>

${imports.join("\n")}

  
const props = defineProps({${propsArr.join(",\n")}})

const emit = defineEmits(${JSON.stringify(emitsArr)})

  
${iconStatement}

  
${reactiveStatement}

  
${_ref.join("\n\n")}


${methodsArr.join("\n\n")}


${accessorStatement}

  
${lifecycles.join("\n\n")}

</script>

  


<style scoped>

${css}

</style>

`;

  return result;
};

const getFilePath = (type = "page", name = "", componentsMap) => {
  const blocksPathMap = componentsMap

    .filter((item) => !item.package && typeof item.main === "string")

    .reduce(
      (acc, { componentName: block, main: path }) => ({
        ...acc,

        [block]: path,
      }),

      {},
    );

  const path = blocksPathMap[name];

  const defaultPathMap = { Block: "components", Page: "views" };

  return path ? path : defaultPathMap[type] || name;
};

const generatePageCode = ({ pageInfo, componentsMap, isEntry = true }) => {
  const { schema: originSchema, name } = pageInfo;
  // 深拷贝，避免副作用改变传入的 schema 值

  const schema = JSON.parse(JSON.stringify(originSchema));

  preProcess(schema);

  const type = getTypeOfSchema(schema);

  const vueCode = generateVueCode({ schema, name, type, componentsMap });

  const tsCode = fs.readFileSync(path.resolve(__dirname, "../utils/type.js"), "utf-8").toString();

  const requestCode = fs.readFileSync(path.resolve(__dirname, "../utils/request.js"), "utf-8").toString();

  const panels = [
    {
      panelName: `${name}.vue`,

      panelValue: vueCode,

      panelTsCode: tsCode,

      panelType: "vue",

      panelRqCode: requestCode,

      type,

      index: isEntry,

      filePath: getFilePath(type, name, componentsMap),
    },
  ];

  const result = panels.map((panel) => {
    const { panelName, panelValue, panelType } = panel;

    let errors = [];

    // if (panelType === "vue") {

    // errors = validateByParse(panelValue);

    // if (!errors.length) {

    // errors = validateByCompile(panelName, panelValue);

    // }

    // }

    return { ...panel, errors };
  });

  return result;
};

const generateBlocksCode = ({ blocksData, componentsMap }) => {
  const result = {};

  blocksData.forEach((block) => {
    if (!block.label || !block.content) return;

    const name = toPascalCase(block.label);

    const pageInfo = { name, schema: block.content };

    const pageCodeResult = generatePageCode({
      pageInfo,

      componentsMap,

      isEntry: false,
    });

    result[block.label] = pageCodeResult;
  });

  return result;
};

const generateCode = ({ pageInfo, componentsMap = [], blocksData = [] }) => {
  console.log("page:", pageInfo);
  // 过滤外部传入的无效 componentMap，比如：可能传入 HTML 原生标签 package: ''

  // 注意区分区块 package: undefined, main: string（区块路径 main，空字符串表示当前目录，等价于 './'）

  const validComponents = componentsMap.filter(
    ({ componentName, package: pkg, main }) => componentName && (pkg || typeof main === "string"),
  );

  const allComponents = [...validComponents, ...DEFAULT_COMPONENTS_MAP, ...BUILTIN_COMPONENTS_MAP];

  // 对象数组，去重

  const allComponentsMap = new Map();

  allComponents.forEach(
    (item) => !allComponentsMap.has(item.componentName) && allComponentsMap.set(item.componentName, item),
  );

  const componentDepsPath = [...allComponentsMap.values()];

  const blocksCode = generateBlocksCode({
    blocksData,

    componentsMap: componentDepsPath,
  });

  const pagesCode = generatePageCode({
    pageInfo,

    componentsMap: componentDepsPath,
  });

  return [...pagesCode, ...Object.values(blocksCode).flat()];
};

module.exports = { generateCode, generateBlocksCode, generatePageCode };
