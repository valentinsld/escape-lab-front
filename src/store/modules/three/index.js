import * as Three from 'three'
import { AmbientLight, DirectionalLight } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Text } from 'troika-three-text'
import Vue from 'vue'
import Vuex from 'vuex'

import { ACTIONS, MUTATIONS, STATE } from '@/store/modules/three/helpers'

Vue.use(Vuex)

export const state = {
  [STATE.camera]: null,
  [STATE.scene]: null,
  [STATE.renderer]: null,
  [STATE.popup]: null,
  [STATE.popups]: []
}

export const mutations = {
  [MUTATIONS.initCam](state) {
    state[STATE.camera] = new Three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
    state[STATE.camera].position.z = 10
  },
  [MUTATIONS.setCamPosition](state, { x, y, z }) {
    if (state.camera) {
      state.camera.position.set(x, y, z)
    }
  },
  [MUTATIONS.triggerPopup](state, id) {
    state.popups.filter((e) => {
      if (e.triggerId === id) e.isTriggered = true
    })
  }
}

export const actions = {
  [ACTIONS.initScene]({ state, commit }, { width, height, el }) {
    return new Promise((resolve) => {
      commit(MUTATIONS.initCam)

      state.scene = new Three.Scene()

      let lightA = new DirectionalLight(0xffffff, 1.5)
      lightA.position.set(1, 1, 1)
      state.scene.add(lightA)

      let ambientLight = new AmbientLight(0xffffff, 1.5)
      state.scene.add(ambientLight)

      state.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true })
      state.renderer.setSize(width, height)

      el.appendChild(state.renderer.domElement)

      state.renderer.render(state.scene, state.camera)

      //dispatch(ACTIONS.initPopup)

      resolve()
    })
  },
  [ACTIONS.initPopup]({ state }, props) {
    let loader = new GLTFLoader()
    const popup = new Three.Group()
    loader.load('/assets/models/popup.gltf', (data) => {
      // HANDLE MODEL
      let obj = data.scene
      obj.rotation.set(0, Math.PI * 0.5, 0)
      obj.position.set(0, 9, 0)

      console.log(props, 'content')

      // HANDLE TEXT
      const text = new Text()
      state.scene.add(text)

      // Set properties to configure:
      text.text = props.content.text
      text.fontSize = 0.4
      text.position.z = 0.5
      text.position.y = 9
      text.color = 0x000000

      // Update the rendering:
      text.sync()

      popup.add(obj)
      popup.add(text)

      popup.isTriggered = false
      popup.triggerId = props.content.id

      state.popups.push(popup)
      state.scene.add(popup)
      console.log(popup, state.popups, 'popup')
    })
    state.renderer.render(state.scene, state.camera)
  },
  [ACTIONS.animate]({ dispatch, state }) {
    window.requestAnimationFrame(() => {
      dispatch(ACTIONS.animate)
    })
    state.popups.filter((e) => {
      if (e.isTriggered) e.position.y -= 0.02
    })
    state.renderer.render(state.scene, state.camera)
  }
}

export default {
  state: state,
  mutations: mutations,
  actions: actions
}
