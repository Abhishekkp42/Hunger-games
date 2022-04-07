import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import RestaurantDetails from './components/RestaurantDetails'

function App() {
  const [count, setCount] = useState(10)

  return (
    <div className="App">
      <h1>Counter: {count}</h1>
      <RestaurantDetails />
    </div>
  )
}

export default App
