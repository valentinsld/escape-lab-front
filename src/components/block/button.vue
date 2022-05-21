<template>
  <button class="button" :class="'-' + color" @click="onClick">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true
    },
    onClick: {
      type: Function,
      default() {
        return () => {}
      }
    },
    color: {
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>
