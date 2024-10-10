import { useUserStore } from './auth';
import { useOtherStore } from './other';
import { useCanvasStore } from './canvas';

export function useStore() {
  const user = useUserStore();
  const other = useOtherStore();
  const canvas = useCanvasStore();

  return {
    user,
    other,
    canvas
  };
}