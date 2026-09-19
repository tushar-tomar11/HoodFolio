import type { DeepReadonly, Ref } from 'vue';

export type ToastKind = 'success' | 'error' | 'info';

export interface ToastItem {
  id: number;
  message: string;
  type: ToastKind;
}

export interface ToastApi {
  dismiss: (id: number) => void;
  show: (message: string, type?: ToastKind, duration?: number) => void;
  toasts: DeepReadonly<Ref<ToastItem[]>>;
}

const toasts = ref<ToastItem[]>([]);
const timers = new Map<number, ReturnType<typeof setTimeout>>();
let seq = 0;

function dismiss(id: number): void {
  const timer = timers.get(id);
  if (timer)
    clearTimeout(timer);
  timers.delete(id);
  toasts.value = toasts.value.filter(item => item.id !== id);
}

function show(message: string, type: ToastKind = 'info', duration = 4000): void {
  const id = ++seq;
  toasts.value = [...toasts.value, { id, message, type }].slice(-3);
  timers.set(id, setTimeout(() => {
    dismiss(id);
  }, duration));
}

export function useToast(): ToastApi {
  return {
    dismiss,
    show,
    toasts: readonly(toasts),
  };
}
