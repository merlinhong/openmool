<template>
  <div class="chat-box">
    <div class="chat-history" ref="chatHistory">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message-bubble', message.role]"
      >
        <div :class="['message-content', message.role]">
          <span>
            <el-icon
              v-if="message.role === 'user'"
              style="width: 25px; height: 25px; vertical-align: text-top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                style="width: 100%; height: 100%"
              >
                <path
                  fill="#FF9800"
                  d="M22 38c-4.8 0-5-7-5-7v-6h10v6s-.2 7-5 7"
                />

                <g fill="#FFA726">
                  <circle cx="31" cy="19" r="2" />

                  <circle cx="13" cy="19" r="2" />
                </g>

                <path
                  fill="#FFB74D"
                  d="M31 13c0-7.6-18-5-18 0v7c0 5 4 9 9 9s9-4 9-9z"
                />

                <path
                  fill="#424242"
                  d="M22 4c-6.1 0-10 4.9-10 11v2.3l2 1.7v-5l12-4l4 4v5l2-1.7V15c0-4-1-8-6-9l-1-2z"
                />

                <g fill="#784719">
                  <circle cx="26" cy="19" r="1" />

                  <circle cx="18" cy="19" r="1" />
                </g>

                <path
                  fill="#009688"
                  d="M27 31s-1.8 2-5 2s-5-2-5-2S6 33 6 44h32c0-11-11-13-11-13"
                />

                <g fill="#FF9800">
                  <path d="m40.997 4.065l7 7l-7 6.999l-7-7z" />

                  <path d="M36 6h10v10H36z" />
                </g>

                <circle cx="41" cy="11" r="3" fill="#FFEB3B" />
              </svg>
            </el-icon>

            <el-icon
              v-if="message.role === 'system'"
              style="width: 25px; height: 25px; vertical-align: text-top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style="width: 100%; height: 100%"
              >
                <path
                  fell="currentColor"
                  d="M13.5 2c0 .444-.193.843-.5 1.118V5h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h5V3.118A1.5 1.5 0 1 1 13.5 2M6 7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-4 3H0v6h2zm20 0h2v6h-2zM9 14.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                />
              </svg>
            </el-icon>
          </span>

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
                <TypedMessage
                  v-if="message.typed"
                  :message="message"
                  :id="`typed-message${index}`"
                />

                <p v-if="!message.typed">{{ message.content }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex">
      <el-select style="width: 200px" v-model="model" placeholder="请选择模型">
        <el-option label="gpt-3.5-turbo" value="gpt-3.5-turbo"></el-option>

        <el-option
          label="gpt-3.5-turbo-0125"
          value="gpt-3.5-turbo-0125"
        ></el-option>

        <el-option label="gpt-4o-mini" value="gpt-4o-mini"></el-option>

        <el-option label="gpt-4o" value="gpt-4o"></el-option>
      </el-select>

      <el-input
        v-model="userInput"
        placeholder="输入你的消息..."
        @keyup.enter="sendMessage"
        class="input-box"
      />

      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, nextTick, defineModel } from "vue";

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

  name: "ChatBox",

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

    const userInput = ref("");

    const isTyped = ref(false);

    const Schema = ref("");

    let extra = ""; // 额外的输入描述

    const messages = ref<Record<string, any>[]>([
      {
        role: "system",

        content:
          "你好！有什么我可以帮助你的吗？我可以为你绑定v-model变量等其他变量(需要您提供变量名)",

        name: "AI",

        typed: false,
      },
    ]);

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

      if (!Object.keys(props.schema).length)
        return messages.value.push({
          role: "system",

          content: "请先选择一个组件",

          typed: false,
        });
      if (props.schema.componentName == "Box" && input.includes("表单")) {
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
            return
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
            messages.value[messages.value.length - 1].content =
              "正在绑定变量...请稍等";

            scrollToBottom();
          },

          second * 2 + Math.random() * 10 * 500
        );

        setTimeout(
          () => {
            messages.value[messages.value.length - 1].content = "解析中...";

            scrollToBottom();
          },

          second + Math.random() * 10 * 500
        );
      }

      fecthAi(input, "", "");
      // 滚动到最新消息

      scrollToBottom();

      console.log(props.schema);

      // 调用 AI 回复
    };

    const fecthAi = (prompt: string, extra?: string, desc = "绑定完成") => {
      fetch("/api/ai/chat", {
        method: "post", // 或 'GET', 'PUT', 'DELETE', 等

        body: JSON.stringify({
          messages:
            `请分析当前组件schema：${JSON.stringify(props.schema)}\n` +
            prompt +
            extra,
          foundationModel: {
            model: model.value,
          },
        }),

        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((res) => {
          if (res.data.success === false) {
            return (messages.value[messages.value.length - 1].content =
              "解析失败");
          }

          messages.value[messages.value.length - 1].content = desc;

          scrollToBottom();

          emit("update:schema", res.data);
        })

        .catch((error) => {
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
