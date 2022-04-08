<template>
  <ViewContainer name="game">
    <p>View Game</p>
    <Components :is="stepGame" />
  </ViewContainer>
</template>

<script>
import { Pane } from 'tweakpane'
import { mapState } from 'vuex'

// enigmes
import Enigme1 from '@/components/Game/Enigme1/Enigme1'
import Enigme2 from '@/components/Game/Enigme2/Enigme2'
import Enigme3 from '@/components/Game/Enigme3/Enigme3'
// intro
import Intro from '@/components/Game/Intro/Intro'
// outro
import Outro from '@/components/Game/Outro/Outro'
// Stores
import { MUTATIONS as M } from '@/store/helpers'
import { STATE as S } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'
import ViewContainer from '@/views/ViewContainer'

const DEBUG = process.env.NODE_ENV === 'development'

export default {
  name: 'ViewGame',
  components: {
    Intro,
    Enigme3,
    Enigme2,
    Enigme1,
    Outro,
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
