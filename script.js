const searchInput = $('#searchCity');
const searchBtn = $('#submitBtn');
const currentCity = $("#currentCity");
const currentTemp = $("#currentTemp");
const currentHumidity = $("#currentHumidity");
const currentWind = $("#currentWind");
const currentUV = $("#currentUV");
const forecastDiv = $('.forecast');

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


        // tempConvert(response.current.temp);

        // const tempF = (response.current.temp - 273.15) * 1.80 + 32;
        // const tempC = (tempF - 32) * (5 / 9);

        // console.log(tempF.toFixed(2));
        // console.log(tempC.toFixed(2));

        const windMPH = response.current.wind_speed;
        const windKPH = windMPH * 1.6093427125;


        currentTemp.text("Temperature: " + tempConvert(response.current.temp).toFixed(2) + " °C");
        currentHumidity.text("Humidity: " + response.current.humidity + "%");
        currentWind.text("Wind Speed: " + WindConvert(response.current.wind_speed).toFixed(2) + " KPH");
        currentUV.text("UV Index: " + response.current.uvi);

        for (i = 1; i < 6; i++) {
            let newForecast = $('<div>');
            newForecast.addClass('daily');
            newForecast.attr('id', 'daily-' + i);

            let newForecastDiv = $('<div>');
            let forecastDate = $('<p>');
            let forecastPic = $('<div>')
            let forecastTemp = $('<p>');
            let forecastHumidity = $('<p>');

            let UTCi = response.daily[i].dt;
            let di = new Date(0);
            di.setUTCSeconds(UTCi);
            console.log(di);

            forecastDate.text(di.toString().slice(3, 15));


            const tempForecastF = (response.daily[i].temp.day - 273.15) * 1.80 + 32;
            const tempForecastC = (tempForecastF - 32) * (5 / 9);

            console.log(tempForecastF.toFixed(2));
            console.log(tempForecastC.toFixed(2));

            const windMPH = response.current.wind_speed;
            const windKPH = windMPH * 1.6093427125;



            forecastTemp.text('Temp: ')







            newForecastDiv.push(forecastDate);
            newForecastDiv.append(forecastPic);
            newForecastDiv.append(forecastTemp);
            newForecastDiv.append(forecastHumidity);


            forecastDiv.append(newForecast);

        }

    })
}


function tempConvert(x) {
    const tempF = (x - 273.15) * 1.80 + 32;
    const tempC = (tempF - 32) * (5 / 9);

    console.log(tempF.toFixed(2));
    console.log(tempC.toFixed(2));

    return tempC;
}

function WindConvert(y) {
    const windMPH = y;
    const windKPH = windMPH * 1.6093427125;
    return windKPH;
}

// // Date and Forecast
// https:api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&
//     // exclude={part}&appid={YOUR API KEY}





// const humidity = response.main.humidity;
// const windSpeed = response.wind.speed;
// const UV = //need to use One Call API from Open Weather Map API


//     currentTemp.text();