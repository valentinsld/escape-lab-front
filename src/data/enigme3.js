import { getCountryAnswer, getCriteriaAnswer, getPaymentAnswer, getPriceAnswer } from '@/helpers/enigme3Rules'

export const noticeData = () => [
  {
    src: 'La règle 1'
  },
  {
    name: 'La règle 2'
  }
]

export const questionsData = (product) => [
  {
    slug: 'price',
    btnLabel: 'Demander le prix',
    question: 'Quel est le prix du produit ?',
    normalAnswer: `Prix de départ ${getPriceAnswer(product.subtype.interval, false)}€`,
    botAnswer: `Prix de départ ${getPriceAnswer(product.subtype.interval, true)}€`
  },
  {
    slug: 'payment',
    btnLabel: 'Demander le moyen de paiement',
    question: 'Comment se déroule le paiement ?',
    normalAnswer: getPaymentAnswer(false),
    botAnswer: getPaymentAnswer(true)
  },
  {
    slug: 'criteria',
    btnLabel: 'Demander les caractéristiques',
    question: 'Quelles sont les caractéristiques techniques du produit ?',
    normalAnswer: getCriteriaAnswer(product.type, product.criteria.good),
    botAnswer: getCriteriaAnswer(product.type, product.criteria.wrong)
  },
  {
    slug: 'availability',
    btnLabel: 'Demander la disponibilité',
    question: 'Le produit est-il encore disponible ?',
    normalAnswer: 'Oui bien sûr, je n’ai pas encore d’autres demandes. Prenez votre temps :)',
    botAnswer: 'Oui mais j’ai beaucoup de gens sur l’annonce il me faut une réponse tout de suite !'
  },
  {
    slug: 'sending',
    btnLabel: 'Demander la livraison',
    question: 'Comment puis-je récupérer le colis ?',
    normalAnswer: `Je vais vous envoyer le colis par UPS depuis ${getCountryAnswer(false)}`,
    botAnswer: `Je vais vous envoyer le colis depuis ${getCountryAnswer(true)}`
  }
]

export const finalAnswer = {
  bot: 'Non, je vois clair dans ton jeu, t’es le bot arnaqueur !',
  normal: 'Oui, je vous fais confiance, on y va !'
}

export const criteriaName = {
  furnished: 'Type :',
  energyClass: 'Classe énergétique',
  piecesNumber: 'Nombre de pièces :',
  location: 'Localisation :',
  size: 'Taille :',
  condition: 'État :',
  material: 'Matière :',
  color: 'Couleur :',
  seatsNumber: 'Nombre de sièges :',
  power: 'Puissance :',
  modelYear: 'Année du modèle :',
  model: 'Modèle :'
}

export const countries = {
  bot: ['Chashington', 'Pabai', 'Saint Seille', 'Le Mavre'],
  normal: ['Taideaux', 'Borwan', 'Duris', 'Watellerault']
}

export const payments = {
  bot: [
    { url: 'www.extrasafe-paypal.com', image: 'paypal' },
    { url: 'www.levrai-leboncoin.com', image: 'lbc' },
    { url: 'www.real-lydia.com', image: 'lydia' },
    { url: 'www.super-secured-paylib.com', image: 'paylib' },
    { url: 'www.no-arnaque-lpb.com', image: 'lpb' }
  ],
  normal: [
    { url: 'www.paypal.com', image: 'paypal' },
    { url: 'www.leboncoin.com', image: 'lbc' },
    { url: 'www.lydia.com', image: 'lydia' },
    { url: 'www.paylib.com', image: 'paylib' },
    { url: 'www.lpb.com', image: 'lpb' }
  ]
}

export const botGlyphConverter = {
  a: 'å',
  e: 'ė',
  i: 'į',
  n: 'ń'
}

export const normalGlyphConverter = {
  a: 'å',
  e: 'ę',
  n: 'ñ'
}

export const textContent = {
  sailerName: 'EricDu59'
}
