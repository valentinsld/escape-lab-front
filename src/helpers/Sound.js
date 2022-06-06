import { Howl } from 'howler'

class Sound {
  constructor(name, opts) {
    this.name = name
    this.opts = {
      volume: opts.volume || 0.5,
      isLoop: opts.isLoop || false,
      timeBeforeLoop: opts.timeBeforeLoop || 0,
      ...opts
    }
    this.sound = null

    this.init()
  }

  init() {
    this.sound = new Howl({
      src: this.soundSrc(),
      onend: () => {
        if (!this.opts.isLoop) return
        setTimeout(() => this.play(), this.opts.timeBeforeLoop)
      },
      ...this.opts
    })
    this.play()
  }

  soundSrc() {
    if (!this.name) return
    const audio = 'sounds/' + this.name
    return [audio + '.webm', audio + '.mp3']
  }

  play() {
    this.sound.play()
    console.log('sound', this.sound, 'name 2:', this.name, 'opts 2', this.opts)
  }
}

export default Sound
