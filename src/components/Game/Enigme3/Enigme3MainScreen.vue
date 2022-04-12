<template>
  <div v-if="product" class="annonce-product">
    <h2 v-if="product.name" class="annonce-product__title" v-html="product.name" />
    <p v-if="product.img" class="annonce-product__img" v-html="product.img" />
    <p v-if="product.description" class="annonce-product__description" v-html="product.description" />
  </div>
</template>

<script>
import { enigme3Data } from '@/data/enigme3'

export default {
  name: 'Enigme3MainScreen',
  props: {
    trueRules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      product: null,
      products: enigme3Data().products
    }
  },
  mounted() {
    this.generateAnnonce()
  },
  methods: {
    generateAnnonce() {
      // select random product
      const product = this.products[Math.floor(Math.random() * this.products.length)]
      // check if has normal or bot image
      const image = this.trueRules.some((obj) => obj.slug === 'stock') ? product.botImg : product.normalImg
      // check rules to see
      this.product = { name: product.name, description: product.description, img: image }
    }
  }
}
</script>
<style lang="scss" scoped>
.annonce-product {
  border: 5px solid var(--color-black);
}
</style>
