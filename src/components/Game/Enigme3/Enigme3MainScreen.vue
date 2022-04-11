<template>
  <div v-if="product" class="annonce-product">
    <h2 v-if="product.name" class="annonce-product__title" v-html="product.name" />
    <p v-if="product.img" class="annonce-product__img" v-html="product.img" />
    <p v-if="product.description" class="annonce-product__description" v-html="product.description" />
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
  }
}
</script>
