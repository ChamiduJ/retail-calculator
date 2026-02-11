import type { FC } from 'react'
import s from './styles.module.scss'

export type CalculatedPrices = {
  subTotal: number
  discount: number
  tax: number
  totalWithDiscount: number
  totalWithTax: number
}

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
