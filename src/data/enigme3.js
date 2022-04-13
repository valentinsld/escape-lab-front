export const enigme3Data = () => ({
  rules: [
    { slug: 'stock' },
    { slug: '2' },
    { slug: '3' },
    { slug: '4' },
    {
      slug: 'price',
      chat: {
        question: 'Quel est le prix du produit ?',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      slug: '6',
      chat: {
        question: 'La question 6',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      slug: '7',
      chat: {
        question: 'La question 7',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      slug: '8',
      chat: {
        question: 'La question 8',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      slug: '9',
      chat: {
        question: 'La question 9',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      slug: '10',
      chat: {
        question: 'La question 10',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    }
  ],
  notice_rules: [
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
  ],
  products: [
    {
      type: 'clothing',
      slug: 'pull',
      name: 'Pull en laine',
      normalImg: 'image normale vêtement',
      botImg: 'image stock vêtement',
      description: 'description vêtement'
    },
    {
      type: 'housing',
      slug: 'appartement',
      name: 'appartement',
      normalImg: 'image normale appartement',
      botImg: 'image stock appartement',
      description: 'description appartement'
    },
    {
      type: 'vehicle',
      slug: 'voiture',
      name: 'belle voiture',
      normalImg: 'image normale véhicule',
      botImg: 'image stock véhicule',
      description: 'description véhicule'
    }
  ],
  finalAnswer: {
    bot: 'Non, je vois clair dans ton jeu, t’es le bot arnaqueur !',
    normal: 'Oui, je vous fais confiance, on y va !'
  },
  config: {
    questionsToDisplay: 6,
    rulesToDetectBot: 3,
    prices: {
      clothing: [10, 500],
      vehicle: [1000, 200000],
      housing: [40000, 500000]
    }
  }
})
