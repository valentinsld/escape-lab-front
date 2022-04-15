<template>
  <div v-if="product" class="annonce-product">
    <h2 v-if="product.name" class="annonce-product__title" v-html="product.name" />
    <p v-if="product.img" class="annonce-product__img" v-html="product.img" />
    <p v-if="product.description" class="annonce-product__description" v-html="product.description" />
    <p v-if="product.subtype.text" v-html="product.subtype.text" />
  </div>
</template>

<script>
export default {
  name: 'Enigme3MainScreen',
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    console.log(this.product, 'product annonce')
  },
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
<style lang="scss" scoped>
.annonce-product {
  border: 5px solid var(--color-black);
}
</style>
