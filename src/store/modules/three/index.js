import Anime from 'animejs'
import * as Three from 'three'
import { AmbientLight, DirectionalLight } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Text } from 'troika-three-text'
import Vue from 'vue'
import Vuex from 'vuex'

import { ACTIONS, GETTERS, MUTATIONS, STATE } from '@/store/modules/three/helpers'

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
    state[STATE.camera] = new Three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000)
    state[STATE.camera].position.z = 7.5
  },
  [MUTATIONS.setCamPosition](state, { x, y, z }) {
    if (state.camera) {
      state.camera.position.set(x, y, z)
    }
  },
  [MUTATIONS.triggerPopup](state, id) {
    state[STATE.popups][id].isTriggered = true
  }
}

export const getters = {
  [GETTERS.getPopupArrayIndex]: (state) => (triggeredId) =>
    state.popups.findIndex((obj) => {
      return obj.triggerId === triggeredId
    })
}

export const actions = {
  [ACTIONS.initScene]({ state, commit }, { width, height, el }) {
    return new Promise((resolve) => {
      commit(MUTATIONS.initCam)

      state.scene = new Three.Scene()

      let lightA = new DirectionalLight(0xffffff, 0.1)
      lightA.position.set(1, 1, 1)
      state.scene.add(lightA)

      let ambientLight = new AmbientLight(0xffffff, 0.1)
      state.scene.add(ambientLight)

      const geometry = new Three.PlaneBufferGeometry(17, 8.7, 1, 1)

      const material = new Three.MeshPhongMaterial({
        colorWrite: false
      })
      const plane = new Three.Mesh(geometry, material)
      plane.position.set(0, 5, 0)
      state.scene.add(plane)

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
      obj.rotation.set(0, -Math.PI * 0.5, 0)
      obj.position.set(0, 0, 0)
      obj.children[0].receiveShadow = true
      obj.children[0].castShadow = true

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

      //from.text = 'Caf de Paris (noreply@emailing.caf.fr)'
      from.text = props.content.from
      from.font = FONTS['medium']
      from.fontSize = 0.3
      from.anchorX = 'left'
      from.position.x = -4
      from.position.z = 0.2
      from.position.y = 1.5
      from.color = 0x000000

      //subject.text = 'Déclarez vos revenus trimestriels'
      subject.text = props.content.subject
      subject.font = FONTS['medium']
      subject.fontSize = 0.3
      subject.anchorX = 'left'
      subject.position.x = -4
      subject.position.z = 0.2
      subject.position.y = 0.9
      subject.color = 0x000000

      text.text = props.content.text
      //text.text = 'Pour lire ce message en ligne, rendez-vous sur cette page. Ceci est un message automatique, merci de ne pas y répondre…'
      text.font = FONTS['medium']
      text.fontSize = 0.35
      text.anchorX = 'left'
      text.anchorY = 'top'
      text.lineHeight = 1.5
      text.position.x = -4
      text.maxWidth = 8
      text.position.z = 0.2
      text.position.y = 0
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
      /*popup.position.set(0, 0, 0)
      popup.rotation.set(0, 0, 0)*/
      popup.position.set(0.2, 3, -8)
      popup.rotation.set(-Math.PI * 0.5, 0, 0)

      state.popups.push(popup)
      state.scene.add(popup)

      //dispatch(ACTIONS.animatePopup)
    })
    state.renderer.render(state.scene, state.camera)
  },
  [ACTIONS.animatePopup]({ state }, props) {
    console.log(props, state.popups, 'popup animate')
    let duration = 5000
    Anime({
      targets: [state.popups[props.id].position],
      keyframes: [
        // popup descend
        { y: -2, duration: duration * 0.1, easing: 'easeInOutCubic' },
        // popup avance et rotate
        { z: -3, y: -2.5, x: 0.8, duration: duration * 0.3 },
        // popup descend
        { y: -6, duration: duration * 0.5 },
        { y: -13, duration: duration * 0.1, easing: 'easeInExpo' }
      ],
      easing: 'linear',
      duration: duration
    })
    Anime({
      targets: [state.popups[props.id].rotation],
      keyframes: [
        // popup descend
        { duration: duration * 0.1 },
        // popup avance et rotate
        { x: 0, y: 0.02, duration: duration * 0.3, easing: 'easeInQuint' },
        // popup descend
        { x: 0, duration: duration * 0.6 }
      ],
      easing: 'linear',
      duration: duration
    })
  },
  [ACTIONS.animate]({ dispatch, state }) {
    window.requestAnimationFrame(() => {
      dispatch(ACTIONS.animate)
    })
    state.renderer.render(state.scene, state.camera)
  }
}

export default {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
