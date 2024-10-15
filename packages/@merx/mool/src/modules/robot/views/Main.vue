<template>
  <div class="chat-box">
    <div ref="chatHistory">
      <el-space>
        <el-form-item label="模型">
          <el-select style="width: 200px" v-model="model" placeholder="请选择模型">
            <el-option label="gpt-3.5-turbo" value="gpt-3.5-turbo"></el-option>

            <el-option label="gpt-3.5-turbo-0125" value="gpt-3.5-turbo-0125"></el-option>

            <el-option label="gpt-4o-mini" value="gpt-4o-mini"></el-option>

            <el-option label="gpt-4o" value="gpt-4o"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别">
          <el-select style="width: 200px" v-model="category" placeholder="请选择生成类别">
            <el-option label="网站" value="网站"></el-option>
            <el-option label="功能" value="功能"></el-option>
            <el-option label="表单" value="表单"></el-option>
          </el-select>
        </el-form-item>
      </el-space>
      <div class="chat-history"  v-for="(message, index) in messages" :key="index" :class="['message-bubble', message.role]">
        <div :class="['message-content', message.role]">
          <el-icon v-if="message.role === 'user'" class="text-gray-500 text-2xl mx-2 align-top">
            <i-ep-Avatar />
          </el-icon>
          <div
            v-if="message.role === 'system'"
            class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center text-[13px]"
          >
            AI
          </div>

          <div>
            <p
              v-if="message.role === 'user'"
              style="
                background-color: #ecf8fa;

                padding: 10px;

                max-width: 320px;

                width: fit-content;

                border-radius: 5px;

                word-break: break-all;
              "
            >
              {{ message.content }}
            </p>

            <template v-if="message.role === 'system'">
              <div
                style="
                  background-color: #e8f3f5;

                  padding: 10px;

                  border-radius: 5px;

                  max-width: 360px;

                  width: fit-content;

                  border-radius: 5px;

                  word-break: break-all;
                "
              >
                <TypedMessage v-if="message.typed" :message="message" :id="`typed-message${index}`" />

                <p v-if="!message.typed">{{ message.content }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex">
      <el-input v-model="userInput" placeholder="输入你的消息..." @keyup.enter="sendMessage" class="input-box" />

      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, nextTick, defineModel, watchEffect } from "vue";

import { onMounted } from "vue";

import TypedMessage from "../components/typed.vue";

import { Col } from "@/mool";

// interface FoundationModel {

// manufacturer?: "openai";

// model?: "gpt-3.5-turbo" | "gpt-4";

// }

interface Message {
  role: "user" | "ai";

  content: string;
}

export default defineComponent({
  components: {
    TypedMessage,
  },
  name: "RobotMainVue",
  props: {
    foundationModel: {
      type: String,

      default: "gpt-3.5-turbo",
    },

    schema: {
      type: Object as () => Col,

      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const model = ref(props.foundationModel);

    const messages = ref<Record<string, any>[]>([]);
    const category = ref("网站");
    const userInput = ref("");

    const isTyped = ref(false);

    const Schema = ref("");

    const descList = ref<Record<string, string>>({
      "网站": "你好！当前我可以为您辅助生成网站页面，有什么需求请告诉我",
      "功能": "你好！当前我可以为您辅助生成js代码，请告诉我你的需求",
      "表单": "你好！当前我可以为您辅助生成表单页面，你也可以选中一个表单，我可以为您绑定表单数据和规则校验,有什么需求请告诉我", 
    });

    let extra = ""; // 额外的输入描述

    watchEffect(() => {
      messages.value = [
        {
          role: "system",
          content: descList.value[category.value],
          typed: false,
        },
      ];
    });

    const chatHistory = ref<HTMLElement | null>(null);

    const sendMessage = () => {
      if (userInput.value.trim() === "") return;

      const userMessage: Message = {
        role: "user",

        content: userInput.value,
      };

      messages.value.push(userMessage);

      const input = userInput.value;

      isTyped.value = true;

      userInput.value = "";
      if (category.value === "表单") {
        if (!props.schema)
          return messages.value.push({
            role: "system",

            content: "请先选择一个组件",

            typed: false,
          });
        if (props.schema.componentName == "div" && input.includes("表单")) {
          const msg = {
            role: "system",
            content: "请选择是否需要行列布局组件包裹?",
            typed: true,
            isqt: true,
            choosed: (res: string) => {
              if (res == "是") {
                extra = "表单组件需要行列布局组件包裹";
              }
              fecthAi(input, extra, "已为您成功生成表单");
              return;
            },
          };
          return messages.value.push(msg);
        } else {
          const msg = {
            role: "system",

            content: "正在分析当前组件...",

            typed: true,
          };

          const second = Math.random() * 10 * 500;

          setTimeout(() => {
            messages.value.push(msg);

            scrollToBottom();
          }, second / 2);

          setTimeout(
            () => {
              messages.value[messages.value.length - 1].content = "正在绑定变量...请稍等";

              scrollToBottom();
            },

            second * 2 + Math.random() * 10 * 500,
          );

          setTimeout(
            () => {
              messages.value[messages.value.length - 1].content = "解析中...";

              scrollToBottom();
            },

            second + Math.random() * 10 * 500,
          );
        }
      } else {
        messages.value.push({
          role: "system",
          content: "正在生成...",
          typed: true,
        });
      }

      fecthAi(input, "", "已完成");
      // 滚动到最新消息

      scrollToBottom();

      // 调用 AI 回复
    };

    const fecthAi = (prompt: string, extra?: string, desc = "绑定完成") => {
      fetch("/api/ai/chat", {
        method: "post", // 或 'GET', 'PUT', 'DELETE', 等

        body: JSON.stringify({
          messages:
            category.value == "表单" ? `请分析当前组件schema：${JSON.stringify(props.schema)}\n` : "" + prompt + extra,
          foundationModel: {
            model: model.value,
          },
          type: category.value,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((res) => {
          if (res.data.success === false) {
            return (messages.value[messages.value.length - 1].content = "解析失败");
          }

          messages.value[messages.value.length - 1].content = desc;

          scrollToBottom();

          emit("update:schema", res.data, category.value === "表单");
        })

        .catch((error) => {
          console.log(error);

          messages.value.push({
            role: "system",

            content: "系统异常",

            typed: false,
          });

          scrollToBottom();
        });
    };

    const scrollToBottom = () => {
      nextTick(() => {
        if (chatHistory.value) {
          chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
        }
      });
    };

    onMounted(async () => {
      // 滚动到最新消息

      scrollToBottom();
    });

    return {
      userInput,

      sendMessage,

      messages,

      isTyped,

      chatHistory,

      Schema,

      model,
      category,
    };
  },
});
</script>

<style scoped>
.chat-box {
  display: flex;

  flex-direction: column;

  justify-content: space-between;

  position: relative;

  width: 680px;

  height: 600px;

  margin: 0 auto;

  padding: 10px 20px;

  border: 1px solid #dcdfe6;

  border-radius: 5px;

  background-color: #fff;
}

.chat-history {
  max-height: 500px;

  overflow-y: auto;

  margin-bottom: 10px;
}

.message-bubble {
  display: flex;

  align-items: center;

  margin-bottom: 10px;

  padding: 10px;

  border-radius: 15px;

  max-width: 60%;

  width: fit-content;
}

.message-bubble.user {
  align-self: flex-end;

  /* 用户消息右对齐 */

  margin-left: auto;

  /* 用户消息向右侧移动 */
}

.message-bubble.system {
  align-self: flex-start;

  /* AI 消息左对齐 */
}

.message-content.user {
  display: flex;

  flex-direction: column;

  align-items: end;
}

.message-content p {
  margin: 0;

  /* 去掉段落的默认边距 */
}

.message-card {
  margin-bottom: 10px;
}

.input-box {
  margin-right: 10px;
}
</style>
