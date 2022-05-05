import { getCountryAnswer, getCriteriaAnswer, getPaymentAnswer, getPriceAnswer } from '@/helpers/enigme3Rules'

export const noticeData = () => [
  {
    name: 'La règle 1',
    description: 'Description de la règle'
  },
  {
    name: 'La règle 2',
    description: 'Description de la règle'
  },
  {
    name: 'La règle 3',
    description: 'Description de la règle'
  },
  {
    name: 'La règle 4',
    description: 'Description de la règle'
  },
  {
    name: 'La règle 5',
    description: 'Description de la règle'
  },
  {
    name: 'La règle 6',
    description: 'Description de la règle'
  },
  {
    name: 'La règle 7',
    description: 'Description de la règle'
  },
  {
    name: 'La règle 8',
    description: 'Description de la règle'
  },
  {
    name: 'La règle 9',
    description: 'Description de la règle'
  },
  {
    name: 'La règle 10',
    description: 'Description de la règle'
  }
]

export const questionsData = (product) => [
  {
    slug: 'price',
    question: 'Quel est le prix du produit ?',
    normalAnswer: `${product.name} coûte ${getPriceAnswer(product.subtype.interval, false)}€`,
    botAnswer: `${product.name} coûte ${getPriceAnswer(product.subtype.interval, true)}€`
  },
  {
    slug: 'payment',
    question: 'Comment se déroule le paiement ?',
    normalAnswer: getPaymentAnswer(false),
    botAnswer: getPaymentAnswer(true)
  },
  {
    slug: 'criteria',
    question: 'Quelles sont les caractéristiques du produit ?',
    normalAnswer: getCriteriaAnswer(product.type, product.criteria.good),
    botAnswer: getCriteriaAnswer(product.type, product.criteria.wrong)
  },
  {
    slug: 'availability',
    question: 'Le produit est-il encore disponible ?',
    normalAnswer: 'Oui bien sûr, je n ai pas encore d autres demandes. Prenez votre temps :)',
    botAnswer: 'Oui mais j’ai beaucoup de gens sur l’annonce il me faut une réponse tout de suite !'
  },
  {
    slug: 'sending',
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

export const text = () => {}
