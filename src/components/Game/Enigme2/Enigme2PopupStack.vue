<template>
  <div class="cards">
    <Enigme2Card
      v-for="(card, index) in cards"
      ref="stack"
      :key="`enigme2${index}`"
      :card="card"
      :is-current="index === 0"
    />
  </div>
</template>

<script>
// import Enigme2Popup from '@/components/Game/Enigme2/Enigme2Popup.vue'
import Enigme2Card from '@/components/Game/Enigme2/Enigme2Card.vue'

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
  }
}
</script>

<style scoped>
.cards {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 350px;
  border: red dotted 3px;
}
</style>
