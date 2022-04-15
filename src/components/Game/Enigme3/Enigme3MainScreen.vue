<template>
  <div>
    <h1>Enigme 3 MainScreen</h1>
  </div>
</template>

<script>
export default {
  name: 'Enigme3MainScreen',
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
