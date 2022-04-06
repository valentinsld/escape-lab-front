<template>
  <div>
    <p>View Game</p>

    <Components :is="stepGame + typeScreen" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

// enigme 1
import Enigme1MainScreen from '@/components/Game/Enigme1/Enigme1MainScreen.vue'
import Enigme1Player1 from '@/components/Game/Enigme1/Enigme1Player1.vue'
import Enigme1Player2 from '@/components/Game/Enigme1/Enigme1Player2.vue'
// enigme 2
import Enigme2MainScreen from '@/components/Game/Enigme2/Enigme2MainScreen.vue'
import Enigme2Player from '@/components/Game/Enigme2/Enigme2Player.vue'
// enigme 3
import Enigme3MainScreen from '@/components/Game/Enigme3/Enigme3MainScreen.vue'
import Enigme3Player1 from '@/components/Game/Enigme3/Enigme3Player1.vue'
import Enigme3Player2 from '@/components/Game/Enigme3/Enigme3Player2.vue'
// intro
import IntroMainScreen from '@/components/Game/Intro/IntroMainScreen.vue'
import IntroPlayer from '@/components/Game/Intro/IntroPlayer.vue'
// Outro
import OutroMainScreen from '@/components/Game/Outro/OutroMainScreen.vue'
import OutroPlayer from '@/components/Game/Outro/OutroPlayer.vue'
// Stores
import { MUTATIONS as M } from '@/store/helpers'
import { STATE as S } from '@/store/helpers'

export default {
  name: 'ViewGame',
  components: {
    IntroMainScreen,
    IntroPlayer1: IntroPlayer,
    IntroPlayer2: IntroPlayer,
    Enigme1MainScreen,
    Enigme1Player1,
    Enigme1Player2,
    Enigme2MainScreen,
    Enigme2Player1: Enigme2Player,
    Enigme2Player2: Enigme2Player,
    Enigme3MainScreen,
    Enigme3Player1,
    Enigme3Player2,
    OutroMainScreen,
    OutroPlayer1: OutroPlayer,
    OutroPlayer2: OutroPlayer
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
