export default function getFormValues(form: HTMLFormElement): Record<string, any> {
  const result: Record<string, any> = {};
  for (let i = 0; i < form.elements.length; i++) {
    const { tagName, name, value } = form.elements[i] as HTMLInputElement;
    if (tagName === 'INPUT') {
      result[name] = value;
    }
  }
  return result;
}
