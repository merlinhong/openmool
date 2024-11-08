export default () => {
	return {
		components: [
			// 代码编辑器 https://www.npmjs.com/package/monaco-editor
			() => import("./components/monaco.vue")
		],
	};
};
