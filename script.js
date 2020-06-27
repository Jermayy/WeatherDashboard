const searchInput = $('#searchCity');
const searchBtn = $('#submitBtn');
const currentCity = $("#currentCity");
const currentTemp = $("#currentTemp");
const currentHumidity = $("#currentHumidity");
const currentWind = $("#currentWind");
const currentUV = $("#currentUV");
const forecastDiv = $('.forecast');
const searchColumn = $('.searchColumn');

let coordinates = "";

searchBtn.on('click', function(event) {
    event.preventDefault();
    clearForecast();
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

        searchHistory(response.name);
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


        currentTemp.text("Temperature: " + tempConvert(response.current.temp).toFixed(2) + " °C");
        currentHumidity.text("Humidity: " + response.current.humidity + "%");
        currentWind.text("Wind Speed: " + WindConvert(response.current.wind_speed).toFixed(2) + " KPH");
        currentUV.text("UV Index: " + response.current.uvi);

        for (i = 0 + 1; i < 6; i++) {
            let newForecast = $('<div>');
            newForecast.addClass('daily');
            newForecast.attr('id', 'daily-' + i);

            let forecastDate = $('<p>');
            let forecastPic = $('<div>')
            let forecastTemp = $('<p>');
            let forecastHumidity = $('<p>');

            let UTCi = response.daily[i].dt;
            let di = new Date(0);
            di.setUTCSeconds(UTCi);
            console.log(di);

            forecastDate.text(di.toString().slice(3, 15));


            forecastTemp.text('Temp: ' + tempConvert(response.daily[i].temp.day).toFixed(2) + '°C');
            console.log(tempConvert(response.daily[i].temp.day).toFixed(2) + "°C");


            forecastHumidity.text('Humidity: ' + response.daily[i].humidity + "%");
            console.log('Humidity:' + response.daily[i].humidity + "%");



            newForecast.append(forecastDate);
            newForecast.append(forecastPic);
            newForecast.append(forecastTemp);
            newForecast.append(forecastHumidity);


            forecastDiv.append(newForecast);

        }

    })
}


function tempConvert(x) {
    const tempF = (x - 273.15) * 1.80 + 32;
    const tempC = (tempF - 32) * (5 / 9);

    return tempC;
}

function WindConvert(y) {
    const windMPH = y;
    const windKPH = windMPH * 1.6093427125;
    return windKPH;
}


function searchHistory(x) {
    let newHistory = $('<div>');
    newHistory.text(x);
    searchColumn.append(newHistory);

}

function clearForecast() {
    forecastDiv.empty();
    const header = $('<h2>');
    header.text('5 Day Forecast');
    header.attr('id', 'forecastHeader');
    forecastDiv.append(header);

}