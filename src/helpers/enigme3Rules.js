import { countries, payments } from '@/data/enigme3'
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

export const getPaymentAnswer = (isBot) => {
  const service = isBot
    ? payments.bot[randomNum(0, payments.bot.length)]
    : payments.normal[randomNum(0, payments.normal.length)]
  return { text: 'Nous pouvons passer par ce service de paiement', ...service }
}

export const getCriteriaAnswer = (productType, criteria) => {
  return productType === 'clothing'
    ? `C'est un vêtement de couleur ${criteria.color} fait en ${criteria.material}. Il est en taille ${criteria.size} et est en ${criteria.condition}`
    : productType === 'housing'
    ? `C'est un logement ${criteria.furnished} de classe énergétique ${criteria.energyClass}. Il a ${criteria.piecesNumber} pièces et est situé à ${criteria.location}`
    : `Ce modèle ${criteria.model} est sorti en ${criteria.modelYear}. La voiture a ${criteria.seatsNumber} sièges et une puissance de ${criteria.power}`
}
