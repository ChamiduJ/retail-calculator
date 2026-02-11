import { useState } from 'react'

import CalculatorForm from './CalculatorForm/CalculatorForm'
import CalculatorPrices from './CalculatorPrices/CalculatorPrices'

import { calculate } from './calculatorUtils'

import type { CalculatedPrices, CalculatorFormData } from './calculator.types'

import { sortedDiscountRates, taxRates } from './rates'

const Calculator = () => {
  const [prices, setPrices] = useState<CalculatedPrices | null>(null)

  const handleSubmit = (formData: CalculatorFormData) => {
    setPrices(calculate(formData, sortedDiscountRates, taxRates))
  }

  return (
    <>
      <CalculatorForm onSubmit={handleSubmit} />
      <CalculatorPrices prices={prices} />
    </>
  )
}

export default Calculator
