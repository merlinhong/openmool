export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type ContentType =
  | "text/html"
  | "text/plain"
  | "multipart/form-data"
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "application/octet-stream";

export interface AxiosProgressEvent {
  loaded: number;

  total?: number;

  progress?: number;

  bytes: number;

  rate?: number;

  estimated?: number;

  upload?: boolean;

  download?: boolean;

  event?: any;

  lengthComputable: boolean;
}

export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream"
  | "formdata";

export interface AxiosRequestConfig<D = any> {
  url?: string;

  method?: Method | string;

  baseURL?: string;

  headers?: Record<
    string,
    any & {
      "Content-Type": ContentType;
    }
  >;

  data?: D;

  timeout?: number;

  timeoutErrorMessage?: string;

  withCredentials?: boolean;

  responseType?: ResponseType;

  xsrfCookieName?: string;

  xsrfHeaderName?: string;

  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;

  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;

  maxContentLength?: number;

  validateStatus?: ((status: number) => boolean) | null;

  env?: {
    FormData?: new (...args: any[]) => object;
  };

  fetchOptions?: Record<string, any>;
}

export type PaginationProps = {
  currentPage: number;

  pageSize: number;

  pageSizes: number[];

  small: boolean;

  background: boolean;

  disabled: boolean;

  layout: "->,total, sizes, prev, pager, next, jumper";

  total: number;
};

export type RuleType =
  | "string"
  | "number"
  | "boolean"
  | "method"
  | "regexp"
  | "integer"
  | "float"
  | "array"
  | "object"
  | "enum"
  | "date"
  | "url"
  | "hex"
  | "email"
  | "pattern"
  | "any";

export interface RuleItem {
  type?: RuleType;

  required?: boolean;

  pattern?: RegExp | string;

  min?: number;

  max?: number;

  len?: number;

  message?: string | ((a?: string) => string);
}

export interface FormItemRule extends RuleItem {
  trigger?: string;
}

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

interface DisplayRule {
  /**当前表单项显隐关联的字段值 */

  /**
  
  * @property {Object} [relate] - 关联规则，如果存在，表单项将根据关联的表单值来决定是否显示或隐藏
  
  * @property {string} [relate.key] - 关联的表单项的 key
  
  * @property {any} [relate.value] - 关联的值，如果关联表单项值与这个值相等，则显示当前表单项
  
  * @property {boolean} [rule] - 单独的显隐规则，true 表示显示，false 表示隐藏，与 v-if 类似
  
  * @property {boolean} [isEmpty] - 切换是否置空上一次的表单值
  
  */

  relate?:
    | {
        key: string;

        /**若该表单值为给定值，当前表单即显示，否则隐藏 */

        value: any;
      }[]
    | {
        key: string;

        /**若该表单值为给定值，当前表单即显示，否则隐藏 */

        value: any;
      };

  /**当前表单项的显隐规则，true显示false隐藏，与v-if同理 */

  rule?: boolean;

  /**切换是否置空上一次的表单值 */

  isEmpty?: boolean; //
}

// 当前页面的schema描述，包括页面的状态数据，全局css样式，组件的声明周期，组件的方法，组件的属性，组件的子组件，组件的id等

export type Page = {
  state: Record<string, any>;

  ref: Record<string, any>;

  // 全局css样式，放在vue的style标签中的样式

  css: string;

  // vue的生命周期函数管理

  lifeCycles: Record<
    // 例如vue的onMounted周期函数

    string,
    {
      // 默认为JSFunction

      type: string;

      // 函数中调用的代码，可以是调用一个请求数据的函数，例如onSearch();

      value: string;
    }
  >;

  // 页面上的js方法，放在vue的script标签中的方法

  methods: Record<string, { type: string; value: string }>;

  componentName: "Page";

  props: Record<string, any>;

  //页面包含的组件,核心属性，从这里面寻找配置

  children: Col[];

  // 页面唯一标识，8位数随机字符串，包括英文字母大小写和数字

  id: string;
};

export type RemoveReadOnly<T> = {
  -readonly [P in keyof T]?: T[P];
};

export type RowScope = { row: any; column: any; $index: number };

export interface SearchTableColumn {
  // el-tabl-column列属性label

  title?: string;

  // el-tabl-column列属性prop

  dataIndex?: string;

  // el-tabl-column列属性align

  align: "left" | "center" | "right";

  // el-tabl-column列属性width

  width?: number;

  // el-tabl-column列属性type

  type: "expand" | "index" | "selection";

  show?: (index: number) => boolean;

  // 当前列数据格式化

  codeItem?: {
    [key: string | number]: string;
  };

  //自定义渲染列内容，对应el-table-column的默认插槽

  render?: {
    // 默认为JSFunction

    type: string;

    //它是一个函数字符串，有函数体和返回值，它返回jsx模板字符串,例如：function r(){return `<div>123</div>`}

    value: string;
  };
}

type ValueProps = {
  type: "JSExpression";
  value: string;
  model?: {
    prop: string;
  };
};
type MenuOption = {
  title: string;
  index: string;
  subMenu: MenuOption[];
};
type OtherProps = {
  // 每一个子组件schema必须要生成的样式属性，用来编辑组件样式,可以为空对象，CSSProperties类型，比如{color: 'red'}，组件名采用小驼峰命名

  style?: Record<string, string>;

  // 控件类型，比如password,text,number等

  type?: string;

  // 组件的绑定事件属性配置,on后面跟事件名,小驼峰命名,这里以点击事件为例

  onClick?: {
    // 默认为JSExpression，也就是JS表达式的意思

    type: string;

    // 绑定的事件函数名

    value: string;
  };
} & Record<string, any>;
// 定义每个组件的 props 类型
type ComponentPropsMap = {
  ElInput: {
    // 绑定表单变量(表单控件的v-model属性绑定的变量)
    value: ValueProps;
    // 控件的占位字段，生成表单时必生成，比如ElInput的placeholder属性，其他组件不要设置这个字段
    placeholder: string;
  } & OtherProps;
  ElSelect: {
    // 绑定表单变量(表单控件的v-model属性绑定的变量)
    value: ValueProps;
    // 控件的占位字段，生成表单时必生成，比如ElInput的placeholder属性，其他组件不要设置这个字段
    placeholder: string;
  } & OtherProps;
  ElCheckBox: {
    // 绑定表单变量(表单控件的v-model属性绑定的变量)
    value: ValueProps;
  } & OtherProps;
  ElRow: OtherProps; // 不包含 value 属性
  ElCol: {
    span: number;
  } & OtherProps;
  ElFormItem: {
    //绑定校验规则时必生成,是对应的v-model变量名称
    prop: string;
    //设置表单项名称,el-form-item的label属性
    label: string;
  } & OtherProps;
  ElForm: {
    //校验规则
    rules?: { [key in string]: Array<FormItemRule> };
    labelWidth?: string;
  } & OtherProps; // 不包含 value 属性
  ElRadio: {
    // 绑定表单变量(表单控件的v-model属性绑定的变量)
    value: ValueProps;
  } & OtherProps;
  ElTable: {
    columns: SearchTableColumn[];
  } & OtherProps;
  ElButton: OtherProps;
  ElSteps: OtherProps;
  ElBreadCrumb: OtherProps;
  ElTags: OtherProps;
  ElDivider: OtherProps;
  ElCard: OtherProps;
  div: OtherProps;
  ElDatePicker: OtherProps;
  Text: OtherProps;
  ElCarousel: {
    autoplay: boolean;
    interval: number;
    indicatorPosition: "outside" | "none";
    loop: boolean;
    trigger: "click" | "hover";
    type: "card" | "default";
    direction: "horizontal" | "vertical";
    option: any[];
    motionBlur: boolean;
  } & OtherProps;
  ElFooter: OtherProps;
  ElHeader: OtherProps;
  ElMain: OtherProps;
  ElAside: OtherProps;
  ElContainer: OtherProps;
  ElMenu: {
    option: MenuOption[];
    mode: "horizontal" | "vertical";
    backgroundColor: string;
    textColor: string;
    activeTextColor: string;
    router: boolean;
  } & OtherProps;
};
type Children = Col[];
// 生成表单时，必须在ElFormItem中的children里面生成表单控件
export type Col = {
  //组件名称
  componentName: ComponentType;
  props: ComponentPropsMap[ComponentType] & Partial<Record<string, any>>; // 动态生成的 props
  parentId?: string;

  // 生成schema时必生成组件的id，它是组件的唯一标识，8位数随机字符，只包括英文字母大小写和数字,不要和现有的重复

  id: string;

  display?: DisplayRule;

  // div标签的子文本节点以及el-button的子文本节点

  label?: string;

  //是否带分页

  pager?: boolean;

  // 表格的分页器配置,pager为true时默认为`{order: 0, value: { currentPage: 1, pageSize: 10, pageSizes: [10, 20, 30, 40, 50], small: false, background: false, disabled: false, layout: "->,total, sizes, prev, pager, next, jumper", total: 0, "params": {"currentPage": ["pageNo",1],"pageSize": ["pageSize", 10] }}}`

  pagerConfig?: { order: number | null; value: Pagination };

  // 表格或者带有选项数据组件的请求入参对象配置，比如选择器，单选框，多选框的下拉选择数据

  fetchData?: {
    // 当前组件生成的顺序，默认从0开始，如果为null，表示页面上没有该组件，即该组件被删除了

    order: number | null;

    //当前组件数据的请求入参对象

    params: Partial<AxiosRequestConfig> & { format?: <T>(arg: T) => any };
  };

  /**当前表单项el-form-item的labelWidth */

  labelWidth?: string;

  // 当前组件的子元素，属性与当前组件相同，生成表单时，包含表单控件
  /**只有div、ElForm、ElFormItem、ElRow、ElCol、ElMenu、ElFooter、ElHeader、ElMain、ElAside、ElContainer组件有这个属性 */
  // 不是所有组件都有 children 属性
  children?: Col[];

  // 控制当前组件是否显示

  condition?: {
    // 默认为JSExpression，也就是JS表达式的意思

    type: string;

    //v-if绑定的变量

    value: string;
  };

  // 当前组件的循环绑定变量，v-for绑定的遍历数组
  loop?: {
    // 默认为JSExpression
    type: string;

    //遍历的数组名称
    value: string;
  };

  // 必填，当前循环和索引的名称，默认['item','index']
  loopArgs?: string[];

  // 当前组件的绑定属性集合
};

type CreateMutable<Type> = {
  -readonly [Property in keyof Type]+?: Type[Property];
};

export interface Pagination extends CreateMutable<PaginationProps> {
  params: Partial<Record<"currentPage" | "pageSize", [string, number]>>;
}

export type ComponentType =
  | "div"
  | "ElInput"
  | "Text"
  | "ElDatePicker"
  | "ElCheckBox"
  | "ElRadio"
  | "ElButton"
  | "ElSelect"
  | "ElTable"
  | "ElTags"
  | "ElBreadCrumb"
  | "ElForm"
  | "ElFormItem"
  | "ElCard"
  | "ElDivider"
  | "ElSteps"
  | "ElCol"
  | "ElRow"
  | "ElCarousel"
  | "ElFooter"
  | "ElHeader"
  | "ElMain"
  | "ElAside"
  | "ElContainer"
  |"ElMenu";

export interface SearchData<T = Record<string, any>[], K = any> {
  data?: Record<string, any> | T;
}