<template>
  <div class="view" :class="`view--${name}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ViewContainer',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  position: relative;
}
</style>
