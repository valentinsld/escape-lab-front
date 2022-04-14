import { pricesData } from '@/data/enigme3'

export const getPriceAnswer = (type, subType, isBot) => {
  console.log(type, 'type')
  const priceInterval = pricesData[type][subType]
  const normalAnswer = Math.floor(Math.random() * (priceInterval.max - priceInterval.min) + priceInterval.min)
  const botAnswer = Math.random() < 0.5 ? priceInterval.max * 1.25 : priceInterval.min * 0.75

  return isBot ? botAnswer : normalAnswer
}
