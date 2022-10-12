import { Component, createEffect, Setter } from 'solid-js';

interface HeroProps
    {
        getWeather: () => Promise<void>;
        setManualLoc: Setter<string>;
        hideHero: boolean;
      }

const Hero: Component<HeroProps> = (props) => {

    createEffect(() => {
        props.hideHero
    })

  return (
    
      <div
        class={`relative hero-content text-center text-neutral-content min-h-screen p-0 transition-all duration-300 ${props.hideHero ? '-translate-y-32 opacity-0 z-0' : 'translate-y-0 opacity-100 z-20'}`}
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
              <button type='button' class='btn btn-outline'>Use My Location</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Hero;
