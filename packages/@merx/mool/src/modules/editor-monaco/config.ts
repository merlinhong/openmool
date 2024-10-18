export default () => {
	return {
		components: [
			// 依赖偏大，现用于“ai编码页面”，如不需要请注释组件
			// 代码编辑器 https://www.npmjs.com/package/monaco-editor
			() => import("./components/monaco.vue")
		],
	};
};
