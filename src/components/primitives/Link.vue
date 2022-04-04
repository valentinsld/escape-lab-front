<template>
  <a
    ref="link"
    :class="`link ${variant ? `link--${variant}` : ''}`"
    :href="href"
    v-bind="external ? { target: '_blank', rel: 'noopener' } : {}"
    @click="onClick"
    ><slot><span v-html="label"></span></slot
  ></a>
</template>

<script>
export default {
  name: 'Link',
  props: {
    href: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    onClick: {
      type: Function,
      default: () => () => {}
    },
    external: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'strong'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss">
.link {
  @include f-link();

  color: var(--color-text-link);

  &:hover {
    color: var(--color-text-link-hover);
  }
}
</style>
