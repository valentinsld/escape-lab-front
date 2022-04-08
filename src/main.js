import SocketIO from 'socket.io-client'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

import router from '@/router/routes'

import App from './App.vue'
import store from './store'

const optionsSocket = { transports: ['websocket'] }

Vue.config.productionTip = false

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(
      process.env.NODE_ENV === 'development' ? 'http://localhost:5050/' : 'https://escape-lab-back.herokuapp.com/',
      optionsSocket
    )
    // vuex: {
    //   store,
    //   actionPrefix: 'SOCKET_',
    //   mutationPrefix: 'SOCKET_'
    // }
  })
)

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
