<template>
  <div class="cards">
    <Enigme2Card
      v-for="(card, index) in cards"
      ref="stack"
      :key="`enigme2${index}`"
      :card="card"
      :is-current="card.owner === typeScreen"
    />
  </div>
</template>

<script>
// import Enigme2Popup from '@/components/Game/Enigme2/Enigme2Popup.vue'
import { mapState } from 'vuex'

import Enigme2Card from '@/components/Game/Enigme2/Enigme2Card.vue'
import { STATE as S } from '@/store/helpers'

export default {
  name: 'Enigme2PopupStack',
  components: {
    Enigme2Card
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen] // Player1 ; Player2 ; MainScreen
  }),
  mounted() {
    console.log(this.cards)
    console.log(this.typeScreen)
  }
}
</script>

<style scoped>
.cards {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  /* justify-content: center; */
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  border: red dotted 3px;
}
</style>
