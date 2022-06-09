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
  [ACTIONS.initScene]({ state, commit, dispatch }, { width, height, el }) {
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

      dispatch(ACTIONS.initPopup)

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
      obj.position.set(0, 0, 0)

      console.log(props, 'content')

      const FONTS = {
        regular: '/fonts/grenadine-regular.otf',
        medium: '/fonts/grenadine-medium.otf',
        bold: '/fonts/grenadine-bold.otf'
      }

      // HANDLE TEXTS
      const from = new Text()
      const subject = new Text()
      const text = new Text()
      state.scene.add(from)
      state.scene.add(subject)
      state.scene.add(text)

      from.text = props.content.from
      from.font = FONTS['medium']
      from.fontSize = 0.3
      from.anchorX = 'left'
      from.position.x = -4
      from.position.z = 0.2
      from.position.y = 2
      from.color = 0x000000

      subject.text = props.content.subject
      subject.font = FONTS['medium']
      subject.fontSize = 0.3
      subject.anchorX = 'left'
      subject.position.x = -4
      subject.position.z = 0.2
      subject.position.y = 1.4
      subject.color = 0x000000

      text.text = props.content.text
      text.font = FONTS['medium']
      text.fontSize = 0.35
      text.anchorX = 'left'
      text.anchorY = 'top'
      text.lineHeight = 1.5
      text.position.x = -4
      text.maxWidth = 8
      text.position.z = 0.2
      text.position.y = 0.5
      text.color = 0x000000

      // Update the rendering:
      from.sync()
      subject.sync()
      text.sync()

      popup.add(obj)
      popup.add(from)
      popup.add(subject)
      popup.add(text)

      popup.isTriggered = false
      popup.triggerId = props.content.id
      popup.position.set(0, 10, 0)

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
      if (e.isTriggered) e.position.y -= 0.05
    })
    state.renderer.render(state.scene, state.camera)
  }
}

export default {
  state: state,
  mutations: mutations,
  actions: actions
}
