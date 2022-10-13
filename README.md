# Solid Weather

This is a practice app for learning more about SolidJS and Tailwind CSS. A small weather app that will provide current weather and a 7 day forecast based on a city name or US ZIP code. Data is provided by OpenWeather API.

Tech Stack:
- Vite
- SolidJS
- Tailwind CSS
- Daity UI

This will be an ongoing work in progress to continue learning Tailwind and SolidJS.

## Use

Currently, users are presented with an initial card with a text input for a city name or US ZIP code along with a submit button and a button to "Use My Location" which makes use of the browser's Geolocation API to retrieve GPS coordinates of the user's device.

After selecting either option, the user is presented with the current weather, today's forecast, and a 7 day future forecast, with data from the OpenWeather API.

## Future Add-ons

- Create better transition animations utilizing solid-transition-group.
- Be able to perform a new search without having to go back to original card.
- Save and retrieve the last search the user performed in localStorage.