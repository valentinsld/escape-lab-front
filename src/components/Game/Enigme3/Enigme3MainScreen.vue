<template>
  <div v-if="product" class="annonce-product">
    <div class="annonce-product__left-column">
      <div class="annonce-product__img-container">
        <img v-if="product.img" class="annonce-product__img" :src="getSource" />
      </div>
      <h2 v-if="product.name" class="annonce-product__title" v-html="product.name" />
      <h4 v-if="product.subtype.text" v-html="product.subtype.text" />
      <div v-if="product.description" class="annonce-product__description" v-html="product.description" />
    </div>
    <div class="annonce-product__right-column">
      <div class="annonce-product__sailer-name">
        <img src="@/assets/images/enigme3/sailer-profil.png" />
        <h3>Vendue par eric.mb19</h3>
      </div>
      <p>180 ventes</p>
      <p>0 avis</p>
      <p>Membre depuis moins d'un mois</p>
      <p>Répond en moyenne dans l'heure</p>
      <div v-if="product.criteria.good" class="annonce-product__criteria-container">
        <h3>Caractéristiques techniques</h3>
        <p v-for="(criteria, i) in product.criteria.good" :key="i" v-html="criteria" />
      </div>
    </div>
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
  display: flex;
  justify-content: space-around;
  padding: 2em;
  border: 5px solid var(--color-black);
}

.annonce-product__sailer-name {
  display: flex;
}
</style>
