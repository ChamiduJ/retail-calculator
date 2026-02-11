import type { DiscountRate, TaxRates } from './calculator.types'

export const sortedDiscountRates: DiscountRate[] = [
  { value: 1000, percentage: 3 },
  { value: 5000, percentage: 5 },
  { value: 7000, percentage: 7 },
  { value: 10000, percentage: 10 },
  { value: 50000, percentage: 15 },
]

export const taxRates: TaxRates = {
  AUK: 0.0685,
  WLG: 0.08,
  WAI: 0.0625,
  CHC: 0.04,
  TAS: 0.0825,
}
