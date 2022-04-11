export const enigme3Data = () => ({
  rules: [
    { id: 1, name: 'stock' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    {
      id: 5,
      name: '5',
      chat: {
        question: 'La question 5',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      id: 6,
      name: '6',
      chat: {
        question: 'La question 6',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      id: 7,
      name: '7',
      chat: {
        question: 'La question 7',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      id: 8,
      name: '8',
      chat: {
        question: 'La question 8',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      id: 9,
      name: '9',
      chat: {
        question: 'La question 9',
        normalAnswer: 'La bonne réponse',
        botAnswer: 'La réponse qui montre le bot'
      }
    },
    {
      id: 10,
      name: '10',
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
      name: 'Pull en laine',
      normalImg: 'image normale vêtement',
      botImg: 'image stock vêtement',
      description: 'description vêtement'
    },
    {
      type: 'housing',
      name: 'appartement',
      normalImg: 'image normale appartement',
      botImg: 'image stock appartement',
      description: 'description appartement'
    },
    {
      type: 'vehicle',
      name: 'belle voiture',
      normalImg: 'image normale véhicule',
      botImg: 'image stock véhicule',
      description: 'description véhicule'
    }
  ],
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
