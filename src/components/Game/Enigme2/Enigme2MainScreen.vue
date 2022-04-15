<template>
  <div>
    <h1>Enigme 2 MainScreen</h1>
  </div>
</template>

<script>
export default {
  name: 'Enigme2MainScreen',
  sockets: {
    startEnigme: function () {
      this.start()
    }
  },
  methods: {
    start() {
      console.log('START ENIGME')
    }
  }
}
</script>
