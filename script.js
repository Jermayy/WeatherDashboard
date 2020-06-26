const searchInput = $('#searchCity');
const searchBtn = $('#submitBtn');
const currentCity = $("#currentCity");
const currentTemp = $("#currentTemp");
const currentHumidity = $("#currentHumidity");
const currentWind = $("#currentWind");
const currentUV = $("#currentUV");

let coordinates = "";

searchBtn.on('click', function(event) {
    event.preventDefault();
    searchCityCoordinates();
})

function searchCityCoordinates() {

    let searchValue = searchInput.val();
    const apiKey = "724e98b55891110350e3c7d68a2fcece";

    const queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + searchValue + "&appid=" + apiKey;

    console.log(searchValue);
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.coord.lat);
        console.log(response.coord.lon);

        let UTC = response.dt;
        let d = new Date(0);
        d.setUTCSeconds(UTC);
        console.log(d);

        currentCity.text(response.name + " - " + d.toString().slice(3, 15));


        coordinates = "lat=" + response.coord.lat + "&lon=" + response.coord.lon;

        searchWeather(coordinates);

    })

}


function searchWeather(x) {

    const apiKey = "724e98b55891110350e3c7d68a2fcece";
    const queryURL2 = "https:api.openweathermap.org/data/2.5/onecall?" + x + "&appid=" + apiKey;

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response) {
        console.log(response);


    })
}
// // Date and Forecast
// https:api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&
//     // exclude={part}&appid={YOUR API KEY}




// const tempF = (response.main.temp - 273.15) * 1.80 + 32;
// const tempC = (tempF - 32) * (5 / 9);

// console.log(tempF.toFixed(2));
// console.log(tempC.toFixed(2));

// const humidity = response.main.humidity;
// const windSpeed = response.wind.speed;
// const UV = //need to use One Call API from Open Weather Map API


//     currentTemp.text("Temperature: " + tempC.toFixed(2) + " °C");