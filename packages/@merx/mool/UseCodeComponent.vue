<template>
  <div>
    <button @click="loadAndExecuteCode">加载并执行保存的代码</button>
    <pre v-if="savedCode"><code v-html="highlightedCode"></code></pre>
    <div v-if="executionResult">
      <h3>执行结果：</h3>
      <pre>{{ executionResult }}</pre>
    </div>
    <div v-if="definedVariables.length">
      <h3>定义的变量：</h3>
      <ul>
        <li v-for="variable in definedVariables" :key="variable">
          {{ variable }}: {{ context[variable] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 或者其他您喜欢的样式

export default {
  setup() {
    const savedCode = ref('');
    const executionResult = ref(null);
    const context = reactive({});
    const definedVariables = ref([]);

    const highlightedCode = computed(() => {
      return savedCode.value ? hljs.highlight('javascript', savedCode.value).value : '';
    });

    async function loadAndExecuteCode() {
      try {
        const response = await fetch('/get-saved-code');
        const data = await response.json();
        savedCode.value = data.code;
        
        // 执行代码
        executeCode(savedCode.value);
      } catch (error) {
        console.error('加载或执行代码失败:', error);
        savedCode.value = '加载失败';
        executionResult.value = '执行失败: ' + error.message;
      }
    }

    function executeCode(code) {
      try {
        // 清空上下文对象
        Object.keys(context).forEach(key => delete context[key]);
        
        // 将代码包装在一个立即执行的函数表达式中
        const wrappedCode = `
          (function(context) {
            ${code}
            return context;
          })(this);
        `;
        
        // 执行代码并更新上下文
        const result = new Function('return ' + wrappedCode).call(context);
        Object.assign(context, result);
        
        // 更新定义的变量列表
        definedVariables.value = Object.keys(context);
        
        executionResult.value = '代码执行成功';
      } catch (error) {
        console.error('代码执行失败:', error);
        executionResult.value = '执行失败: ' + error.message;
      }
    }

    return {
      savedCode,
      executionResult,
      context,
      definedVariables,
      highlightedCode,
      loadAndExecuteCode,
    };
  }
};
</script>

<style scoped>
pre {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
