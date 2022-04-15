import { countries } from '@/data/enigme3'
import { randomNum } from '@/helpers/randomNum'

export const getPriceAnswer = (interval, isBot) => {
  const normalAnswer = randomNum(interval.min, interval.max)
  const botAnswer =
    Math.random() < 0.5
      ? interval.max + randomNum(1, interval.min * 0.2)
      : interval.min - randomNum(1, interval.min * 0.2)

  return isBot ? botAnswer : normalAnswer
}

export const getCountryAnswer = (isBot) => {
  return isBot
    ? countries.bot[randomNum(0, countries.bot.length)]
    : countries.normal[randomNum(0, countries.normal.length)]
}
