<template>
  <div>
    <h1>Enigme 1 MainScreen</h1>
  </div>
</template>

<script>
export default {
  name: 'Enigme1MainScreen',
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
