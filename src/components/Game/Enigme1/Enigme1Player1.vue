<template>
  <div>
    <h1>Enigme 1 Player1</h1>
  </div>
</template>

<script>
export default {
  name: 'Enigme1Player1',
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
