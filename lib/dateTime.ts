export function DateTime(str: string) {
  return str.replace("T", " ").substring(0, 16);
}
