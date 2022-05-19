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
  display: flex;
  height: calc(100 * var(--vh, 1vh)) !important;
  max-height: calc(100 * var(--vh, 1vh));
}
</style>
