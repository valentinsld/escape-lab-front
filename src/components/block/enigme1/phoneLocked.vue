<template>
  <div>
    <h3>Phone locked</h3>

    <div v-if="called">
      <p><strong>Un appel manqué</strong></p>
      <p>+251 8 34 87 18 31 Peut-être : LaPorte Service</p>

      <button @click="recall">Rappeler</button>
    </div>

    <div v-if="message">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneLocked',
  props: {
    called: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    recall() {
      console.log('recall !!')
    }
  }
}
</script>
