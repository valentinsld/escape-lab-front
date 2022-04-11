export const enigme3Data = () => ({
  rules: [
    { id: 1, name: 'price' },
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
  products: [
    {
      type: 'clothing',
      name: 'Pull en laine'
    },
    {
      type: 'clothing',
      name: 'Pantalon'
    },
    {
      type: 'vehicle',
      name: ''
    },
    {
      type: 'vehicle',
      name: ''
    }
  ],
  config: {
    questionsToDisplay: 6,
    rulesToDetectBot: 3,
    prices: {
      clothing: [10, 500],
      vehicle: [1000, 200000]
    }
  }
})
