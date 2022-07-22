import { Cursor } from '../objects/cursor'

class CursorAnimation {
  private scene: Phaser.Scene
  private source: Cursor

  private scaleTween: Phaser.Tweens.Tween

  constructor(source: Cursor) {
    this.source = source
    this.scene = source.scene

    this.createScaleTween()
  }

  private createScaleTween(): void {
    this.scaleTween = this.scene.add.tween({
      targets: this.source,
      scale: 0.9,
      duration: 200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      paused: true,
      onStop: () => {
        this.source.setScale(1)
      }
    })
  }

  public playScaleAnimation(): void {
    this.scaleTween.play()
  }

  public stopScaleAnimation(): void {
    this.scaleTween.stop()
  }
}

export default CursorAnimation
