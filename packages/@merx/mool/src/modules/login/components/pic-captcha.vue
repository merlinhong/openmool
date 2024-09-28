<template>
	<div class="pic-captcha" >
		<div v-if="svg" class="svg" v-html="svg" />
		<img v-else-if="base64" class="base64" :src="base64" alt="" />

		<template v-else-if="isError">
			<el-text type="danger"> 后端未启动 </el-text>
			<el-icon color="#f56c6c" :size="16">
				<warning-filled />
			</el-icon>
		</template>

		<template v-else>
			<el-icon class="is-loading" :size="18">
				<loading />
			</el-icon>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Loading, WarningFilled } from "@element-plus/icons-vue";
import { useMool } from "@/mool";

const emit = defineEmits(["update:modelValue", "change"]);

// 是否异常
const isError = ref(false);

// base64
const base64 = ref("");

// svg
const svg = ref("");


onMounted(() => {
});

defineExpose({
});
</script>

<style lang="less" scoped>
.pic-captcha {
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	height: 45px;
	width: 150px;
	position: relative;
	user-select: none;

	.svg {
		height: 100%;
		position: relative;
	}

	.base64 {
		height: 100%;
	}

	.el-icon {
		position: absolute;
		right: 20px;
	}
}
</style>
