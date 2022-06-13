import { getCriteriaAnswer, getPaymentAnswer, getPriceAnswer } from '@/helpers/enigme3Rules'

export const notice = ['first', 'price', 'stock', 'profile', 'payment', 'criteria', 'availability']
export const questionsData = (product) => [
  {
    slug: 'price',
    btnLabel: 'Demander le prix',
    question: `Combien coûte ${productName[product.type]} ?`,
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
    question: `Est-ce que ${productName[product.type]} est encore disponible ?`,
    normalAnswer: 'Oui bien sûr, je n’ai pas encore d’autres demandes. Prenez votre temps :)',
    botAnswer: 'Oui mais j’ai beaucoup de gens sur l’annonce il me faut une réponse tout de suite !'
  } /*,
  {
    slug: 'sending',
    btnLabel: 'Demander la livraison',
    question: 'Comment puis-je récupérer le colis ?',
    normalAnswer: `Je vais vous envoyer le colis par UPS depuis ${getCountryAnswer(false)}`,
    botAnswer: `Je vais vous envoyer le colis depuis ${getCountryAnswer(true)}`
  }*/
]

export const finalAnswer = {
  bot: 'Non, je vois clair dans ton jeu, t’es le bot arnaqueur !',
  normal: 'Oui, je vous fais confiance, on y va !'
}

export const solution = {
  /*bot: {
    success: 'Bien joué ! Il s’agissait bien du bot du professeur, voici les règles qui permettaient de le démasquer :',
    fail: 'Aie ! Tu t’es fait avoir par le bot... voici les règles qui permettaient de le démasquer :'
  },
  normal: {
    success:
      'Bien joué ! Il s’agissait d’un vendeur fiable ! Seul les points suivants auraient pu laisser penser que c’était le bot :',
    fail: 'Aie... Il s’agissait d’un véritable vendeur, il n’a pas dû apprécier ce moment ! Seul les points suivants auraient pu laisser penser que c’était le bot : '
  }*/
  success: 'Vous avez trouvé les bonnes règles, bien joué !',
  fail: 'Aie ! Ce ne sont pas les bonnes règles, voici celles qui permettaient de le démasquer :'
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
  bot: ['Chashington', 'Pabai', 'Le Mavre', 'Duris'],
  normal: ['Taideaux', 'Borwan', 'Wateller', 'Saint Seille']
}

export const payments = {
  bot: [
    { url: 'www.extrasafe-banquepopulaire.fr', image: 'banque-populaire' },
    { url: 'www.levrai-leboncoin.fr', image: 'lbc' },
    { url: 'www.real-cic.fr', image: 'cic' },
    { url: 'www.super-secured-caisse-epargne.fr', image: 'caisse-epargne' },
    { url: 'www.no-arnaque-lbp.com', image: 'lbp' }
  ],
  normal: [
    { url: 'www.banquepopulaire.fr', image: 'banque-populaire' },
    { url: 'www.leboncoin.fr', image: 'lbc' },
    { url: 'www.cic.fr', image: 'cic' },
    { url: 'www.caisse-epargne.fr', image: 'caisse-epargne' },
    { url: 'www.lbp.com', image: 'lbp' }
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

export const botSailers = [
  {
    reviews: 8,
    sales: 35,
    date: '1 mois'
  },
  {
    reviews: 11,
    sales: 55,
    date: '3 mois'
  },
  {
    reviews: 48,
    sales: 85,
    date: '7 mois'
  },
  {
    reviews: 50,
    sales: 110,
    date: '10 mois'
  },
  {
    reviews: 74,
    sales: 205,
    date: '1 an et 1 mois'
  }
]

export const normalSailers = [
  {
    reviews: 11,
    sales: 35,
    date: '1 mois'
  },
  {
    reviews: 11,
    sales: 45,
    date: '3 mois'
  },
  {
    reviews: 52,
    sales: 85,
    date: '7 mois'
  },
  {
    reviews: 67,
    sales: 110,
    date: '10 mois'
  },
  {
    reviews: 82,
    sales: 205,
    date: '1 an et 1 mois'
  }
]

export const productName = {
  clothing: 'le vêtement',
  housing: 'le logement',
  vehicle: 'la voiture'
}

export const textContent = {
  sailerName: 'EricDu59',
  consigne: {
    mainScreen:
      'À l’aide du carnet de notes, signalez les 3 bugs qui permettent de reconnaitre le robot générateur de fausses annonces du professeur.',
    notice: 'Vous devez étudier le carnet de notes et signaler les bugs',
    chat: 'Vous devez chatter avec le robot'
  }
}
