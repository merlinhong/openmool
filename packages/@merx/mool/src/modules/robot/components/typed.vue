<template>
  <div :id="$props.id" style="display: flex; flex-direction: column">
    <span ref="typedElement0" style="margin: 5px 0"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from "vue";

import Typed, { type TypedOptions } from "typed.js";
import { watch } from "vue";
import { PropType } from "vue";

export default defineComponent({
  name: "Typed",

  props: {
    message: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({ message: "正在分析页面组件..." }),
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    let spanInd = 0;
    const typedElement0 = ref<HTMLElement | null>(null);
    const selectedOption = ref("");

    const messages = ref(props.message);
    const insertRadioButtons = () => {
      const radioHtml = `
        <div >
          <label>
            <input type="radio" name="options" value="是" v-on:change="handleOptionChange"> 是
          </label>
          <label>
            <input type="radio" name="options" value="否" v-on:change="handleOptionChange"> 否
          </label>
        </div>
      `;
      document.getElementById(props.id)?.insertAdjacentHTML("beforeend", radioHtml);
      const radioButtons = document.getElementById(props.id)?.querySelectorAll('input[name="options"]');
      radioButtons?.forEach((radio) => {
        radio.addEventListener("change", handleOptionChange);
      });
    };
    const handleOptionChange = (event: Event) => {
      selectedOption.value = (event.target as HTMLElement).value; // 获取用户选择的选项
      messages.value.isqt = false;
      messages.value.content = `你选择了${selectedOption.value}`;
    };
    const options: TypedOptions = {
      strings: [messages.value.content],

      typeSpeed: 15,

      backSpeed: 25,

      backDelay: 1000,

      loop: false,

      showCursor: false,

      onComplete(self) {
        self.stop();
        if (messages.value.isqt) {
          insertRadioButtons(); // 插入单选框
        }
      },
    };
    onMounted(() => {
      watch(
        () => messages.value.content,
        (n, o) => {
          spanInd++;
          const span = document.createElement("span");
          span.style.margin = "5px 0";
          const typed_container = document.getElementById(props.id);
          typed_container?.appendChild(span);
          options.strings = [n];
          console.log(options);

          nextTick(() => {
            new Typed(typed_container?.childNodes[spanInd], options);
          });
        },
        { deep: true },
      );
      nextTick(() => {
        if (typedElement0.value) {
          new Typed(typedElement0.value, options);
        }
      });
    });

    return {
      typedElement0,
    };
  },
});
</script>

<style scoped>
.typed-message {
  display: inline-block;
}
</style>
