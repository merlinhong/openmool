

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Record<K extends keyof any, T> = {
  [P in K]: T;
};



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
  // tailwind的样式类
  class?: string;
  // 每一个子组件schema必须要生成的样式属性，用来编辑组件样式,可以为空对象，CSSProperties类型，比如{color: 'red'}，组件名采用小驼峰命名

  style?: Record<string, string>;


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

    // 控件类型，比如password,text,number等

    type?: string;
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
  // ElForm: {
  //   //校验规则
  //   rules?: { [key in string]: Array<FormItemRule> };
  //   labelWidth?: string;
  // } & OtherProps; // 不包含 value 属性
  ElRadio: {
    // 绑定表单变量(表单控件的v-model属性绑定的变量)
    value: ValueProps;
  } & OtherProps;
  // ElTable: {
  //   columns: SearchTableColumn[];
  // } & OtherProps;
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

/**生成官网的schema，严格按照这种格式生成。根据输入的描述调整样式、内容
 * {
  componentName: "ElContainer",
  props: {},
  id: "root12345",
  children: [
    {
      "componentName": "div",
      "props": {
        "style": {
          "background": "#333 !important",
          "padding": "10px",
          "display": "flex",
          "alignItems": "center",
          "justifyContent": "space-between"
        },
        "class": "bg-white"
      },
      "children": [
        {
          "label": "MlDesigner",
          "props": {
            "style": {
              "width": "fit-content",
              "color": "#fff",
              "fontSize": "18px"
            }
          },
          "key": "text",
          "componentName": "Text",
          "id": "zkyk5rpz",
          "parentId": "ncresfks"
        },
        {
          "label": "",
          "key": "",
          "componentName": "ElMenu",
          "props": {
            "style": {
              "width": "fit-content",
              "borderBottom": "none !important",
              "borderRight": "none !important"
            },
            "textColor": "#fff",
            "backgroundColor": "#333",
            "ellipsis": false,
            "mode": "horizontal",
            "option": [
              {
                "title": "菜单1",
                "index": "1",
                "subMenu": [
                  {
                    "title": "子菜单1",
                    "index": "1-1"
                  },
                  {
                    "title": "子菜单2",
                    "index": "1-2"
                  }
                ]
              },
              {
                "title": "菜单2",
                "index": "2"
              },
              {
                "title": "菜单3",
                "index": "3"
              }
            ]
          },
          "id": "c5cjtce5"
        },
        {
          "label": "登录",
          "key": "",
          "componentName": "ElButton",
          "props": {
            "style": {
              "display": "flex",
              "flexDirection": "row",
              "width": "fit-content",
              "justifyContent": "space-between"
            },
            "type": "primary",
            "text": false,
            "color": "",
            "plain": true
          },
          "id": "c2dy2kwz"
        }
      ],
      "id": "bmrr5exp"
    },
    {
      "componentName": "div",
      "props": {
        "style": {
          "background": "#fff"
        }
      },
      "children": [
        {
          "label": "",
          "key": "",
          "componentName": "ElCarousel",
          "props": {
            "style": {
              "width": "100%"
            },
            "height": "300px",
            "arrow": "never",
            "autoplay": true,
            "interval": 3000,
            "indicatorPosition": "outside",
            "loop": true,
            "trigger": "click",
            "type": "card",
            "direction": "horizontal",
            "option": [
              1,
              2,
              3,
              4
            ],
            "motionBlur": true
          },
          "id": "hmhmpt8w"
        }
      ],
      "id": "c48ryk6y"
    },
    {
      "componentName": "div",
      "props": {
        "style": {
          "background": "#fff",
          "height": "500px",
          "display": "flex",
          "padding": "15px",
          "alignItems": "center",
          "justifyContent": "center",
          "flexDirection": "column"
        }
      },
      "children": [
        {
          "label": "产品描述",
          "props": {
            "style": {
              "width": "fit-content",
              "color": "#000",
              "fontSize": "16px"
            },
            "class": ""
          },
          "key": "text",
          "componentName": "Text",
          "id": "xtz37yt8",
          "parentId": "sphhpkhc"
        },
        {
          "componentName": "div",
          "props": {
            "style": {
              "background": "#fff",
              "display": "flex",
              "alignItems": "center",
              "justifyContent": "space-around"
            }
          },
          "children": [
            {
              "label": "卡片",
              "componentName": "ElCard",
              "props": {
                "style": {
                  "width": "200px",
                  "height": "200px"
                }
              },
              "id": "ekzwcys5"
            },
            {
              "label": "卡片",
              "componentName": "ElCard",
              "props": {
                "style": {
                  "width": "200px",
                  "height": "200px"
                }
              },
              "id": "6jnwi2ca",
              "parentId": "im7s435w"
            },
            {
              "label": "卡片",
              "componentName": "ElCard",
              "props": {
                "style": {
                  "width": "200px",
                  "height": "200px"
                }
              },
              "id": "zmhkkws4",
              "parentId": "im7s435w"
            },
            {
              "label": "卡片",
              "componentName": "ElCard",
              "props": {
                "style": {
                  "width": "200px",
                  "height": "200px"
                }
              },
              "id": "5wm8d2hn",
              "parentId": "im7s435w"
            }
          ],
          "id": "im7s435w",
          "parentId": "main"
        }
      ],
      "id": "sphhpkhc"
    },
    {
      "componentName": "div",
      "props": {
        "style": {
          "background": "#fff",
          "height": "500px",
          "display": "flex",
          "padding": "15px",
          "alignItems": "center",
          "justifyContent": "center",
          "flexDirection": "column"
        }
      },
      "children": [
        {
          "label": "产品服务",
          "props": {
            "style": {
              "width": "fit-content",
              "color": "#000",
              "fontSize": "16px"
            },
            "class": ""
          },
          "key": "text",
          "componentName": "Text",
          "id": "fwat374i",
          "parentId": "sphhpkhc"
        },
        {
          "componentName": "div",
          "props": {
            "style": {
              "background": "#fff",
              "display": "flex",
              "alignItems": "center",
              "justifyContent": "space-around"
            }
          },
          "children": [
            {
              "label": "卡片",
              "componentName": "ElCard",
              "props": {
                "style": {
                  "width": "200px",
                  "height": "200px"
                }
              },
              "id": "8rpcrfh5"
            },
            {
              "label": "卡片",
              "componentName": "ElCard",
              "props": {
                "style": {
                  "width": "200px",
                  "height": "200px"
                }
              },
              "id": "mmsawbze",
              "parentId": "im7s435w"
            },
            {
              "label": "卡片",
              "componentName": "ElCard",
              "props": {
                "style": {
                  "width": "200px",
                  "height": "200px"
                }
              },
              "id": "dkrmkinz",
              "parentId": "im7s435w"
            },
            {
              "label": "卡片",
              "componentName": "ElCard",
              "props": {
                "style": {
                  "width": "200px",
                  "height": "200px"
                }
              },
              "id": "kbrj2a8r",
              "parentId": "im7s435w"
            }
          ],
          "id": "3id36f2p",
          "parentId": "main"
        }
      ],
      "id": "itks32ej",
      "parentId": "main"
    },
    {
      "componentName": "div",
      "props": {
        "style": {
          "background": "#fff",
          "display": "flex",
          "padding": "15px",
          "alignItems": "center",
          "justifyContent": "space-around",
          "backgroundColor": "#000000"
        }
      },
      "children": [
        {
          "label": "© 2023 公司名称. 保留所有权利.",
          "props": {
            "style": {
              "width": "fit-content",
              "color": "#FFFFFF",
              "fontSize": "16px"
            },
            "class": ""
          },
          "key": "text",
          "componentName": "Text",
          "id": "hih3z3ac"
        }
      ],
      "id": "sh47h37a",
      "parentId": "main"
    }
  ]
};
 * 
*/
export type Col = {
  //组件名称
  componentName: ComponentType;
  props: ComponentPropsMap[ComponentType] & Partial<Record<string, any>>; // 动态生成的 props
  parentId?: string;

  // 生成schema时必生成组件的id，它是组件的唯一标识，8位数随机字符，只包括英文字母大小写和数字,不要和现有的重复

  id: string;


  // Text以及el-button的文本属性

  label?: string;


  /**当前表单项el-form-item的labelWidth */

  labelWidth?: string;

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



export type ComponentType =
  | "div"
  | "ElInput"
  | "Text"
  | "ElDatePicker"
  | "ElCheckBox"
  | "ElRadio"
  | "ElButton"
  | "ElSelect"
  // | "ElTable"
  | "ElTags"
  | "ElBreadCrumb"
  // | "ElForm"
  // | "ElFormItem"
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
  | "ElMenu";

export interface SearchData<T = Record<string, any>[], K = any> {
  data?: Record<string, any> | T;
}