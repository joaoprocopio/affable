import { isDate } from "~/utils/validators"

const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte", "petabyte"]

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 bytes"

  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1000)), units.length - 1)
  const unit = units[index]

  return new Intl.NumberFormat(undefined, {
    style: "unit",
    unit: unit,
    maximumFractionDigits: 1,
  }).format(bytes / 1000 ** index)
}

export function formatCurrency(value: number, currency: string = "USD"): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function pluralize(
  n: number,
  rules: Partial<Record<Intl.LDMLPluralRule, string>>,
  options?: Intl.PluralRulesOptions,
): string | undefined {
  return rules[new Intl.PluralRules(undefined, options).select(n)]
}

export function formatDate(
  value: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  },
): string {
  const date = isDate(value) ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  return new Intl.DateTimeFormat(undefined, options).format(date)
}

export function formatDateTime(
  value: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  },
): string {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  return new Intl.DateTimeFormat(undefined, options).format(date)
}

export function formatDateRange(
  start?: string | number | Date | null,
  end?: string | number | Date | null,
  options?: Intl.DateTimeFormatOptions,
): string {
  if (!start && !end) {
    return "-"
  }

  const startLabel = start ? formatDate(start, options) : ""
  const endLabel = end ? formatDate(end, options) : ""

  if (startLabel && endLabel) {
    return `${startLabel} - ${endLabel}`
  }

  return startLabel || endLabel
}
