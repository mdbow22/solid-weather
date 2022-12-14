import { Component, createEffect, Setter } from 'solid-js';
import { Transition } from 'solid-transition-group';

interface HeroProps
    {
        getWeather: () => Promise<void>;
        getPosition: () => void;
        setManualLoc: Setter<string>;
        hideHero: boolean;
      }

const Hero: Component<HeroProps> = (props) => {

  return (
      
      <div
        class={`relative hero-content text-center text-neutral-content min-h-screen p-0 transition-all duration-300`}
      >
        <div class='max-w-md h-full bg-base-100/30 border-t border-l border-white/25 p-10 rounded-2xl flex flex-col justify-center backdrop-blur-md shadow-md'>
          <h1 class='mb-5 text-5xl font-bold'>Solid Weather</h1>
          <p class='mb-5 text-2xl'>Accurate and Fast Weather</p>
          <div class='flex flex-col'>
            <div class='mb-3 w-full'>
              <input
                type='text'
                class='input w-full'
                placeholder='City or ZIP'
                onInput={(e) => props.setManualLoc(e.currentTarget.value)}
              />
            </div>
            <div class='flex justify-between'>
              <button type='button' class='btn btn-primary' onClick={() => props.getWeather()}>
                Search
              </button>
              <button type='button' class='btn btn-outline' onClick={() => props.getPosition()}>Use My Location</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Hero;
