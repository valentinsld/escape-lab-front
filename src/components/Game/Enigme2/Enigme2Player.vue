<template>
  <div>
    <h1>Enigme 2 Player</h1>
  </div>
</template>

<script>
export default {
  name: 'Enigme2Player',
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
