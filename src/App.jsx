import { useState } from 'react'
import awLogo from './assets/AW_REGISTERED_Horiz_DarkBackground_Logo.png';
import './App.css'
import Weather from './components/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="home">

      <Weather/>


        <footer>
          <p>API by</p>
          <a href='http://www.accuweather.com/' target={"_blank"}>
            <img src={awLogo} alt="Logo de AccuWeather" style={{width: "20%", height:"auto"}} />

          </a>
        </footer>

    </div>
  )
}

export default App
