export default function replaceDotWithComma(value: number): string {
  return value.toString().replace(/\./g, ',');
}
