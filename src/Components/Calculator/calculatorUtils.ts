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

const calculateTax = (total: number, region: string, rates: TaxRates): number => 0

export const calculate = (
  formData: CalculatorFormData,
  sortedDiscountRates: DiscountRate[],
  taxRates: TaxRates,
): CalculatedPrices => {
  const subTotal = formData.pricePerItem * formData.quantity
  const discount = calculateDiscount(subTotal, sortedDiscountRates)
  const totalWithDiscount = subTotal - discount
  const tax = calculateTax(totalWithDiscount, formData.region, taxRates)
  const totalWithTax = totalWithDiscount + tax

  return {
    subTotal,
    discount,
    tax,
    totalWithDiscount,
    totalWithTax,
  }
}

export const formatToCurrency = (amount: number) => amount.toFixed(2)
