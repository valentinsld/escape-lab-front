<template>
  <div>
    <h1>Enigme 1 Player2</h1>
  </div>
</template>

<script>
export default {
  name: 'Enigme1Player2',
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
