<template>
  <div v-if="product" class="annonce-product">
    <h2 v-if="product.name" class="annonce-product__title" v-html="product.name" />
    <img v-if="product.img" class="annonce-product__img" :src="getSource" />
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
  computed: {
    getSource() {
      return require(`@/assets/images/enigme3/annonce-product/${this.product.img}.png`)
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
