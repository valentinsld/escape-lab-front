<template>
  <div id="app" class="app">
    <h1>Le lab de l'arnaque</h1>

    <!-- Views -->
    <transition name="fade-page" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'scss/app';

#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
