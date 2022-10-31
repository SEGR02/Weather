import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  function ChangeTemp(){
    isCelsius(!celsius)
  }

  const [data, setData] = useState(0)
  const [celsius, isCelsius] = useState(true);
  let icon = data.weather?.[0].icon;
  let celsiusDegrees = (data.main?.temp - 273.15).toFixed(2);
  let fahrenheitDegrees = ((celsiusDegrees*9/5)+32).toFixed(2);
  var d = new Date((new Date().getTime()))
  d.toISOString()
  

  useEffect(() => {

    navigator.geolocation.getCurrentPosition((pos)=> {
    const latText = pos.coords.latitude;
    const longText = pos.coords.longitude;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latText}&lon=${longText}&appid=de58298c2585f914831314e38ce2b7a1`)
    .then((res) => setData(res.data));
  });

  }, [])

  console.log(data);
  console.log(d);

  return (
    <>
      <div className="container-weather">
        <div className="card-weather">
          <div className="card-title">
            <h1>Weather App</h1>
            <h2>{data.name}, {data.sys?.country}</h2>
            <p className='title-weather'>{data.weather?.[0].description}</p>
            <p className='celsius-fahrenheit'>
              {celsius ? celsiusDegrees : fahrenheitDegrees}
              {celsius ? " °C" : ' °F'}
              </p>
          </div>
          <div className="card-data">
            <div className="card-img">
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather"/>
            </div>
            <div className="card-features">
                <p>Wind speed: {data.wind?.speed} m/s</p>
                <p>Clouds: {data.clouds?.all}%</p>
                <p>Pressure: {data.main?.pressure} mb</p>
            </div>
          </div>
          <div className="button">
            <button onClick={ChangeTemp}>{celsius ? "Change to °F" : "Change to °C"}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App