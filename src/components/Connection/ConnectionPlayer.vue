<template>
  <div class="container">
    <div
      :class="{
        homeContainer: true,
        '-see': seeHome
      }"
    >
      <div class="home screenContainer">
        <img class="home__img" :src="Logo" />
        <img class="home__fakeVideo" :src="FakeVideo" />
        <p class="home__text">
          Clic Clack nécessite un écran principal et deux smartphones : merci de vous connecter aussi sur desktop pour
          créer une room
        </p>
        <Button text="Commencer l’expérience" :on-click="goToConnection" />
      </div>
    </div>

    <div class="connection screenContainer">
      <img class="connection__img" :src="Logo" />

      <div class="connection__content">
        <div v-if="!idRoom">
          <p class="content__text">
            Veuillez entrer le code de partie qui s’affiche sur l’écran principal pour rejoindre la room :
          </p>
          <div class="content__inputs">
            <input v-for="i in 4" :key="i" ref="inputIdRoom" maxlength="1" />
          </div>
          <p v-if="errorId" class="content__inputsError">{{ errorId }}</p>
          <p class="content__text">Ou scannez le QR code affiché sur l’écran principal</p>
          <Button text="Connect to room" :on-click="connectToRoom" />
        </div>

        <div v-else-if="!(listUsers.player1 && listUsers.player2)">
          <img class="content__check" :src="ConnectionCHeck" />
          <p class="content__checkText">
            Vous etes connecté à la room <span>{{ idRoom }}</span>
          </p>
          <p>En attente du second joueur</p>
        </div>

        <div v-else-if="!playerIsReady.includes(socketID)">
          <p>Etes vous prêt ?</p>
          <Button text="Je suis prêt !!" :on-click="isReady" />
        </div>

        <p v-else>En attente de votre coéquipier</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ConnectionCHeck from '@/assets/connection-check.svg'
import FakeVideo from '@/assets/FakeVideo.svg'
import Logo from '@/assets/logo.svg'
import Button from '@/components/block/button.vue'
import Sound from '@/helpers/Sound'
import { STATE as S } from '@/store/helpers'
import { MUTATIONS as M } from '@/store/helpers'
import { STATE_SCREEN } from '@/store/helpers'

const getIdRoomFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search)

  if (searchParams.has('room')) {
    return searchParams.get('room')
  }
  return ''
}

const IS_DEV = process.env.NODE_ENV === 'development' && !process.env.VUE_APP_LOAD_SOCKETS_FROM_PROD

export default {
  name: 'ConnectionPlayer',
  components: {
    Button
  },
  data() {
    return {
      Logo,
      FakeVideo,
      ConnectionCHeck,
      idRoomFromUrl: getIdRoomFromUrl(),
      errorId: '',
      seeHome: true
    }
  },
  computed: mapState({
    idRoom: (state) => state[S.idRoom],
    listUsers: (state) => state[S.listUsers],
    socketID: (state) => state[S.socketID],
    playerIsReady: (state) => state[S.playerIsReady]
  }),
  sockets: {
    startGame: function () {
      this.$store.commit(M.stepGame, 'Intro')
      this.$router.push('/game')
    },
    playerIsReady: function (data) {
      this.$store.commit(M.playerIsReady, data)
    },
    errorInputs: function ({ error }) {
      console.log('errorInputs', error)
      this.errorId = error
    }
  },
  mounted() {
    this.$socket.emit('connection')

    if (this.$data.idRoomFromUrl) {
      this.connectToRoom()
    }

    // Si c'est en developpement se connecter direct à la room
    if (IS_DEV) {
      this.connectToRoom(null, 'dev1')
    }

    this.initInputs()
  },
  methods: {
    goToConnection() {
      new Sound('select-3', { volume: 0.3 })
      this.$data.seeHome = false
    },

    initInputs() {
      const inputs = [...this.$refs.inputIdRoom]

      inputs.forEach((input, index) => {
        input.lastValue = ''

        input.addEventListener('keyup', (e) => {
          if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(input.value)) {
            return (input.value = '')
          }

          // valeur rentrer -> next
          if (input.value.length === input.maxLength && index < 3) {
            inputs[index + 1].focus()
          }

          // si vide est retour -> previous
          var x = e.charCode || e.keyCode
          if ((x == 8 || x == 46) && input.lastValue.length === 0 && index !== 0) {
            inputs[index - 1].focus()
          }

          input.lastValue = input.value

          // last auto connect
          if (index === 3 && !(x == 8 || x == 46)) {
            this.connectToRoom()
          }
        })
      })
    },

    connectToRoom(ev, id = null) {
      this.goToConnection()

      const idFromInputs = this.$refs.inputIdRoom.map((e) => e.value).join('')
      const idRoom = id || idFromInputs

      if (idRoom.length < 4) {
        this.errorId = 'Le code de la room est trop court'
        return
      }

      const loginData = {
        isMainScreen: this.$store.state[S.stateScreen] === STATE_SCREEN.mainScreen,
        isPlayer: this.$store.state[S.stateScreen] === STATE_SCREEN.player,
        idRoom
      }
      // console.log(loginData)
      this.$socket.emit('connectToRoom', loginData)
    },
    isReady() {
      console.log('isReady !!!')
      new Sound('validation', { volume: 0.3 })
      this.$socket.emit('isReady')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './ConnectionPlayer';
</style>
