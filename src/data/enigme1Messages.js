/* eslint-disable prettier/prettier */
/*

EXAMPLE MESSAGE

,
{
  isReceived: true,
  content: ''
}

*/

const messages = {
  Papa: [
    {
      isReceived: true,
      content: 'J’ai perdu ton frère, tu ne l\'aurais pas vu ?'
    },
    {
      isReceived: true,
      content: 'Signé Papa'
    }
  ],
  Cpf: [
    {
      isReceived: true,
      content: 'URGENT !! Vous allez perdre vos droits CPF. Consultez votre budget et réclamez votre formation 100% pris en charge : https//lien-de-confiance.com/YAZ32      '
    }
  ],
  Mamie: [
    {
      isReceived: true,
      content: 'Jekj jeopf'
    },
    {
      isReceived: false,
      content: 'Tout va bien Mamie ??'
    },
    {
      isReceived: true,
      content: 'J’ai mangé du pâté'
    },
    {
      isReceived: false,
      content: 'Hein quoi, je comprend pas bien ?'
    },
  ],
  Amozone: [
    {
      isReceived: true,
      content: '    Votre commande E765-5TY de 135,94€ a bien été prise en compte.'
    },
    {
      isReceived: true,
      content: 'Votre commande E765-5TY est en cours d’acheminement.'
    },
    {
      isReceived: true,
      content: 'Votre commande E765-5TY vient d’être livré'
    }
  ],
  Maman: [
    {
      isReceived: true,
      content: 'Hello Maman ! Je rentre ce week-end, j’arriverais à 17h34 à la gare'
    },
    {
      isReceived: false,
      content: 'Coucou mon fils, c’est noté'
    },
    {
      isReceived: true,
      content: 'J’arrive dans 10min, tu m’as pas oublié ?'
    },
    {
      isReceived: false,
      content: 'Je suis sors du train'
    },
    {
      isReceived: false,
      content: 'Je suis sur le parking tu es là ??'
    },
    {
      isReceived: false,
      content: 'Tu arrives bientôt ? Ca fait 15min que j’attend'
    },
    {
      isReceived: false,
      content: 'Tu m’as pas encore oublié ??'
    }
  ],
  'Crush 💔': [
    {
      isReceived: true,
      content: 'Hello ! Comment s\'est passé ton week-end ?'
    },
    {
      isReceived: true,
      content: 'Hello ! J’ai passé un superbe week-end, j\'étais à la plage 😊'
    },
    {
      isReceived: true,
      content: 'et toi ?'
    },
    {
      isReceived: true,
      content: 'J’étais chez mes parents, un peu chiant. Il y a pas grand chose à faire au Havre… et ma maman a encore oublié de venir me chercher'
    },
    {
      isReceived: true,
      content: 'Oh mince, c’est pas la première fois…'
    },
    {
      isReceived: true,
      content: 'Est ce que tu veux qu’on aille boire un verre tous les deux dans la semaine ?'
    },
    {
      isReceived: true,
      content: 'Oui, pourquoi pas. Tu es dispo jeudi ?'
    },
    {
      isReceived: true,
      content: 'Parfait ! A jeudi !!'
    },
    {
      isReceived: true,
      content: 'J’ai beaucoup apprécié cette soirée avec toi !'
    },
    {
      isReceived: true,
      content: 'Hâte de reprendre un verre ensemble'
    },
    {
      isReceived: true,
      content: 'Hello ! Comment s\'est passé ton week-end ?'
    },
    {
      isReceived: true,
      content: 'J’ai pas de nouvelle de toi depuis plus d’une semaine…'
    }
  ],
  'FlashScore Marseille': [
    {
      isReceived: true,
      content: 'Marseille perd 2 à 1 contre Angers'
    },
    {
      isReceived: true,
      content: 'Marseille perd 1 à 0 contre Paris'
    },
    {
      isReceived: true,
      content: 'Marseille gagne 3 à 0 contre Lille'
    },
    {
      isReceived: true,
      content: 'Marseille perd 1 à 0 contre Rennes'
    }
  ]
}

export default messages
