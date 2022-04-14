/* eslint-disable unused-imports/no-unused-vars */
<template>
  <div class="main">
    <h1>Enigme 2 MainScreen</h1>
    <button @click="createPopup">Start</button>
    <Enigme2PopupStack v-if="showPopup" class="popup" :cards="cards"></Enigme2PopupStack>
  </div>
</template>

<script>
import Enigme2Popup from '@/components/Game/Enigme2/Enigme2Popup.vue'
import Enigme2PopupStack from '@/components/Game/Enigme2/Enigme2PopupStack.vue'
export default {
  name: 'Enigme2MainScreen',
  components: {
    Enigme2Popup,
    Enigme2PopupStack
  },
  data: function () {
    return {
      showPopup: false,
      cards: [
        {
          keyword: 'Test 1'
        },
        {
          keyword: 'Test 2'
        },
        {
          keyword: 'Test 3'
        },
        {
          keyword: 'Test 4'
        }
      ]
    }
  },
  mounted() {
    this.$socket.emit('sendPopups')
    this.sockets.subscribe('sendPopups', (props) => {
      console.log(`props vaut :: ${props}`)
    })

    this.sockets.subscribe('popupIsReady', () => {
      // document.querySelector('.popup').style.display = 'none'
    })
  },
  methods: {
    destroyPopup() {
      this.showPopup = false
      this.$socket.emit('sendPopupToPlayer')
    },
    createPopup() {
      this.showPopup = true
      console.log(this.showPopup)
      // setTimeout(() => {
      //   this.destroyPopup()
      //   this.$socket.emit('popupIsReady')
      // }, 1500)
    }
  }
}
</script>

<style scoped>
/* .popup {
  border: black dotted 5px;
  height: 200px;
  width: 200px;
} */
</style>
