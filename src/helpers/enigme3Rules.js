import { randomNum } from '@/helpers/randomNum'

export const getPriceAnswer = (interval, isBot) => {
  const normalAnswer = randomNum(interval.min, interval.max)
  const botAnswer =
    Math.random() < 0.5
      ? interval.max + randomNum(1, interval.min * 0.2)
      : interval.min - randomNum(1, interval.min * 0.2)

  return isBot ? botAnswer : normalAnswer
}
