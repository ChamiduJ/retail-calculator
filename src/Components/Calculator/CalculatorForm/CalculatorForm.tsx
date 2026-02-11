import { useState, type FC, type SubmitEvent } from 'react'
import s from './styles.module.scss'

type CalculatorFormData = {
  quantity: number
  pricePerItem: number
  region: string
}

type CalculatorFormProps = {
  onSubmit: (data: CalculatorFormData) => void
}

const CalculatorForm: FC<CalculatorFormProps> = ({ onSubmit }) => {
  const [quantity, setQuantity] = useState<number>(0)
  const [pricePerItem, setPricePerItem] = useState<number>(0)
  const [region, setRegion] = useState<string>('')

  const handleCalculate = (event: SubmitEvent) => {
    event.preventDefault()
    onSubmit({
      quantity,
      pricePerItem,
      region,
    })
  }

  return (
    <form onSubmit={handleCalculate} className={s.calculatorForm}>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value ?? 0))}
          placeholder="Quantity"
          required
        />
      </div>

      <div>
        <label htmlFor="price">Price per Item ($)</label>
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={pricePerItem}
          onChange={(e) => setPricePerItem(Number(e.target.value ?? 0))}
          placeholder="Price per Item ($)"
          required
        />
      </div>

      <div>
        <label htmlFor="region">Region</label>
        <select
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a region
          </option>
          <option value="AUK">Auckland (AUK)</option>
          <option value="WLG">Wellington (WLG)</option>
          <option value="WAI">Waikato (WAI)</option>
          <option value="CHC">Christchurch (CHC)</option>
          <option value="TAS">Tasman (TAS)</option>
        </select>
      </div>

      <button type="submit">Calculate</button>
    </form>
  )
}

export default CalculatorForm
