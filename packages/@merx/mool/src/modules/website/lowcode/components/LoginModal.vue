<template>
  <el-dialog
    v-model="isOpen"
    title="登录"
    @close="$emit('close')"
    :close-on-click-modal="false"
    width="400px"
    class="login-modal !bg-white/30 !backdrop-blur-2xl !rounded-xl !shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] !border !border-white/18"
    append-to-body
  >
    <div class="flex justify-between items-center mb-6">
      <span class="text-2xl font-semibold text-gray-800">登录</span>
      <el-button class="text-sm text-blue-600 hover:text-blue-800" text @click="toggleQRCode">
        {{ showQRCode ? "返回登录" : "扫码登录" }}
      </el-button>
    </div>
    <el-form @submit.prevent="handleSubmit" class="space-y-4">
      <template v-if="!showQRCode">
        <el-form-item>
          <el-input v-model="email" type="email" placeholder="邮箱" required class="!bg-white/50 !border !border-white/30 !rounded-lg !shadow-inner"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="密码" required class="!bg-white/50 !border !border-white/30 !rounded-lg !shadow-inner"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full h-10 !bg-blue-600 hover:!bg-blue-700 !border-blue-600 !rounded-lg !shadow-md" @click="handleSubmit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full h-10 !bg-white/50 hover:!bg-white/60 !text-gray-800 !border-white/30 !rounded-lg !shadow-md" @click="toggleMode">注册新账号</el-button>
        </el-form-item>
      </template>
      <el-form-item v-else class="text-center">
        <qrcode-vue :value="qrCodeUrl" :size="200" level="H" />
        <p class="mt-4 text-gray-600">请使用移动端扫码登录</p>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = defineModel<boolean>("isOpen", { required: true });

const emit = defineEmits(["close", "update:isOpen"]);

const isLogin = ref(true);
const email = ref("");
const password = ref("");
const showQRCode = ref(false);
const qrCodeUrl = ref("https://example.com/qrcode"); // 替换为实际的二维码 URL

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};

const toggleQRCode = () => {
  showQRCode.value = !showQRCode.value;
};

const handleSubmit = () => {
  console.log(isLogin.value ? "登录" : "注册", email.value, password.value);
  emit("update:isOpen", false);
};
</script>

<style scoped>
.login-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
  filter: blur(10px);
  border-radius: inherit;
}

.login-modal > * {
  position: relative;
  z-index: 1;
}
</style>
