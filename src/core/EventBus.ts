export default class EventBus {
  listeners?: Record<string, ((...args: ComponentProps[]) => void)[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: ComponentProps[]) => void): void {
    if (this.listeners) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
    }
  }

  off(event: string, callback: (...args: ComponentProps[]) => void): void {
    if (this.listeners) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback,
      );
    }
  }

  emit(event: string, ...args: ComponentProps[]): void {
    if (this.listeners) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event].forEach((listener) => listener(...args));
    }
  }
}
