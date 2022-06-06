/*import { Howl } from 'howler'

export function soundPlayer({ name }) {
  if (name) {
    let audio = new Audio(name)
    audio.play()
  }

  let sound = new Howl({
    src: this.soundSrc,
    autoplay: true,
    volume: 0.5
  })

  sound.play()
}*/

class SoundPlayer {
  constructor(name, opts) {
    this.name = name
    this.opts = {
      autoplay: true,
      volume: 0.5,
      ...opts
    }
    this.sound = null

    this.init()
  }

  init() {
    console.log('name :', this.name, 'opts', this.opts)
    //if (!this.scrollWith || !this.container) return
    this.play()
  }

  play() {
    console.log('name :', this.name, 'opts', this.opts)
  }
}

export default SoundPlayer
