import { useState } from 'react'
import Calculator from './Components/Calculator/Calculator'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Retail Calculator
        </h1>

        <Calculator />
      </div>
    </>
  )
}

export default App
