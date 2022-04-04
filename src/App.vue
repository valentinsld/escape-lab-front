<template>
  <div id="app">
    <h1>Le lab de l'arnaque</h1>
    <Sample text="sample component" />
  </div>
</template>
<script>
import Sample from '@/components/Sample'
export default {
  name: 'App',
  comments: {
    Sample
  },
  components: { Sample }
}
</script>

<style>
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
