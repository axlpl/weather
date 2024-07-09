import type { Coord } from './Coord'
import type { WeatherCondition } from './WeatherCondition'
import type { MainWeather } from './MainWeather'
import type { Wind } from './Wind'
import type { Clouds } from './Clouds'
import type { Sys } from './Sys'

export interface Weather {
  coord: Coord
  weather: WeatherCondition[]
  base: string
  main: MainWeather
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}
