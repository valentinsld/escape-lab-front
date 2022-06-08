<template>
  <div class="cardsContainer">
    <Enigme2MainScreenCard v-for="card in cards" :key="'card' + card.id" :data="card" />
  </div>
</template>

<script>
import { ACTIONS as A } from '@/store/modules/three/helpers'

import Enigme2MainScreenCard from './Enigme2MainScreenCard.vue'

export default {
  name: 'Enigme2MainScreenPopups',
  components: {
    Enigme2MainScreenCard
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  mounted() {
    const CARDS = [
      {
        id: 1,
        from: 'Caf de Paris (noreply@emailing.caf.fr)',
        subject: 'Déclarez vos revenus trimestriels',
        text: 'Pour lire ce message en ligne, rendez-vous sur cette page. Ceci est un message automatique, merci de ne pas y répondre…',
        owner: null,
        incomingDirection: null,
        exitDirection: null,
        isSpam: false,
        order: 0
      }
      /*{
        id: 2,
        from: 'mail@e.cudo.com.au',
        subject: 'ʀÉᴄᴜᴘÉʀᴇᴢ ᴠᴏᴛʀᴇ ʀÉᴄᴏᴍᴘᴇɴꜱᴇ ɪᴘʜᴏɴᴇ 13 ᴏꜰꜰᴇʀᴛ',
        text: 'ʀÉᴄᴜᴘÉʀᴇᴢ ᴠᴏᴛʀᴇ ʀÉᴄᴏᴍᴘᴇɴꜱᴇ ɪᴘʜᴏɴᴇ 13 ᴏꜰꜰᴇʀᴛ.',
        owner: null,
        incomingDirection: null,
        exitDirection: null,
        isSpam: true,
        order: 0
      },
      {
        id: 3,
        from: 'Caf de Paris (noreply@emailing.caf.fr)',
        subject: 'Votre CAF vous informe - Déclarez vos revenus trimestriels',
        text: 'Pour lire ce message en ligne, rendez-vous sur cette page. Ceci est un message automatique, merci de ne pas y répondre. …',
        owner: null,
        incomingDirection: null,
        exitDirection: null,
        isSpam: false,
        order: 0
      },
      {
        id: 4,
        from: 'Cristiano Ronaldo (cr7.lejoueurdefoot@gmail.com)',
        subject: 'Aide moi à sauver le foot',
        text: 'Bonjour. C’est moi Cristiano Ronaldo, célèbre footballeur international. Je suis bloqué à l’aéroport parce que j’ai perdu ma carte de crédit. Peux-tu m’envoyer 300€ en carte Amazon ? ',
        owner: null,
        incomingDirection: null,
        exitDirection: null,
        isSpam: true,
        order: 0
      },
      {
        id: 5,
        from: 'Josette (josette.dupont@gmail.com)',
        subject: 'Coucou mon loulou',
        text: 'Coucou mon loulou c’est Mamie    viens-tu manger la galette à la maison samedi prochain ?     bises     Mamie',
        owner: null,
        incomingDirection: null,
        exitDirection: null,
        isSpam: false,
        order: 0
      },
      {
        id: 6,
        from: 'Veronique FACIRI (faciri@gobelins.fr)',
        subject: 'Gobelins - FACIRI : vos plannings à Gobelins',
        text: 'Bonjour à toutes et tous, Voici vos plannings pour les 3 semaines à venir, merci d’en prendre note. …',
        owner: null,
        incomingDirection: null,
        exitDirection: null,
        isSpam: false,
        order: 0
      },
      {
        id: 7,
        from: 'Instagram (support@support-instragram.com)',
        subject: 'nouveau message de @elonmusk',
        text: 'Salut c’est elon musk de tesla tu veut un compte twitter premium offert ?',
        owner: null,
        incomingDirection: null,
        exitDirection: null,
        isSpam: true,
        order: 0
      }*/
    ]
    for (let card in CARDS) {
      console.log('test')
      this.$store.dispatch({
        type: A.initPopup,
        content: CARDS[card]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cardsContainer {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
