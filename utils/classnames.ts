export function classnames(...names: Array<string | boolean>) {
  return names.filter((s) => typeof s == "string").join(" ");
}
