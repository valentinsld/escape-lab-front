/* eslint-disable unused-imports/no-unused-vars */
<template>
  <div class="main">
    <h1>Enigme 2 MainScreen</h1>
    <button @click="createPopup">Start</button>
    <div v-if="showPopup" class="popup">
      <span>Popup</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Enigme2MainScreen',
  data: function () {
    return {
      showPopup: false
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
      setTimeout(() => {
        this.destroyPopup()
        this.$socket.emit('popupIsReady')
      }, 1500)
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
  border: black solid 1px;
}

.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 280px;
  color: blue;
  border: blue solid 3px;
  border-radius: 30px;
  // display: none;
}
</style>
