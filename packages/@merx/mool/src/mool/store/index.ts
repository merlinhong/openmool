import {useUserStore} from './auth';
import {useOtherStore} from './other';
export function useStore() {
  const user = useUserStore();
  const other = useOtherStore();
  return {
    user,
    other
  };
}