import { pricesData } from '@/data/enigme3'

export const getPriceAnswer = (type, isBot) => {
  const normalAnswer = Math.floor(Math.random() * (pricesData[type].max - pricesData[type].min) + pricesData[type].min)
  const botAnswer = Math.random() < 0.5 ? pricesData[type].max * 1.25 : pricesData[type].min * 0.75
  return isBot ? botAnswer : normalAnswer
}
