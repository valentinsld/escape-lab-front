import { getCountryAnswer, getPriceAnswer } from '@/helpers/enigme3Rules'

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
    normalAnswer: { url: 'url', desc: 'desc', image: 'image' },
    botAnswer: { url: 'url', desc: 'desc', image: 'image' }
  },
  {
    slug: 'criteria',
    question: 'La question criteria',
    normalAnswer: 'La bonne réponse criteria',
    botAnswer: 'La réponse qui montre le bot criteria'
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

export const countries = {
  bot: ['Chashington', 'Pabai', 'Saint Seille', 'Le Mavre'],
  normal: ['Taideaux', 'Borwan', 'Duris', 'Watellerault']
}

export const text = () => {}
