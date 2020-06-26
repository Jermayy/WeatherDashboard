const searchInput = $('#searchCity');
const searchBtn = $('#submitBtn');


searchBtn.on('click', function(event) {
    event.preventDefault();
    searchWeather();
})

function searchWeather() {

    let searchValue = searchInput.val();
    const apiKey = "724e98b55891110350e3c7d68a2fcece";

    const queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + searchValue + "&appid=" + apiKey;

    console.log(searchValue);
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    })
}