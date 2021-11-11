export default class EventBus<Props> {
  listeners?: Record<string, ((...args: Props[]) => void)[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: Props[]) => void): void {
    if (this.listeners) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
    }
  }

  off(event: string, callback: (...args: Props[]) => void): void {
    if (this.listeners) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback,
      );
    }
  }

  emit(event: string, ...args: Props[]): void {
    if (this.listeners) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event].forEach((listener) => listener(...args));
    }
  }
}
