/* eslint-disable vue/no-multiple-template-root */
<template>
  <ViewContainer name="game">
    <Fader v-if="typeScreen !== mainScreen" />
    <Components :is="stepGame" />
    <VideoMainScreen v-if="typeScreen === mainScreen" />
  </ViewContainer>
</template>

<script>
import NoSleep from 'nosleep.js'
import { Pane } from 'tweakpane'
import { mapState } from 'vuex'

import Canvas from '@/components/Game/Canvas'
// enigmes
import Enigme1 from '@/components/Game/Enigme1/Enigme1'
import Enigme2 from '@/components/Game/Enigme2/Enigme2'
import Enigme3 from '@/components/Game/Enigme3/Enigme3'
import Fader from '@/components/Game/Fader.vue'
// intro
import Intro from '@/components/Game/Intro/Intro'
// outro
import Outro from '@/components/Game/Outro/Outro'
import VideoMainScreen from '@/components/Game/VideoMainScreen.vue'
// Stores
import { MUTATIONS as M } from '@/store/helpers'
import { STATE as S } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'
import ViewContainer from '@/views/ViewContainer'

// eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
const DEBUG = process.env.NODE_ENV === 'development'

export default {
  name: 'ViewGame',
  components: {
    Canvas,
    Intro,
    Enigme3,
    Enigme2,
    Enigme1,
    Outro,
    ViewContainer,
    VideoMainScreen,
    Fader
  },
  data() {
    return {
      pane: null,
      noSleep: null
    }
  },
  computed: mapState({
    typeScreen: (state) => state[S.typeScreen],
    stepGame: (state) => state[S.stepGame],
    mainScreen: () => STATE_SCREEN.mainScreen
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

    this.initNoSleep()
  },
  sockets: {
    setStepGame: function ({ stepGame }) {
      this.$store.commit(M.stepGame, stepGame)
    },
    endEnigme: function ({ stepGame }) {
      this.$store.commit(M.stepGame, stepGame)
    },
    buildEnigme: function ({ stepGame }) {
      this.$store.commit(M.stepGame, stepGame)
    }
  },
  beforeDestroy() {
    this.$data.pane?.remove()

    this.noSleep?.disable()
  },
  methods: {
    initPane() {
      if (/*!DEBUG || */ this.$store.state[S.stateScreen] !== STATE_SCREEN.mainScreen) return

      const pane = new Pane()
      this.$data.pane = pane

      pane
        .addButton({
          title: 'Enigme suivant'
        })
        .on('click', () => {
          this.$socket.emit('endEnigme')
        })

      pane
        .addButton({
          title: 'enigme 1'
        })
        .on('click', () => {
          this.$socket.emit('setStepGame', { stepGame: 1 })
        })

      pane
        .addButton({
          title: 'enigme 2'
        })
        .on('click', () => {
          this.$socket.emit('setStepGame', { stepGame: 2 })
        })

      pane
        .addButton({
          title: 'enigme 3'
        })
        .on('click', () => {
          this.$socket.emit('setStepGame', { stepGame: 3 })
        })

      pane
        .addButton({
          title: 'outro'
        })
        .on('click', () => {
          this.$socket.emit('setStepGame', { stepGame: 4 })
        })
    },
    initNoSleep() {
      this.noSleep = new NoSleep()

      this.noSleep.enable()
    }
  }
}
</script>

<style lang="scss" scoped></style>
