<template>
  <div>
    <div id="monaco-editor"></div>
    <button @click="saveCode">保存代码</button>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.initMonaco();
  },
  methods: {
    initMonaco() {
      this.editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        value: '',
        language: 'javascript',
        theme: 'vs-dark',
      });
    },
    async saveCode() {
      const code = this.editor.getValue();
      try {
        const response = await fetch('/save-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error('保存代码失败:', error);
      }
    },
  },
};
</script>
