let weather = {
    "apikey": "8c977006aae4e0608f54f8edaac4dbc8",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metrics&appid=" 
        + this.apikey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity }= data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description").innerText  =description;
        document.querySelector(".temp").innerText = ((temp - 273).toFixed(0)) + "°";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".imperial").addEventListener("click", function() {
            document.querySelector(".temp").innerText = (((temp - 273) * 1.8 + 32).toFixed(0)) + "°";
            document.querySelector(".wind").innerText = "Wind Speed: " + ((speed / 1.609).toFixed(2)) + " mph";
        });
        document.querySelector(".metric").addEventListener("click", function() {
            document.querySelector(".temp").innerText = ((temp - 273).toFixed(0)) + "°";
            document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        });
        document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
        
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        weather.search();
    }
});
