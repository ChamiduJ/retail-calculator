export type CalculatorFormData = {
  quantity: number
  pricePerItem: number
  region: string
}

export type CalculatedPrices = {
  subTotal: number
  discount: number
  tax: number
  totalWithDiscount: number
  totalWithTax: number
}
