import { Component, createEffect, createSignal, Show } from 'solid-js';
import Hero from './components/Hero';
import { ForeCast } from './forecast.types';
import heroImage from './assets/hero-image.jpg';
import Forecast from './components/Forecast';
import { Transition } from 'solid-transition-group';

const App: Component = () => {
  const [manualLoc, setManualLoc] = createSignal<string>('');
  const [location, setLocation] = createSignal<{
    name: string;
    latitude: number;
    longitude: number;
  }>();
  const [weather, setWeather] = createSignal<ForeCast>();
  const [hideHero, setHideHero] = createSignal(false);

  createEffect(() => {
    console.log('trigger');
    const fetchWeather = async (lat: any, lon: any) => {
      const res = await fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          lat +
          '&lon=' +
          lon +
          '&exclude=minutely,hourly&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial'
      );
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
        setHideHero(true);
      }
    };

    if (location()?.latitude && location()?.longitude) {
      fetchWeather(location()?.latitude, location()?.longitude);
    }
  });

  const getPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const success = function (pos: any) {
      const coords = pos.coords;
      setLocation({
        name: '',
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };

    //What happens if user does not allow location tracking
    const error = function (err: any) {
      console.log(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const getWeather = async () => {
    if (manualLoc()) {
      if (!isNaN(parseFloat(manualLoc()))) {
        const res = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?zip=' +
            manualLoc() +
            '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial'
        );

        if (res.ok) {
          const data = await res.json();

          setLocation({
            name: data.name,
            latitude: data.coord.lat,
            longitude: data.coord.lon,
          });
        }
      } else {
        const res = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=' +
            manualLoc() +
            '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial'
        );

        if (res.ok) {
          const data = await res.json();

          setLocation({
            name: data.name,
            latitude: data.coord.lat,
            longitude: data.coord.lon,
          });
        }
      }
    }
  };

  return (
    <div>
      <div
        class={`hero min-h-screen`}
        style={{ 'background-image': `url(${heroImage})` }}
      >
        <div class='hero-overlay bg-opacity-70'></div>
        <Transition
          appear
          onEnter={(el, done) => {
            const a = el.animate(
              [
                { opacity: 0 },
                { opacity: 1 },
              ],
              {
                duration: 200,
              }
            );
            a.finished.then(done);
          }}
          onExit={(el, done) => {
            const a = el.animate([{ opacity: 1 }, { opacity: 0}], {
              duration: 200,
            });
            a.finished.then(done);
          }}
        >
          <Show
            when={hideHero()}
            fallback={
              <Hero
                getWeather={getWeather}
                setManualLoc={setManualLoc}
                hideHero={hideHero()}
                getPosition={getPosition}
              />
            }
          >
            <Forecast
              hideHero={hideHero()}
              weather={weather()}
              name={location()?.name}
              setHideHero={setHideHero}
            />
          </Show>
        </Transition>
      </div>
    </div>
  );
};

export default App;
