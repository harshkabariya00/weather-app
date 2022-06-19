// const apiKey = "e27eade45aa6d8de734c17038db3388e";
// const base =
//   "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}";

const app = {
  init: () => {
    //Task 1:
    //TODO: Add event Listener for app.fetchWeather and app.getLocation
    const getWeather = document
      .querySelector("#btnGet")
      .addEventListener("click", app.fetchWeather);

    const getLocation = document
      .querySelector("#btnCurrent")
      .addEventListener("click", app.getLocation);
  },
  fetchWeather: (ev) => {
    //use the values from latitude and longitude to fetch the weather
    //TODO: get lat value from id = latitude input
    let lat = document.getElementById("latitude").value;
    //TODO: get lon value from id = longitude input
    let lon = document.getElementById("longitude").value;
    //Add your Key for the API Call
    let key = "e27eade45aa6d8de734c17038db3388e";
    let lang = "en";
    let units = "metric";
    //Create URL from the API document to get weather Data
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

    //TODO:fetch the weather
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw Error(resp.statusText); //TODO:If !response.ok throw error and print in console.err
        return resp.json();
      })
      .then((data) => {
        app.showWeather(data);
      })
      .catch(console.err);

    //TODO:call fetch.then.the.catch method of javascript

    //TODO:If everything is okay call   app.showWeather
  },
  getLocation: (ev) => {
    //TODO:Add options for navigator.geolocation.getCurrentPosition method
    let options = {
      enableHighAccurancy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, options);
    //TODO: call  navigator.geolocation.getCurrentPosition to get current location and use callback function app.ftw and app.wtf
  },
  ftw: (position) => {
    //got position
    document.querySelector("#latitude").value =
      position.coords.latitude.toFixed(2);
    //TODO:set position.coords.latitude value to the input id='latitude' of HTML
    document.querySelector("#longitude").value =
      position.coords.longitude.toFixed(2);
    //TODO:set position.coords.longitude value to the input id='longitude'of HTML
  },
  wtf: (err) => {
    //geolocation failed
    console.error(err);
    //TODO:console.error the err value
  },
  showWeather: (resp) => {
    //console.log(resp);

    //Get the row from the HTML using querySelector
    let row = document.querySelector(".weather.row");
    //row.innerHTML = "";
    row.innerHTML = resp.daily
      .map((day, index) => {
        //TODO: map resp.daily Array.
        if (index <= 2) {
          //TODO: If resp.daily has more then 3 values print only first 3 values. else print all Values.
          let date = new Date(day.dt * 1000);
          let sunRise = new Date(day.sunrise * 1000).toTimeString();
          let sunSet = new Date(day.sunset * 1000).toTimeString();
          return `<div class="col">
              <div class="card">
              <h5 class="card-title p-2">${date.toDateString()}</h5>
                <img
                  src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@4x.png"
                  class="card-img-top"
                  alt="${day.weather[0].description}"
                />
                <div class="card-body">
                  <h3 class="card-title">${day.weather[0].main}</h3>
                  <p class="card-text">High ${day.temp.max}&deg;C Low ${
            day.temp.min
          }&deg;C</p>
                  <p class="card-text">High Feels like ${
                    day.feels_like.day
                  }&deg;C</p>
                  <p class="card-text">Pressure ${day.pressure}mb</p>
                  <p class="card-text">Humidity ${day.humidity}%</p>
                  <p class="card-text">UV Index ${day.uvi}</p>
                  <p class="card-text">Precipitation ${day.pop * 100}%</p>
                  <p class="card-text">Dewpoint ${day.dew_point}</p>
                  <p class="card-text">Wind ${day.wind_speed}m/s, ${
            day.wind_deg
          }&deg;</p>
                  <p class="card-text">Sunrise ${sunRise}</p>
                  <p class="card-text">Sunset ${sunSet}</p>
                </div>
              </div>
            </div>
          </div>`;
        }
      })
      .join(" ");

    //clear out the old weather and add the new

    //TODO:The Card should show image from day.weather[0].icon. url for image is src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
    //TODO:All other Data  of Card should look as per the README.md ScreenShort.
  },
};

app.init();
