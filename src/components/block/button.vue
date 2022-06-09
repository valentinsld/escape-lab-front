<template>
  <button class="button" :class="'-' + color" :disabled="disabled" @click="onClick">
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
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>
