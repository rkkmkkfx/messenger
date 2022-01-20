export default function structuredClone<T>(obj: T): Promise<T> {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (event) => resolve(event.data);
    port1.postMessage(obj);
  });
}
