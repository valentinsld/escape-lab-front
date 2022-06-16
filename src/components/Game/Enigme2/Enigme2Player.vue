<template>
  <div class="main">
    <Enigme2Restart v-if="showFailure" />

    <div ref="progress" class="progress"></div>
    <p class="indicationSPam">{{ isFirstPlayer ? 'SPAM' : 'NON SPAM' }}</p>
    <!-- <button v-if="isFirstPlayer" @click="sendPopup">Envoyer au Joueur 2</button> -->
    <Enigme2PopupStack class="popup" :cards="cards"></Enigme2PopupStack>
  </div>
</template>

<script>
import Enigme2PopupStack from '@/components/Game/Enigme2/Enigme2PopupStack.vue'
import Enigme2Restart from '@/components/Game/Enigme2/restart/Enigme2PlayerRestart.vue'
import { STATE as S } from '@/store/helpers'

export default {
  name: 'Enigme2Player',
  components: {
    Enigme2PopupStack,
    Enigme2Restart
  },
  data: function () {
    return {
      showPopup: false,
      isFirstPlayer: this.$store.state[S.typeScreen] === 'Player1',
      cards: [],
      showFailure: false,
      coundtDown: null
    }
  },
  mounted() {
    this.defineIdentity()
  },
  beforeDestroy() {
    clearInterval(this.coundtDown)
  },
  methods: {
    getPopupsData(data) {
      this.cards = data
      // console.log(JSON.stringify(this.cards))
    },
    sendPopup() {
      if (this.$store.state[S.typeScreen] === 'Player1') {
        this.showPopup = false
      }
      this.$socket.emit('p2pPopup')
    },
    defineIdentity() {
      // alert(this.$store.state[S.typeScreen])
    },
    destroyPopup() {
      this.showPopup = false
      this.$socket.emit('sendPopupToPlayer')
    },
    createPopup() {
      this.showPopup = true
    },
    startTimer(time) {
      //ref to progress inner
      const interval = 100
      let timer = 0
      this.coundtDown = setInterval(() => {
        timer = timer + interval
        let progressWidth = (timer / time) * 100
        if (timer < time) {
          this.$refs.progress.style.width = `${progressWidth}%`
        } else {
          clearInterval(this.coundtDown)
          this.$refs.progress.style.width = '0%'
          // alert('enigme terminée')
        }
      }, interval)
    }
  },
  sockets: {
    'enigme2-sendPopups': function (props) {
      this.getPopupsData(props)
    },
    'enigme2-timer': function ({ timer }) {
      this.startTimer(timer)
    },
    'enigme2-endSort': function ({ success }) {
      success ? this.$store.state[S.sounds]?.['success'].play() : this.$store.state[S.sounds]?.['failure'].play()
      setTimeout(() => {
        this.showFailure = !success
      }, 4500)
    },
    'enigme2-restart': function () {
      this.cards = []
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--color-enigme2);
  border: var(--color-black) solid 1px;
}

// .main.progress {
//   position: relative;
// }

.progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}

.indicationSPam {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  margin: 0;
  font-size: 2em;
  font-weight: var(--weight-bold);
  color: var(--color-white);
  background-color: hsla(229, 100%, 65%, 0.5);
}
</style>
