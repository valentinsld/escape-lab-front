<template>
  <div class="cards">
    <Enigme2Card
      v-for="(card, index) in cards"
      ref="stack"
      :key="`enigme2${index}`"
      :card="card"
      :is-current="card.owner === typeScreen"
      :is-end-sort="isEndSort"
      :is-first-player="isFirstPlayer"
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
  data() {
    return {
      isFirstPlayer: this.$store.state[S.typeScreen] === 'Player1',
      isEndSort: false
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen] // Player1 ; Player2 ; MainScreen
  }),
  sockets: {
    'enigme2-endSort': function ({ success }) {
      this.$data.isEndSort = true
      console.log(success)
    }
  },
  mounted() {
    console.log(this.cards)
    console.log(this.typeScreen)
  }
}
</script>

<style scoped>
.cards {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  /* justify-content: center; */
  width: 100%;
  height: 100%;
  padding: 0 20px 20px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
