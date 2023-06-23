export default function replaceCommaWithDot(values: string[]): number[] {
  return values.map((value) => Number(value.replace(/,/g, '.')))
}
