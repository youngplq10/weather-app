import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {
    //Configure your openweathermap.org API key
    const apiKey = "YOUR API KEY"

    //Handle changes from city input field
    const [change, setChange] = useState(null)

    const handleChange = (event) => {
        setChange(event.target.value)
    }

    //Log all data from API response
    const logWeather = (res) => {
        const pressure = res.data.main.pressure + " hPa" //Pressure in hPa
        const temp = Math.round(res.data.main.temp-273.15) + " C" //Temperature convert from kelvin to celcius
        const temp_max = Math.round(res.data.main.temp_max-273.15) + " C" //Temperature convert from kelvin to celcius
        const temp_min = Math.round(res.data.main.temp_min-273.15) + " C" //Temperature convert from kelvin to celcius
        const wind = res.data.wind.speed //Wind speed in m/s
        let desc = res.data.weather[0].description //Description of current weather
        const descFixed = desc.charAt(0).toUpperCase() + desc.slice(1) //Set first character to uppercase

        document.getElementById("weather-data").innerHTML = "" +
            "<span>"+descFixed+"</span><br/>"+
            "<span>Pressure: "+pressure+"</span><br/>"+
            "<span>Temp.: "+temp+"</span><br/>"+
            "<span>Temp. min.: "+temp_min+"</span><br/>"+
            "<span>Temp. max.: "+temp_max+"</span><br/>"+
            "<span>Wind: "+wind+" m/s</span>"
    }

    //Call API, and get response, then call logWeather function
    const callAPI = (event) => {
        event.preventDefault()
        const api = "https://api.openweathermap.org/data/2.5/weather?q="+change+"&appid="+apiKey

        axios.get(api).then(res=> logWeather(res))
    }

    //Return app view
    return (
        <div>
            <form onSubmit={callAPI}>
                <label htmlFor="city-input">Enter your city</label> <br/>
                <input type="text" id="city-input" onChange={handleChange}/><br/>
                <input type="submit" value="Check" />
            </form>
            <div id="weather-data"></div>
        </div>
  );
}

export default App;
