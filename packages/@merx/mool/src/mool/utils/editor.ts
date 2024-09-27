import { ref, nextTick, unref, toRaw } from "vue";
import * as monaco from "monaco-editor";
export type MonacoEditor = monaco.editor.IStandaloneCodeEditor | null;
const editor = ref<MonacoEditor>(null);
interface Editor {
  (args: {
    code: string;
    id?: string;
    lang?: string;
    update?: (val: string) => void;
    callback?: (val: MonacoEditor) => void;
    change?: () => void;
  }): void;
}
export const initEditor: Editor = ({ code, id = "editor_container", lang = "json", update, change, callback }) => {
  let CODE = unref(code);
  nextTick(() => {
    // 配置 Web Worker 路径

    self.MonacoEnvironment = {
      getWorkerUrl: function (workerId, label) {
        return URL.createObjectURL(
          new Blob(
            [
              `self.MonacoEnvironment = {baseUrl: '${window.location.origin}/node_modules/monaco-editor/min/'};importScripts('${window.location.origin}/node_modules/monaco-editor/min/vs/base/worker/workerMain.js');`,
            ],

            { type: "application/javascript" },
          ),
        );
      },
    };

    // 定义自定义主题

    monaco.editor.defineTheme("myCustomTheme", {
      base: "vs", // 可以是 'vs' (明亮主题), 'vs-dark' (黑暗主题) 或 'hc-black' (高对比度主题)

      inherit: true, // 继承基础主题

      rules: [],

      colors: {
        "editor.background": "#ffffff", // 设置编辑器背景颜色
      },
    });

    // 应用自定义主题
    monaco.editor.setTheme("myCustomTheme");
    setTimeout(() => {
      editor.value?.getAction("editor.action.formatDocument")?.run();
      update?.(toRaw(editor.value)?.getValue() as string);
      monaco.editor.onDidChangeMarkers((event) => {
        const model = toRaw(editor.value)?.getModel() as monaco.editor.ITextModel;
        monaco.editor.setModelMarkers(model, "typescript", [
          //   {
          //     startLineNumber: 0,
          //     endLineNumber: 0,
          //     startColumn: 2,
          //     endColumn: 100,
          //     severity: monaco.MarkerSeverity.Hint,
          //     message: `未定义的变量都存在ref中，下载源码后可见`,
          // },
        ]);
      });
    }, 40);

    editor.value = monaco.editor.create(
      document.getElementById(id)!,
      {
        value: [CODE].join(""),
        language: lang,
        autoIndent: "keep", //自动布局
        quickSuggestionsDelay: 100, //代码提示延时
        lineNumbers: "on",
        scrollBeyondLastColumn: 5, // 允许滚动超过最后一列
        wordWrap: "off",
        minimap: {
          enabled: false,
        },
        // validationOptions: undefined, // 或者使用 {} 来达到相同效果
      },
    );

    // 监听代码变化事件
    editor.value.onDidChangeModelContent((event) => {
      
      editor.value?.getAction("editor.action.formatDocument")?.run();
      // 你可以在这里获取变化的内容
      change?.();
    });
    // 确保编辑器实例已正确初始化

    editor.value.onDidBlurEditorText(() => {
      update?.(toRaw(editor.value)?.getValue() as string);
    });
    callback?.(editor.value);
  });
};
