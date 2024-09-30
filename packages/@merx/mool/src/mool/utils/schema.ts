import { ComponentType, Col } from "@/mool/types/BasicForm";

export const renderColumnCompLi = [
  { text: "盒子", dataType: "div" },

  { text: "纯文本", dataType: "Text" },

  { text: "单行文本", dataType: "ElInput" },

  { text: '开关', dataType: 'ElSwitch' },

  { text: "单选框", dataType: "ElRadio" },

  { text: "日期/时间", dataType: "ElDatePicker" },

  { text: "按钮", dataType: "ElButton" },
]

export const baseComponentList = [
  { text: "纯文本", dataType: "Text" },

  { text: "单行文本", dataType: "ElInput" },

  { text: "多行文本", dataType: "TextArea" },

  { text: "下拉框", dataType: "ElSelect" },

  { text: "单选框", dataType: "ElRadio" },

  { text: "多选框", dataType: "ElCheckBox" },

  { text: "日期/时间", dataType: "ElDatePicker" },

  { text: "按钮", dataType: "ElButton" },

  { text: "图片上传", dataType: "upload" },
];

export const seniorComponentList = [

  { text: "Form", dataType: "ElForm" },

  { text: "FormItem", dataType: "ElFormItem" },

  { text: "col", dataType: "ElCol" },

  { text: "row", dataType: "ElRow" },

  { text: "图片上传", dataType: "upload" },

  { text: "表格", dataType: "ElTable" },

  { text: "多标签页", dataType: "ElTags" },

  { text: "面包屑", dataType: "ElBreadCrumb" },

  { text: "分割线", dataType: "ElDivider" },

  { text: "子表单", dataType: "ElBreadCrumb" },

  { text: "进度条", dataType: "ElSteps" },

  { text: "卡片", dataType: "ElCard" },

  { text: '走马灯', dataType: 'ElCarousel' },

  { text: "导航栏", dataType: "ElPageHeader" },
  { text: "菜单", dataType: "ElMenu" },

];

export const JsonSchema: {
  [K in ComponentType]: Col;
} = {
  div: {
    componentName: "div",

    props: {
      style: {
        background: "#fff",
      },
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
    },

    children: [],

    id: "",
  },

  ElFormItem: {
    componentName: "ElFormItem",

    props: {
      label: "区域",

      style: {},
    },

    children: [],

    id: "",
  },

  Text: {
    label: "文本",

    props: {
      style: { width: "fit-content", color: "#000", fontSize: "16px" },
    },

    key: "text",

    componentName: "Text",
  },

  ElInput: {
    label: "",

    props: {
      style: { width: "fit-content", fontSize: "16px" },
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
    },
  },

  ElSelect: {
    label: "",

    key: "select",

    componentName: "ElSelect",

    props: {
      style: { width: "100%" },

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
    },
  },

  ElTable: {
    label: "",

    key: "",

    componentName: "ElTable",

    props: {
      headerCellStyle: { background: "#fff" },

      style: {},

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
      style: { height: '450px', background: '#fff' },
      tabItems: [{ label: '标签1', name: 1, children: [] }, { label: '标签2', name: 2, children: [] }, { label: '标签3', name: 3, children: [] }]
    },

    componentName: "ElTags",
    children: []
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
        width: "200px",
        height: "200px",
      },
    },
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
      title: 'MlDesigner',
      content: '',
      icon: '',
    },

  },
  ElMenu: {
    label: "",

    key: "",

    componentName: "ElMenu",

    props: {
      style: { width: "fit-content" },
      textColor: '#fff',
      backgroundColor: '#333',
      ellipsis: false,
      mode: 'horizontal',
      menuItems: [{ title: '菜单1', index: '1', subMenu: [{ title: '子菜单1', index: '1-1' }, { title: '子菜单2', index: '1-2' },] }, { title: '菜单2', index: '2' }, { title: '菜单3', index: '3', }]
    }

  },
  ElCarousel: {
    label: "",
    key: "",
    componentName: "ElCarousel",
    props: {
      style: { width: "100%" },
      height: '300px',
      arrow: 'never',
      autoplay: true,
      interval: 3000,
      indicatorPosition: 'outside',
      loop: true,
      trigger: 'click',
      type: 'card',
      direction: 'horizontal',
      option: [1, 2, 3, 4],
      motionBlur: false
    }
  }
};
