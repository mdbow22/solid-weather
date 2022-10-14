import { Component, For, Setter } from 'solid-js';
import { ForeCast } from '../forecast.types';
import { DateTime } from 'luxon';

interface ForecastProps {
    hideHero: boolean;
    weather: ForeCast | undefined;
    name: string | undefined;
    setHideHero: Setter<boolean>;
}

const Forecast: Component<ForecastProps> = (props) => {
    return (
        <div
        class={`hero-content text-center text-neutral-content min-h-screen p-0 transition-all duration-300 delay-150 ${!props.hideHero ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        
        <div class='relative max-w-md h-full bg-base-100/30 border-t border-l border-white/25 p-5 rounded-2xl flex flex-col justify-center backdrop-blur-md shadow-md'>
            <div class='absolute top-1 right-5'><a class='cursor-pointer' onClick={() => props.setHideHero(false)}>Reset</a></div>
            <div class='font-mono text-left text-xl font-bold'>{props.name}</div>
            <div class='flex justify-between items-center gap-14'>
                
                <div class='flex justify-between items-center gap-2 w-full'>
                    <div class='font-mono'>
                        <ul class='text-left text-sm'>
                            <li>Temp: {props.weather?.current.temp ? Math.round(props.weather?.current.temp) : ''}</li>
                            <li>Feels like: {props.weather?.current.feels_like ? Math.round(props.weather?.current.feels_like) : ''}</li>
                            <li>Humidity: {props.weather?.current.humidity}%</li>
                        </ul>
                    </div>
                    <div class=''>
                        <img src={`http://openweathermap.org/img/wn/${props.weather?.current.weather[0].icon}@2x.png`} />
                    </div>
                </div>
            </div>
            <For each={props.weather?.daily} >
                {(day, index) => {
                    return (
                        <div class={`flex justify-between items-center gap-14 ${props.weather?.daily && index() !== props.weather?.daily?.length - 1 ? 'border-b border-white/25' : ''}`}>
                           
                            <div class='font-mono text-center'>
                                {index() === 0 ? 'Today' : DateTime.fromSeconds(day.dt).weekdayLong}
                            </div>
                            <div class='flex items-center gap-2'>
                            <div class=''>
                                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} />
                            </div>
                            
                            <div class='font-mono'>
                                {Math.round(day.temp.min)}/{Math.round(day.temp.max)}
                            </div>
                            </div>
                        </div>
                    )
                }}
            </For>
        </div>
      </div>
    )
}

export default Forecast;