export interface DayForecast {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: {
      day: number;
      eve: number;
      morn: number;
      night: number;
    }
    humidity: number;
    moon_phase: number;
    moonrise: number;
    moonset: number;
    pop: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: {
      day: number;
      eve: number;
      max: number;
      min: number;
      morn: number;
      night: number;
    }
    uvi: number;
    weather: Weather[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
  }
  
  export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
  }
  
  export interface ForeCast {
    current: {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: number;
      humidity: number;
      pressure: number;
      sunrise: number;
      sunset: number;
      temp: number;
      uvi: number;
      visibility: number;
      weather: Weather[];
      wind_deg: number;
      wind_gust: number;
      wind_speed: number;
    }
    daily: DayForecast[];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
  }