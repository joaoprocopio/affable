const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte", "petabyte"]

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 bytes"

  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1000)), units.length - 1)
  const unit = units[index]

  return new Intl.NumberFormat(undefined, {
    style: "unit",
    unit,
    maximumFractionDigits: 1,
  }).format(bytes / 1000 ** index)
}
