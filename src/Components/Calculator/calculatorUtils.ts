import type {
  CalculatorFormData,
  CalculatedPrices,
  DiscountRate,
  TaxRates,
} from './calculator.types'

const calculateDiscount = (
  total: number,
  sortedDiscountRates: DiscountRate[],
): number => {
  const discountRate = sortedDiscountRates.find((rate) => total >= rate.value)

  if (!discountRate) {
    return 0
  }

  return total * (discountRate.percentage / 100)
}

const calculateTax = (total: number, region: string, rates: TaxRates): number => {
  const rate = rates[region]

  if (!rate) {
    return 0
  }

  return total * rate
}

const roundToCurrency = (amount: number) => Math.round(amount * 100) / 100

export const calculate = (
  formData: CalculatorFormData,
  sortedDiscountRates: DiscountRate[],
  taxRates: TaxRates,
): CalculatedPrices => {
  const subTotal = formData.pricePerItem * formData.quantity
  const discount = calculateDiscount(subTotal, sortedDiscountRates)
  const totalWithDiscount = subTotal - discount
  const tax = calculateTax(totalWithDiscount, formData.region, taxRates)

  return {
    subTotal: roundToCurrency(subTotal),
    discount: roundToCurrency(discount),
    tax: roundToCurrency(tax),
    totalWithDiscount: roundToCurrency(totalWithDiscount),
    totalWithTax: roundToCurrency(totalWithDiscount + tax),
  }
}

export const formatToCurrency = (amount: number) => amount.toFixed(2)
