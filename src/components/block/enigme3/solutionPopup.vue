<template>
  <div class="solution-popup">
    <div class="solution-popup__overlay" />
    <div class="solution-popup__container">
      <p class="solution-popup__answer" v-html="getContent" />
      <div v-if="!isSuccess" class="solution-popup__rules">
        <p v-for="(rule, item) in trueRules" :key="item" v-html="`- ${rule.name}`" />
      </div>
      <button class="solution-popup__button" @click="nextStep">{{ isSuccess ? 'Suivant' : 'Recommencer' }}</button>
    </div>
  </div>
</template>

<script>
import { solution } from '@/data/enigme3'
import Sound from '@/helpers/Sound'

export default {
  name: 'SolutionPopup',
  props: {
    trueRules: {
      type: Array,
      default: () => []
    },
    isSuccess: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      solution: solution
    }
  },
  computed: {
    getContent() {
      return this.isSuccess ? this.solution.success : this.solution.fail
    }
  },
  mounted() {
    this.isSuccess ? new Sound('success', { volume: 0.5 }) : new Sound('failure', { volume: 0.7 })
    console.log(this.isSuccess, 'success')
  },
  methods: {
    nextStep() {
      new Sound('validation', { volume: 0.3 })
      if (this.isSuccess) {
        this.$socket.emit('nextEnigme')
      } else {
        this.$socket.emit('enigme3-restart')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.solution-popup {
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
}

.solution-popup__container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75%;
  padding: 2em 1em;
  background: white;
  border: 5px solid var(--color-black);
  border-radius: 30px;
  transform: translate(-50%, -50%);
}

.solution-popup__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: 300ms var(--custom-bezier);
}

.solution-popup__answer {
  margin-bottom: 20px;
  font-size: 18px;
}

.solution-popup__button {
  display: block;
  padding: 1em;
  margin: auto;
  font-weight: bold;
  color: #f8f8f8;
  background: #3577f5;
  border: 4px solid var(--color-black);
  border-radius: 27px;
}

.solution-popup__rules {
  margin-bottom: 30px;

  p {
    margin: 10px 0 1.5em;
    font-weight: bold;
    text-align: center;
  }
}
</style>
