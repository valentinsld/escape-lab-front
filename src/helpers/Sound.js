import { Howl } from 'howler'

// can be use with new Sound('name', { volume: 0.3, isLoop: true })
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
      preload: true,
      onend: () => {
        if (!this.opts.isLoop) return
        setTimeout(() => this.play(), this.opts.timeBeforeLoop)
      },
      ...this.opts
    })
  }

  soundSrc() {
    if (!this.name) return
    const audio = 'sounds/' + this.name
    return [audio + '.webm', audio + '.mp3']
  }

  play() {
    this.sound.fade(0, this.opts.volume, 0)
    this.sound.play()
  }

  stop(fadeDelay) {
    const fadeTime = fadeDelay >= 0 ? fadeDelay : 1500
    this.sound.fade(this.opts.volume, 0, fadeTime)
    setTimeout(() => this.sound.stop(), fadeTime)
  }

  pause(fadeDelay) {
    const fadeTime = fadeDelay >= 0 ? fadeDelay : 1500
    this.sound.fade(this.opts.volume, 0, fadeTime)
    setTimeout(() => this.sound.pause(), fadeTime)
  }
}

export default Sound
