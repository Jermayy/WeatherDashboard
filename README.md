# WeatherDashboard
Full Stack Flex Homework Activity #6

# Description:

The project involves creating a Weather Dashboard that allows users to search a city's name and the browser will dynamically display a city's current weather as well as temperature and humidity for the following 5 days. This demonstrates our ability to access the OpenWeather Remote API and return information from the AJAX request to the user on the browser.


# Keypoints:
* Demonstrate requesting information in remote APIs
* Calling a second Ajax request to a different API using the response from another ajax method request.
* Dynamically create and clear html elements with each search to display new forecast information and search history
* Locally store last searched city and automatically load the last searched city weather details upon refresh/load of the browser




1. Upon launch of browser, users are greeted with the following screen prompting them to search a city of their choice


![](/screenshots/1.png)


2. Once user enters a city name and presses the search button, the browser will dynamically display the following weather-related information for the current date in the aforementioned city:
 - Temperature
 - Humidity
 - Wind Speed
 - UV Index


![](/screenshots/2.png)


 2a. User's search History will also generate a new button beneath the search bar
 
 2b. 5 boxes will also appear showing the temperature and humidity percentage for the following 5 days with their respective dates


![](/screenshots/3.png)

 3. When User searches a different city, this will append a new button to the search history, which when clicked, will show weather details for that city.


![](/screenshots/4.png)


 4. upon refresh of the page, the last searched city's weather details will be displayed


![](/screenshots/5.png)



 # Issues/future features to add:
 * Unable to implement styling to UV Index which will display a different background colour depending on the UV Index value
* Unable to implement weather icon, for each day - some code still in source code commented out


