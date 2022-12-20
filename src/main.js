import './registerServiceWorker'

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
    debug: false, // process.env.NODE_ENV === 'development'
    connection: SocketIO(
      process.env.NODE_ENV === 'development' && !process.env.VUE_APP_LOAD_SOCKETS_FROM_PROD
        ? 'http://localhost:5050/'
        : 'https://click-clack-back.onrender.com/',
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
