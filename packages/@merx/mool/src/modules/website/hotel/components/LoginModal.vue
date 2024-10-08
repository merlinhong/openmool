<template>
  <el-dialog :visible.sync="isOpen" title="登录" @close="$emit('close')" :close-on-click-modal="false">
    <el-form @submit.prevent="handleSubmit">
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input type="email" v-model="email" required></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="password" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">{{ isLogin ? '登录' : '注册' }}</el-button>
        <el-button @click="toggleMode">{{ isLogin ? '注册新账号' : '已有账号？登录' }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits(['close']);

const isLogin = ref(true);
const email = ref('');
const password = ref('');

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};

const handleSubmit = () => {
  console.log(isLogin.value ? '登录' : '注册', email.value, password.value);
  emit('close');
};
</script>

<style scoped>
/* 可以添加一些样式来美化模态框 */
</style>