// decorators.ts
import { defineComponent, PropType } from "vue";

export function Component(options: any = {}) {
  return function (constructor: any) {
    return defineComponent({
      ...options,
      setup(props, context) {
        const instance = new constructor(props, context);
        return instance;
      },
    });
  };
}

export function Prop(options: any = {}) {
  return function (target: any, key: string) {
    if (!target.props) {
      target.props = {};
    }
    target.props[key] = options;
  };
}

export function Emit(eventName?: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const result = original.apply(this, args);
      this.$emit(eventName || key, result);
      return result;
    };
  };
}
