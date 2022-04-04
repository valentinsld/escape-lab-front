<template>
  <div class="sample">
    <h1 v-html="text"></h1>
  </div>
</template>

<script>
export default {
  name: 'Sample',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sample {
  h1 {
    color: red;
  }
}

h3 {
  margin: 40px 0 0;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
