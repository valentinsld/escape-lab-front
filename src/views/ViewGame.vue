<template>
  <div>
    <p>View Game</p>

    <Components :is="stepGame + typeScreen" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import IntroMainScreen from '@/components/Game/Intro/IntroMainScreen.vue'
import IntroPlayer from '@/components/Game/Intro/IntroPlayer.vue'
// Stores
import { MUTATIONS as M } from '@/store/helpers'
import { STATE as S } from '@/store/helpers'

export default {
  name: 'ViewGame',
  components: {
    IntroMainScreen,
    IntroPlayer1: IntroPlayer,
    IntroPlayer2: IntroPlayer
  },
  computed: mapState([S.typeScreen, S.stepGame]),
  beforeMount() {
    console.log(this.$store.state[S.idRoom])
    if (!this.$store.state[S.idRoom]) {
      return this.$router.push('/')
    }

    this.$store.commit(M.isStart, true)
  }
}
</script>

<style lang="scss" scoped></style>
