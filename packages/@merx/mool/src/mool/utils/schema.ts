import { hmr } from './../hooks/hmr';
import { ComponentType, Col } from "@/mool/types/BasicForm";
export const renderColumnCompLi = [
  { text: "盒子", dataType: "div" },
  { text: "纯文本", dataType: "Text" },

  { text: "单行文本", dataType: "ElInput" },

  { text: "开关", dataType: "ElSwitch" },

  { text: "单选框", dataType: "ElRadio" },

  { text: "日期/时间", dataType: "ElDatePicker" },

  { text: "按钮", dataType: "ElButton" },
  { text: "图片", dataType: "ElImage" },
  { text: "图标", dataType: "ElIcon" },
];
export const componentGroups = [
  {
    title: "容器组件",
    components: [
      { text: "盒子", dataType: "div" },
      { text: "Form", dataType: "ElForm" },
      { text: "FormItem", dataType: "ElFormItem" },
      { text: "卡片", dataType: "ElCard" },
      { text: "弹窗", dataType: "ElDialog" },
    ]
  },
  {
    title: "布局组件",
    components: [
      { text: "col", dataType: "ElCol" },
      { text: "row", dataType: "ElRow" },
      { text: "分割线", dataType: "ElDivider" },
      { text: "空格", dataType: "ElSpace" },
      {text:"container",dataType:"ElContainer"},
      {text:"header",dataType:"ElHeader"},
      {text:"footer",dataType:"ElFooter"},
      {text:"main",dataType:"ElMain"},
      {text:"aside",dataType:"ElAside"},
    ]
  },
  {
    title: "表单组件",
    components: [
      { text: "纯文本", dataType: "Text" },
      { text: "单行文本", dataType: "ElInput" },
      { text: "多行文本", dataType: "TextArea" },
      { text: "下拉框", dataType: "ElSelect" },
      { text: "单选框", dataType: "ElRadio" },
      { text: "多选框", dataType: "ElCheckBox" },
      { text: "日期/时间", dataType: "ElDatePicker" },
      { text: "按钮", dataType: "ElButton" },
    ]
  },
  {
    title: "数据展示组件",
    components: [
      { text: "表格", dataType: "ElTable" },
      { text: "图片", dataType: "ElImage" },
      { text: "图标", dataType: "ElIcon" },
      { text: "多标签页", dataType: "ElTags" },
      { text: "走马灯", dataType: "ElCarousel" },
      { text: "进度条", dataType: "ElSteps" },
    ]
  },
  {
    title: "导航组件",
    components: [
      { text: "面包屑", dataType: "ElBreadCrumb" },
      { text: "导航栏", dataType: "ElPageHeader" },
      { text: "菜单", dataType: "ElMenu" },
    ]
  },
  {
    title: "其他组件",
    components: [
      { text: "图片上传", dataType: "upload" },
      { text: "子表单", dataType: "ElBreadCrumb" },
    ]
  }
];

// 保留原来的 baseComponentList 和 seniorComponentList，以防其他地方还在使用
export const baseComponentList = componentGroups.flatMap(group => group.components);
export const seniorComponentList = [];

export const JsonSchema: {
  [K in ComponentType]: Col;
} = {
  div: {
    componentName: "div",
    props: {
      style: {
        padding: "5px",
        backgroundColor: "#fff",
      },
      class: "",
    },
    children: [],
    id: "",
  },

  ElForm: {
    componentName: "ElForm",
    props: {
      labelPosition: "right",
      labelWidth: "80px",
      style: {
        display: "flex",
        flexWrap: "wrap",
      },
      class: "",
    },
    children: [],
    id: "",
  },

  ElFormItem: {
    componentName: "ElFormItem",
    props: {
      label: "表单项名称",
      style: {},
      class: "",
    },
    children: [],
    id: "",
  },

  Text: {
    label: "文本",
    props: {
      style: { width: "fit-content", color: "#000", fontSize: "16px" },
      class: "",
    },
    key: "text",
    componentName: "Text",
  },
  ElContainer: {
    componentName: "ElContainer",
    props: {
      style: { },
      class: "",
    },
    children: [],
  },
  ElHeader: {
    componentName: "ElHeader",
    props: {
      style: { },
      class: "",
    },
    children: [],
  },
  ElFooter: {
    componentName: "ElFooter",
    props: {
      style: {  },
      class: "",
    },
    children: [],
  },  
  ElMain: {
    componentName: "ElMain",
    props: {
      style: { },
      class: "",
    },
    children: [],
  },
  ElAside: {
    componentName: "ElAside",
    props: {
      style: {  },
      class: "",
    },
    children: [],
  },

  ElInput: {
    label: "",
    props: {
      style: { width: "fit-content", fontSize: "16px" },
      class: "",
    },
    key: "single",
    componentName: "ElInput",
    append: [],
  },

  TextArea: {
    label: "",
    key: "multiple",
    componentName: "TextArea",
    props: {
      style: { width: "fit-content", textAlign: "left" },
      class: "",
    },
  },
  ElImage: {
    componentName: "ElImage",
    props: {
      style: { width: "100%", height: "100%" },
      class: "",
      fit: "scale-down",
      src: `https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/undraw_messaging_7ho8_(2)_5g7e.svg`,
    },
  },
  
  ElIcon: {
    componentName: "ElIcon",
    props: {
      style: { width: "fit-content", height: "fit-content" },
      class: "",
      icon: "ArrowDown",
      size: 25,
    },
  },
  ElSelect: {
    label: "",
    key: "select",
    componentName: "ElSelect",
    props: {
      style: { width: "100%" },
      class: "",
      option: [
        {
          id: 0,
          order: 0,
          label: "选项1",
          value: 1,
        },
        {
          id: 1,
          order: 1,
          label: "选项2",
          value: 2,
        },
        {
          id: 2,
          order: 2,
          label: "选项3",
          value: 3,
        },
      ],
    },
  },

  ElRadio: {
    label: "",
    key: "radio",
    componentName: "ElRadio",
    props: {
      style: { width: "fit-content" },
      class: "",
      option: [
        {
          id: 0,
          order: 0,
          label: "选项1",
          value: 1,
        },
        {
          id: 1,
          order: 1,
          label: "选项2",
          value: 2,
        },
        {
          id: 2,
          order: 2,
          label: "选项3",
          value: 3,
        },
      ],
    },
  },

  ElCheckBox: {
    label: "",
    key: "checkbox",
    componentName: "ElCheckBox",
    props: {
      style: { width: "fit-content" },
      class: "",
      option: [
        {
          index: 0,
          order: 0,
          label: "选项1",
          value: "1",
        },
        {
          index: 1,
          order: 1,
          label: "选项2",
          value: "2",
        },
        {
          index: 2,
          order: 2,
          label: "选项3",
          value: "3",
        },
      ],
    },
  },

  ElButton: {
    label: "按钮文本",
    key: "",
    componentName: "ElButton",
    props: {
      style: { display: "flex", flexDirection: "row", width: "fit-content" },
      class: "",
      type: "primary",
      text: false,
      color: "",
    },
  },

  ElDatePicker: {
    label: "",
    key: "date",
    componentName: "ElDatePicker",
    props: {
      style: { width: "fit-content" },
      class: "w-full",
    },
  },

  ElTable: {
    label: "",
    key: "",
    componentName: "ElTable",
    props: {
      headerCellStyle: { background: "#fff" },
      style: {},
      class: "",
      data: [
        { name: "张三", age: 18, sex: "男" },
        { name: "李四", age: 23, sex: "女" },
        { name: "王五", age: 56, sex: "男" },
      ],
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          render: {
            type: "JSFunction",
            value: "function r(){return '<div>123</div>'}",
          },
        },

        { title: "年龄", dataIndex: "age" },

        { title: "性别", dataIndex: "sex" },
      ],
    },
  },

  ElTags: {
    key: "",
    active: 1,
    props: {
      style: { height: "450px", background: "#fff" },
      tabItems: [
        { label: "标签1", name: 1, children: [] },
        { label: "标签2", name: 2, children: [] },
        { label: "标签3", name: 3, children: [] },
      ],
    },

    componentName: "ElTags",
    children: [],
  },

  ElBreadCrumb: {
    label: "导航菜单",

    props: {
      style: { width: "fit-content", textAlign: "left" },

      option: [
        { label: "一级菜单名称" },

        { label: "二级菜单名称" },

        { label: "三级菜单名称" },

        { label: "四级菜单名称" },
      ],
    },

    key: "",

    componentName: "ElBreadCrumb",
  },

  ElCard: {
    label: "卡片",

    componentName: "ElCard",

    props: {
      style: {
        maxWidth: "200px",
        height: "200px",
        width: "200px",
      },
      shadow: "hover",
      class: "",
    },
    children: [],
  },

  ElDivider: {
    label: "分割线",

    componentName: "ElDivider",

    props: {
      style: {
        margin: "5px 0 10px 0",
      },
    },
  },

  ElSteps: {
    label: "步骤条",
    props: {},
    componentName: "ElSteps",
  },

  ElCol: {
    label: "",

    key: "",

    componentName: "ElCol",

    props: {
      span: 24,

      style: {},
      class: "",
    },

    children: [],

    id: "",
  },

  ElRow: {
    label: "",
    key: "",
    componentName: "ElRow",
    props: {
      gutter: 20,
      style: { width: "100%" },
      class: "",
    },
    children: [],
    id: "",
  },
  ElPageHeader: {
    label: "",
    key: "",
    componentName: "ElPageHeader",
    props: {
      style: { width: "100%" },
      title: "MlDesigner",
      content: "",
      icon: "",
    },
  },
  ElMenu: {
    label: "",
    key: "",
    componentName: "ElMenu",
    props: {
      style: { width: "100%",border:'none'},
      textColor: "#fff",
      backgroundColor: "#333",
      ellipsis: false,
      mode: "horizontal",
      class: "",
      option: [
        {
          title: "菜单1",
          index: "1",
          subMenu: [
            { title: "子菜单1", index: "1-1" },
            { title: "子菜单2", index: "1-2" },
          ],
        },
        { title: "菜单2", index: "2" },
        { title: "菜单3", index: "3" },
      ],
    },
  },
  ElCarousel: {
    label: "",
    key: "",
    componentName: "ElCarousel",
    props: {
      height: "auto",
      arrow: "never",
      autoplay: true,
      interval: 3000,
      loop: true,
      trigger: "click",
      direction: "horizontal",
      class: "",
      option: [
        { id: "1", name: "", label: "1",style:{height:'400px'} },
        { id: "2", name: "", label: "2" ,style:{height:'400px'}},
        { id: "3", name: "", label: "3" ,style:{height:'400px'}},
      ],
      motionBlur: false,
    },
  },
};
