import { getCurrentInstance, Ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBrowser } from "./browser";
import { useMitt } from "./mitt";

export function useRefs() {
	const refs = reactive<{ [key: string]: any }>({});

	function setRefs(name: string) {
		return (el: any) => {
			refs[name] = el;
			return () => refs[name];
		};
	}

	return { refs, setRefs };
}

export function useParent(name: string, r: Ref) {
	const d = getCurrentInstance();

	if (d) {
		let parent = d.proxy?.$.parent;

		if (parent) {
			while (parent && parent.type?.name != name) {
				parent = parent?.parent;
			}

			if (parent) {
				if (parent.type.name == name) {
					r.value = parent.exposed;
				}
			}
		}
	}

	return r;
}

export function useMool() {
	return {
		route: useRoute(),
		router: useRouter(),
		mitt: useMitt(),
		...useBrowser(),
		...useRefs()
	};
}

export * from "./browser";
export * from "./hmr";
export * from "./mitt";
export * from "./drag";
export * from "./locale";
export * from "./loading";


