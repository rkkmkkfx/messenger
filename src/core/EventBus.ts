export default class EventBus<State> {
  listeners?: Record<string, ((...args: State[]) => void)[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: State[]) => void): void {
    if (this.listeners) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
    }
  }

  off(event: string, callback: (...args: State[]) => void): void {
    if (this.listeners) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback,
      );
    }
  }

  emit(event: string, ...args: State[]): void {
    if (this.listeners) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event].forEach((listener) => listener(...args));
    }
  }
}
