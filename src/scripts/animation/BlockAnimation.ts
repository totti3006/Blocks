import { Block } from '../objects/block'

class BlockAnimation {
  private scene: Phaser.Scene
  private source: Block

  private explodeEmitterManager: Phaser.GameObjects.Particles.ParticleEmitterManager
  private explodeEmitter: Phaser.GameObjects.Particles.ParticleEmitter

  private scaleTween: Phaser.Tweens.Tween
  private jumpTween: Phaser.Tweens.Tween

  constructor(source: Block) {
    this.source = source
    this.scene = source.scene

    this.initEmitter(source.getColor())

    this.createExplodeEmitter()
    this.createScaleTween()
    this.createJumpTween()
  }

  private initEmitter(color: string): void {
    this.explodeEmitterManager = this.scene.add.particles(color)
  }

  private createScaleTween(): void {
    this.scaleTween = this.scene.add.tween({
      targets: this.source,
      scale: 1.8,
      duration: 600,
      repeat: 0,
      ease: 'Sine.easeInOut',
      paused: true,
      onComplete: () => {
        this.source.setScale(1)
      }
    })
  }

  private createJumpTween(): void {
    this.jumpTween = this.scene.add.tween({
      targets: this.source,
      y: { from: this.source.y, to: this.source.y - 3 },
      duration: 100,
      yoyo: true,
      repeat: 0,
      paused: true
    })
  }

  private createExplodeEmitter(): void {
    this.explodeEmitter = this.explodeEmitterManager.createEmitter({
      speed: { min: 100, max: 150 },
      angle: { start: 0, end: 360, steps: 10 },
      scale: {
        start: 0.1,
        end: 0
      },
      lifespan: 300,
      blendMode: 'ADD',
      on: false
    })
  }

  public playExplodeEmitter(): void {
    let x: number = this.source.x
    let y: number = this.source.y

    this.explodeEmitter.explode(10, x, y)
  }

  public playScale(): void {
    this.scaleTween.play()
  }

  public playJump(): void {
    this.jumpTween.play()
  }
}

export default BlockAnimation
