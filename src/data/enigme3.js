import { getPriceAnswer } from '@/helpers/enigme3Rules'

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
    normalAnswer: `${product.name} coûte ${getPriceAnswer(product.type, product.mainCriteria, false)}€`,
    botAnswer: `${product.name} coûte ${getPriceAnswer(product.type, product.mainCriteria, true)}€`
  },
  {
    slug: 'payment',
    question: 'La question payment',
    normalAnswer: 'La bonne réponse payment',
    botAnswer: 'La réponse qui montre le bot payment'
  },
  {
    slug: 'criteria',
    question: 'La question criteria',
    normalAnswer: 'La bonne réponse criteria',
    botAnswer: 'La réponse qui montre le bot criteria'
  },
  {
    slug: 'availability',
    question: 'La question availability',
    normalAnswer: 'La bonne réponse availability',
    botAnswer: 'La réponse qui montre le bot availability'
  },
  {
    slug: 'sending',
    question: 'La question sending',
    normalAnswer: 'La bonne réponse sending',
    botAnswer: 'La réponse qui montre le bot sending'
  }
]

export const finalAnswer = {
  bot: 'Non, je vois clair dans ton jeu, t’es le bot arnaqueur !',
  normal: 'Oui, je vous fais confiance, on y va !'
}

export const pricesData = {
  clothing: {
    'h&n': {
      min: 10,
      max: 100
    },
    adidos: {
      min: 20,
      max: 300
    },
    ralphLaurus: {
      min: 80,
      max: 700
    }
  },
  vehicle: {
    more: {
      min: 800,
      max: 50000
    },
    less: {
      min: 1000,
      max: 70000
    }
  },
  housing: {
    more: {
      min: 50000,
      max: 300000
    },
    less: {
      min: 20000,
      max: 200000
    }
  }
}
