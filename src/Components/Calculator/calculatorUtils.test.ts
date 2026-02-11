import { describe, expect, it } from 'vitest'
import { calculate, formatToCurrency } from './calculatorUtils'
import type { CalculatorFormData, DiscountRate, TaxRates } from './calculator.types'

const discountRates: DiscountRate[] = [
  { value: 1000, percentage: 3 },
  { value: 5000, percentage: 5 },
  { value: 7000, percentage: 7 },
  { value: 10000, percentage: 10 },
  { value: 50000, percentage: 15 },
]

const sortedDiscountRates = [...discountRates].sort((a, b) => b.value - a.value)

const taxRates: TaxRates = {
  AUK: 0.0685,
  WLG: 0.08,
  WAI: 0.0625,
  CHC: 0.04,
  TAS: 0.0825,
}

describe('calculator', () => {
  describe('calculate', () => {
    it('handles subtotal below any discount threshold (no discount, no tax for unknown region)', () => {
      const formData: CalculatorFormData = {
        pricePerItem: 100,
        quantity: 9,
        region: 'UNKNOWN',
      }

      const result = calculate(formData, sortedDiscountRates, taxRates)

      expect(result).toEqual({
        subTotal: 900.0,
        discount: 0.0,
        totalWithDiscount: 900.0,
        tax: 0.0,
        totalWithTax: 900.0,
      })
    })

    it('applies 3% discount when subtotal >= 1000 but < 5000 (AUK tax)', () => {
      const formData: CalculatorFormData = {
        pricePerItem: 100,
        quantity: 10,
        region: 'AUK',
      }

      const result = calculate(formData, sortedDiscountRates, taxRates)

      expect(result).toEqual({
        subTotal: 1000.0,
        discount: 30.0,
        totalWithDiscount: 970.0,
        tax: 66.45,
        totalWithTax: 1036.45,
      })
    })

    it('applies 5% discount when subtotal >= 5000 but < 7000', () => {
      const formData: CalculatorFormData = {
        pricePerItem: 100,
        quantity: 60,
        region: 'WLG',
      }

      const result = calculate(formData, sortedDiscountRates, taxRates)

      expect(result).toEqual({
        subTotal: 6000.0,
        discount: 300.0,
        totalWithDiscount: 5700.0,
        tax: 456.0,
        totalWithTax: 6156.0,
      })
    })

    it('applies 7% discount when subtotal >= 7000 but < 10000', () => {
      const formData: CalculatorFormData = {
        pricePerItem: 150,
        quantity: 50,
        region: 'CHC',
      }

      const result = calculate(formData, sortedDiscountRates, taxRates)

      expect(result).toEqual({
        subTotal: 7500.0,
        discount: 525.0,
        totalWithDiscount: 6975.0,
        tax: 279.0,
        totalWithTax: 7254.0,
      })
    })

    it('applies 10% discount when subtotal >= 10000 but < 50000', () => {
      const formData: CalculatorFormData = {
        pricePerItem: 200,
        quantity: 100,
        region: 'TAS',
      }

      const result = calculate(formData, sortedDiscountRates, taxRates)

      expect(result).toEqual({
        subTotal: 20000.0,
        discount: 2000.0,
        totalWithDiscount: 18000.0,
        tax: 1485.0,
        totalWithTax: 19485.0,
      })
    })

    it('applies 15% discount when subtotal >= 50000', () => {
      const formData: CalculatorFormData = {
        pricePerItem: 100,
        quantity: 500,
        region: 'AUK',
      }

      const result = calculate(formData, sortedDiscountRates, taxRates)

      expect(result).toEqual({
        subTotal: 50000.0,
        discount: 7500.0,
        totalWithDiscount: 42500.0,
        tax: 2911.25,
        totalWithTax: 45411.25,
      })
    })

    it('handles zero quantity', () => {
      const formData: CalculatorFormData = {
        pricePerItem: 100,
        quantity: 0,
        region: 'AUK',
      }

      const result = calculate(formData, sortedDiscountRates, taxRates)

      expect(result).toEqual({
        subTotal: 0.0,
        discount: 0.0,
        totalWithDiscount: 0.0,
        tax: 0.0,
        totalWithTax: 0.0,
      })
    })

    it('handles unknown region (tax = 0)', () => {
      const formData: CalculatorFormData = {
        pricePerItem: 100,
        quantity: 20,
        region: 'XYZ',
      }

      const result = calculate(formData, sortedDiscountRates, taxRates)

      expect(result).toEqual({
        subTotal: 2000.0,
        discount: 60.0,
        totalWithDiscount: 1940.0,
        tax: 0.0,
        totalWithTax: 1940.0,
      })
    })
  })

  describe('formatToCurrency', () => {
    it('formats numbers correctly with two decimal places', () => {
      expect(formatToCurrency(100)).toBe('100.00')
      expect(formatToCurrency(123.4)).toBe('123.40')
      expect(formatToCurrency(56.789)).toBe('56.79')
      expect(formatToCurrency(0)).toBe('0.00')
      expect(formatToCurrency(999.995)).toBe('1000.00')
    })
  })
})
