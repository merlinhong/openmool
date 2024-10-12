/**
 * 组件映射关系，默认使用 El Vue 组件，支持传入其它组件库的映射关系
 * @summary 建议：添加时，按照组件名称的字母序排列
 */
const DEFAULT_COMPONENTS_MAP = [
  {
    componentName: "ElAlert",
    exportName: "ElElAlert",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElBreadcrumb",
    exportName: "ElBreadcrumb",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElBreadcrumbItem",
    exportName: "ElElBreadcrumbItem",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElButton",
    exportName: "ElElButton",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElCheckbox",
    exportName: "ElCheckbox",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElCheckboxButton",
    exportName: "ElCheckboxButton",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElCheckboxGroup",
    exportName: "ElCheckboxGroup",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElCol",
    exportName: "ElCol",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElCollapse",
    exportName: "ElCollapse",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElCollapseItem",
    exportName: "ElCollapseItem",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElDatePicker",
    exportName: "ElDatePicker",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElDialog",
    exportName: "ElDialog",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElFloatbar",
    exportName: "ElFloatbar",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElForm",
    exportName: "ElForm",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElFormItem",
    exportName: "ElFormItem",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElTable",
    exportName: "ElTable",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElInput",
    exportName: "ElInput",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElModal",
    exportName: "ElModal",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElNumeric",
    exportName: "ElNumeric",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElPager",
    exportName: "ElPager",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElPopeditor",
    exportName: "ElPopeditor",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElPopover",
    exportName: "ElPopover",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElRadio",
    exportName: "ElRadio",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElRow",
    exportName: "ElRow",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElSearch",
    exportName: "ElSearch",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElSelect",
    exportName: "ElSelect",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElSwitch",
    exportName: "ElSwitch",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElTabs",
    exportName: "ElTabs",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElTabItem",
    exportName: "ElTabItem",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElTimeLine",
    exportName: "ElTimeLine",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElTooltip",
    exportName: "ElTooltip",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
  {
    componentName: "ElTree",
    exportName: "ElTree",
    package: "element-plus",
    version: "^3.10.0",
    destructuring: true,
  },
];
// 创建 Element Plus 图标映射函数
function createElementPlusIconMap(iconNames) {
  return iconNames.map(name => ({
    componentName: name,
    exportName: name,
    package: '@element-plus/icons-vue',
    version: '^2.1.0',
    destructuring: true,
  }));
}

// Element Plus 图标名称列表（这里只列出一部分常用图标，您可以根据需要扩展）
const ELEMENT_PLUS_ICON_NAMES = [
  'Add',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'Calendar',
  'Check',
  'Close',
  'Delete',
  'Edit',
  'Loading',
  'Search',
  'Setting',
  'User',
  // ... 添加更多图标名称
];

// 生成 Element Plus 图标映射
const ELEMENT_PLUS_ICON_MAP = createElementPlusIconMap(ELEMENT_PLUS_ICON_NAMES);

// 在 exports 对象中添加新的导出
exports.ELEMENT_PLUS_ICON_MAP = ELEMENT_PLUS_ICON_MAP;
// 内置组件映射关系
exports.BUILTIN_COMPONENTS_MAP = [
  {
    componentName: "CanvasRow",
    exportName: "ElCanvasRow",
    package: "@openEl/El-engine-builtin-component",
    version: "^1.0.1",
    destructuring: true,
  },
  {
    componentName: "CanvasCol",
    exportName: "ElCanvasCol",
    package: "@openEl/El-engine-builtin-component",
    version: "^1.0.1",
    destructuring: true,
  },
  {
    componentName: "CanvasRowColContainer",
    exportName: "ElCanvasRowColContainer",
    package: "@openEl/El-engine-builtin-component",
    version: "^1.0.1",
    destructuring: true,
  },
];

/**
 * 内部保留组件名称，出码时可能需要特殊处理
 */
const BUILTIN_COMPONENT_NAME = {
  PAGE: "Page",
  BLOCK: "Block",
  TEMPLATE: "Template",
  SLOT: "Slot",
  COLLECTION: "Collection",
  TEXT: "Text",
  ICON: "Icon",
};

exports.BUILTIN_COMPONENT_NAME_MAP = {
  Text: "span",
  Collection: "div",
  Block: "div",
  Img: "img",
};

exports.INSERT_POSITION = {
  AFTER_IMPORT: "AFTER_IMPORT",
  BEFORE_PROPS: "BEFORE_PROPS",
  AFTER_PROPS: "AFTER_PROPS",
  BEFORE_EMIT: "BEFORE_EMIT",
  AFTER_EMIT: "AFTER_EMIT",
  BEFORE_STATE: "BEFORE_STATE",
  AFTER_STATE: "AFTER_STATE",
  BEFORE_METHODS: "BEFORE_METHODS",
  AFTER_METHODS: "AFTER_METHODS",
};

/**
 * 图标组件名，统一前缀为 ElIcon，与从组件库引入的方法名 iconXxx 区分开
 */
const El_ICON = "ElIcon";

/**
 * 占位标识，用于解开字符串的双引号，输出原始表达式
 */
exports.UNWRAP_QUOTES = {
  start: "#QUOTES_START#",
  end: "#QUOTES_END#",
};

exports.SPECIAL_UTILS_TYPE = ["utils", "bridge"];

/**
 * 协议中的类型
 */
const [JS_EXPRESSION, JS_FUNCTION, JS_I18N, JS_RESOURCE, JS_SLOT] = [
  "JSExpression",
  "JSFunction",
  "i18n",
  "JSResource",
  "JSSlot",
];
exports.JS_EXPRESSION = JS_EXPRESSION;
exports.JS_FUNCTION = JS_FUNCTION;
exports.JS_I18N = JS_I18N;
exports.JS_RESOURCE = JS_RESOURCE;
exports.JS_SLOT = JS_SLOT;

exports.DEFAULT_COMPONENTS_MAP = DEFAULT_COMPONENTS_MAP;
exports.BUILTIN_COMPONENT_NAME = BUILTIN_COMPONENT_NAME;
exports.El_ICON = El_ICON;
