<template>
  <div class="enigme-3">
    <p>Enigme 3</p>
    <Enigme3MainScreen v-if="typeScreen === 'MainScreen'" :true-rules="trueRules" />
    <Enigme3Player1 v-if="typeScreen === 'Player1'" :true-rules="trueRules" />
    <Enigme3Player2 v-if="typeScreen === 'Player2'" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Enigme3MainScreen from '@/components/Game/Enigme3/Enigme3MainScreen.vue'
import Enigme3Player1 from '@/components/Game/Enigme3/Enigme3Player1.vue'
import Enigme3Player2 from '@/components/Game/Enigme3/Enigme3Player2.vue'
import { enigme3Data } from '@/data/enigme3'
import { STATE as S } from '@/store/helpers'
export default {
  name: 'Enigme3',
  components: { Enigme3MainScreen, Enigme3Player1, Enigme3Player2 },
  data() {
    return {
      data: enigme3Data(),
      trueRules: null
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen]
  }),
  watch: {
    trueRules: function (newVal, oldVal) {
      // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  },
  mounted() {
    //if main screen get config rules from back
    this.typeScreen === 'MainScreen' &&
      this.sockets.subscribe('sendEnigme3Config', (config) => {
        console
        this.trueRules = config
      })
  }
}
</script>

<style lang="scss" scoped></style>
