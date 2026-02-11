import CalculatorForm from './CalculatorForm/CalculatorForm'
import CalculatorPrices from './CalculatorPrices/CalculatorPrices'

const mocklPrices = {
  subTotal: 100,
  discount: 0,
  tax: 10,
  totalWithDiscount: 100,
  totalWithTax: 110,
}

const Calculator = () => (
  <>
    <CalculatorForm onSubmit={() => {}} />
    <CalculatorPrices prices={mocklPrices} />
  </>
)

export default Calculator
