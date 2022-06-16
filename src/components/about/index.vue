<template>
  <div :class="{ about: true, '-see': see }">
    <div class="about__content screenContainer">
      <button class="content__close" @click="hideModal">
        <img class="content__img" :src="Cross" />
      </button>

      <img class="content__img" :src="Logo" />
      <p class="content__presentation">
        ClicClack est un projet réalisé par une équipe d’étudiants en Master Design et Management de l’Innovation
        Interactive à Gobelins, l’école de l’Image, pour leur jury de fin d’année.
      </p>

      <p class="content__equipe">
        <b>Design :</b> <a href="https://www.behance.net/axelcrb" targets="_blank">Axel Crouilbois</a> et
        <a href="http://lisalevavasseur.fr/" target="_blank">Lisa Levavasseur</a>
      </p>
      <p class="content__equipe">
        <b>Développement :</b> <a href="https://www.timblanchard.com/" target="_blank">Timothée Blanchard</a>,
        <a href="https://www.valentinsld.fr/" target="_blank">Valentin Salaud</a> et
        <a href="https://github.com/anorev" target="_blank">Robin Verona</a>
      </p>
      <p class="content__equipe">
        <b>Remerciement :</b> <a href="https://adrienmelchior.fr/" target="_blank">Adrien Melchior</a>
      </p>
    </div>

    <img class="about__gobelins" :src="Gobelins" />
  </div>
</template>

<script>
import Cross from '@/assets/cross.svg'
import Gobelins from '@/assets/gobelins.svg'
import Logo from '@/assets/logo.svg'
import Button from '@/components/block/button.vue'

export default {
  name: '',
  components: {
    Button
  },
  props: {
    see: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // images
      Logo,
      Gobelins,
      Cross
    }
  },
  methods: {
    hideModal() {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
