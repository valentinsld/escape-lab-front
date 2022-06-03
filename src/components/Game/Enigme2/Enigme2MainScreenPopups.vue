<template>
  <div class="cardsContainer">
    <Enigme2MainScreenCard v-for="card in cards" :key="'card' + card.id" :data="card" />
  </div>
</template>

<script>
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
