<template>
  <ViewContainer name="game">
    <p>View Game</p>
    <Components :is="stepGame" />
  </ViewContainer>
</template>

<script>
import { Pane } from 'tweakpane'
import { mapState } from 'vuex'

// enigme 1
import Enigme1MainScreen from '@/components/Game/Enigme1/Enigme1MainScreen.vue'
import Enigme1Player1 from '@/components/Game/Enigme1/Enigme1Player1.vue'
import Enigme1Player2 from '@/components/Game/Enigme1/Enigme1Player2.vue'
// enigme 2
import Enigme2MainScreen from '@/components/Game/Enigme2/Enigme2MainScreen.vue'
import Enigme2Player from '@/components/Game/Enigme2/Enigme2Player.vue'
// enigme 3
import Enigme3 from '@/components/Game/Enigme3/Enigme3'
// intro
import IntroMainScreen from '@/components/Game/Intro/IntroMainScreen.vue'
import IntroPlayer from '@/components/Game/Intro/IntroPlayer.vue'
// Outro
import OutroMainScreen from '@/components/Game/Outro/OutroMainScreen.vue'
import OutroPlayer from '@/components/Game/Outro/OutroPlayer.vue'
// Stores
import { MUTATIONS as M } from '@/store/helpers'
import { STATE as S } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'
import ViewContainer from '@/views/ViewContainer'

const DEBUG = process.env.NODE_ENV === 'development'

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
    Enigme3,
    OutroMainScreen,
    OutroPlayer1: OutroPlayer,
    OutroPlayer2: OutroPlayer,
    ViewContainer
  },
  data() {
    return {
      pane: null
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen],
    stepGame: (state) => state[S.stepGame]
  }),
  beforeMount() {
    console.log(this.$store.state[S.idRoom])
    if (!this.$store.state[S.idRoom]) {
      return this.$router.push('/')
    }

    this.$store.commit(M.isStart, true)
  },
  mounted() {
    this.initPane()

    this.sockets.subscribe('setStepGame', ({ stepGame }) => {
      this.$store.commit(M.stepGame, stepGame)
    })
  },
  beforeDestroy() {
    this.$data.pane.remove()
  },
  methods: {
    initPane() {
      if (!DEBUG || this.$store.state[S.stateScreen] !== STATE_SCREEN.mainScreen) return

      const pane = new Pane()
      this.$data.pane = pane

      pane
        .addButton({
          title: 'enigme 1'
        })
        .on('click', () => {
          this.$socket.emit('setStepGame', { stepGame: 'Enigme1' })
        })

      pane
        .addButton({
          title: 'enigme 2'
        })
        .on('click', () => {
          this.$socket.emit('setStepGame', { stepGame: 'Enigme2' })
        })

      pane
        .addButton({
          title: 'enigme 3'
        })
        .on('click', () => {
          this.$socket.emit('setStepGame', { stepGame: 'Enigme3' })
        })

      pane
        .addButton({
          title: 'outro'
        })
        .on('click', () => {
          this.$socket.emit('setStepGame', { stepGame: 'Outro' })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
