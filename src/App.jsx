import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Clima from './components/Clima'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Clima/>
    </div>
  )
}

export default App
