import Vue from 'vue'
import Vuex from 'vuex'

import { MUTATIONS, STATE, STATE_SCREEN } from '@/store/helpers'
import threeStore from '@/store/modules/three'

Vue.use(Vuex)

export const state = {
  [STATE.windowH]: window.innerHeight,
  [STATE.windowW]: window.innerWidth,
  [STATE.myState]: 0,
  [STATE.stateScreen]: !/iPhone|iPod|Android/i.test(navigator.userAgent)
    ? STATE_SCREEN.mainScreen
    : STATE_SCREEN.player,
  [STATE.typeScreen]: null,
  [STATE.socketID]: null,
  [STATE.idRoom]: null,
  [STATE.listUsers]: {},
  [STATE.playerIsReady]: [],
  [STATE.isStart]: false,
  [STATE.stepGame]: null,
  // enigme 3
  [STATE.enigme3Config]: null
}

export const mutations = {
  [MUTATIONS.windowH](state) {
    state[STATE.windowH] = window.innerHeight
  },
  [MUTATIONS.windowW](state) {
    state[STATE.windowW] = window.innerWidth
  },
  [MUTATIONS.myState](state, newVal) {
    state[STATE.myState] = newVal
  },
  [MUTATIONS.stateScreen](state, newVal) {
    state[STATE.stateScreen] = newVal
  },
  [MUTATIONS.typeScreen](state, newVal) {
    state[STATE.typeScreen] = newVal ? newVal.charAt(0).toUpperCase() + newVal.slice(1) : null
  },

  [MUTATIONS.socketID](state, newVal) {
    state[STATE.socketID] = newVal
  },
  [MUTATIONS.idRoom](state, newVal) {
    state[STATE.idRoom] = newVal
  },
  [MUTATIONS.listUsers](state, newVal) {
    state[STATE.listUsers] = newVal
  },
  [MUTATIONS.playerIsReady](state, newVal) {
    state[STATE.playerIsReady] = newVal
  },
  [MUTATIONS.isStart](state, newVal) {
    state[STATE.isStart] = newVal
  },

  [MUTATIONS.stepGame](state, newVal) {
    state[STATE.stepGame] = newVal
  },
  // reset room
  [MUTATIONS.resetRoom](state) {
    state[STATE.idRoom] = null
    state[STATE.listUsers] = {}
    state[STATE.stepGame] = null
    state[STATE.typeScreen] = null
  },
  // enigme 3
  [MUTATIONS.enigme3Config](state, newVal) {
    state[STATE.enigme3Config] = newVal
  }
}
export const getters = {}

export default new Vuex.Store({
  modules: {
    three: threeStore
  },
  state: state,
  mutations: mutations,
  getters: getters
})
