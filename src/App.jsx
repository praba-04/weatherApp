  import './App.css'
  import Proptypes from"prop-types"
  import searchIcon from './assets/searchicon.png'
  import cloudyIcon from './assets/cloudy.png'
  import drizzleIcon from './assets/drizzle.png'
  import waterIcon from './assets/water.png'
  import rainIcon from './assets/rain.png'
  import snowIcon from './assets/snow.png'
  import sunIcon from './assets/sun.png'
  import windIcon from './assets/wind.png'
  import { useEffect, useState } from 'react'

  const Weatherdetails = ({icon,temp,city,country,lat,log,wind,water})=>{
      return(
        <>
        <div className="image">
              <img src={icon} alt='image'/>
        </div>
              <div className='temp'>{temp}°C</div>
              <div className='location'>{city}</div>
              <div className='country'>{country}</div>
              <div className='cord'>
              <div>
                <span className='lat'>Latitude</span>
                <span>{lat}</span>
              </div>
              <div>
                <span className='log'>Logitude</span>
                <span>{log}</span>
              </div>
              </div>
              <div className='data-container'>
                  <div className="element">
                    <div>
                      <img className="icon" src={waterIcon} alt="humidity" />
                    </div>
                    <div className="data">
                      <div className='water-percent'>{water} %</div>
                      <div className="text">Humidity</div>
                    </div>
                  </div>
                  <div className="element">
                    <div>
                      <img className="icon" src={windIcon} alt="humidity" />
                    </div>
                    <div className="data">
                      <div className='wind-percent'>{wind} km/hr</div>
                      <div className="text">Wind Speed</div>
                    </div>
                  </div>
              </div>
              
             
      </>
      )
                                          
  }
  Weatherdetails.Proptypes = {
    icon : Proptypes.string.isRequired,
    city : Proptypes.string.isRequired,
    country : Proptypes.string.isRequired,
    temp : Proptypes.number.isRequired,
    lat : Proptypes.number.isRequired,
    log : Proptypes.number.isRequired,
    water : Proptypes.number.isRequired,
    wind : Proptypes.number.isRequired,
  }

  function App() {
    const api_key = "1b58b511269aadb52c6fe6eb4563b6ef"
    const[icon,setIcon] = useState(snowIcon)
    const[temp,settemp] = useState(0)
    const[city,setCity] = useState("")
    const[country,setCountry] = useState("")
    const[lat,setLat] = useState(0)
    const[log,setLog] = useState(0)
    const[water,setWater] = useState(0)
    const[wind,setWind] = useState(0)
    const[text,setText] = useState("Mayiladuthurai")

    const[cityNotFound,setcityNotFound] = useState(false)
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState(null)

    const weathericon = {
      "01n":sunIcon,
      "01d":sunIcon,
      "02n":cloudyIcon,
      "02d":cloudyIcon,
      "03n":drizzleIcon,
      "03d":drizzleIcon,
      "04n":drizzleIcon,
      "04d":drizzleIcon,
      "09n":rainIcon,
      "09d":rainIcon,
      "10n":rainIcon,
      "10d":rainIcon,
      "11n":snowIcon,
      "11d":snowIcon,
      "13n":snowIcon,
      "13d":snowIcon,
    }

    const search = async()=>{
      setLoading(true)
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`
      
      try{
       let res = await fetch(url)
       let data = await res.json()
       if(data.cod==="404"){
        console.log("city not found")
        setcityNotFound(true)
        setLoading(false)       
       }
       setCountry(data.sys.country)
       setWater(data.main.humidity)
       setWind(data.wind.speed)
       settemp(Math.floor(data.main.temp))
       setLat(data.coord.lat)
       setLog(data.coord.lon)
       setCity(data.name)
       const weatherIconcode = data.weather[0].icon;
        setIcon( weathericon[weatherIconcode] || sunIcon)
        setcityNotFound(false)
      }
      catch{
        console.error("an error is occured",error.message)
        setError("An error is occured during fetching data")
      }
      finally{
        setLoading(false)
       
      }
    
    }

    const handlecity = (e)=>{
        setText(e.target.value)
    }
    const hadlekeydown = (e)=>{
        if(e.key==="Enter"){
          search();
        }
    }
    useEffect(()=>{
      search();
    },[])
    return (
      <>
        <div className="container">
          <div className="input-box">
            <input type="text"
            className='city-input'
            placeholder='Search city' 
            onChange={handlecity} 
            value={text}
            onKeyDown={hadlekeydown}
            />
              <div className="search-icon">
                  <img  src={searchIcon} alt="search" onClick={()=>search()} />
              </div>
          </div>
             
        
              {loading && <div className="loading-message">Loading...</div>}
              {cityNotFound && <div className="city-not-found">City Not Found</div>}
              {error && <div className="error-message">{error}</div>}
              
              { !loading && ! cityNotFound &&  <Weatherdetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} water={water} wind={wind}/>}
              <p className='copyright'>Designed by <span>Prabakaran</span></p>
        </div>
      </>
    )
  }

  export default App
