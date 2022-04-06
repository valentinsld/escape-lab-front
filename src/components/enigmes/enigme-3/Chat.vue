<template>
  <div class="chat">
    <p class="chat__title">Chat interface</p>
    <div class="chat__choices">
      <div v-if="choices[0]" v-html="choices[0]"></div>
      <div v-if="choices[1]" v-html="choices[1]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      choices: []
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.chat {
  background: var(--color-grey-light);
}
</style>
