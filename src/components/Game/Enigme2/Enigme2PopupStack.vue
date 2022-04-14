<template>
  <div class="cards">
    <Enigme2Popup v-for="(card, index) in cards" :key="card" :card="card" :is-current="index === 0" />
  </div>
</template>

<script>
import Enigme2Popup from '@/components/Game/Enigme2/Enigme2Popup.vue'
export default {
  name: 'Enigme2PopupStack',
  components: {
    Enigme2Popup
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

  /* margin: 550px; */
  width: 100%;
  height: 850px;
  border: red solid 1px;
}
</style>
