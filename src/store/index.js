import * as Three from 'three'
import Vue from 'vue'
import Vuex from 'vuex'

import { MUTATIONS, STATE, STATE_SCREEN } from '@/store/helpers'

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
  [STATE.enigme3Config]: null,
  // THREE
  [STATE.camera]: null,
  [STATE.scene]: null,
  [STATE.renderer]: null,
  [STATE.mesh]: null
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
    state[STATE.typeScreen] = newVal.charAt(0).toUpperCase() + newVal.slice(1)
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
  },
  // THREE
  [MUTATIONS.initCam](state) {
    state[STATE.camera] = new Three.PerspectiveCamera(70, state[STATE.windowW] / state[STATE.windowH], 0.01, 10)
    state[STATE.camera].position.z = 1
  }
}
export const getters = {}

export const actions = {
  INIT_SCENE({ state, commit }, { width, height, el }) {
    return new Promise((resolve) => {
      commit(MUTATIONS.initCam)

      state.scene = new Three.Scene()

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      let material = new Three.MeshNormalMaterial()

      state.mesh = new Three.Mesh(geometry, material)
      state.scene.add(state.mesh)

      state.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true })
      state.renderer.setSize(width, height)

      el.appendChild(state.renderer.domElement)

      state.renderer.render(state.scene, state.camera)

      resolve()
    })
  },
  ANIMATE({ dispatch, state }) {
    window.requestAnimationFrame(() => {
      dispatch('ANIMATE')
    })
    // rotate cubes
    state.mesh.rotation.x += 0.01
    state.mesh.rotation.y += 0.02

    state.renderer.render(state.scene, state.camera)
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
})
