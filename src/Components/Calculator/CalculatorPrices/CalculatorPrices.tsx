import type { FC } from 'react'

import type { CalculatedPrices } from '../calculator.types'

import s from './styles.module.scss'

type CalculatedPricesProps = {
  prices: CalculatedPrices | null
}

const CalculatorPrices: FC<CalculatedPricesProps> = ({ prices }) => {
  if (!prices) {
    return null
  }

  return (
    <div className={s.CalculatorPrices}>
      <h2>Order Summary</h2>
      <p>
        Subtotal: <strong>{prices.subTotal}</strong>
      </p>
      <p>
        Discount: <strong>{prices.discount}</strong>
      </p>
      <p>
        Tax: <strong>{prices.tax}</strong>
      </p>
      <p>
        Total: <strong>{prices.totalWithTax}</strong>
      </p>
    </div>
  )
}
export default CalculatorPrices
