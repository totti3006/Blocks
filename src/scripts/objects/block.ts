import BlockAnimation from '../animation/BlockAnimation'
import { IBlockConstructor } from '../interfaces/block.interface'

export class Block extends Phaser.GameObjects.Sprite {
  private blockType: number
  private isDying: boolean
  private isScaling: boolean

  private animation: BlockAnimation

  constructor(aParams: IBlockConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.type)

    this.blockType = aParams.type
    this.isDying = false
    this.isScaling = false
    this.animation = new BlockAnimation(this)

    this.initSprite()
    this.scene.add.existing(this)
  }

  update(): void {
    if (this.isDying) {
      this.alpha -= 0.02
      if (!this.isScaling) {
        this.isScaling = true
        this.animation.playScale()
      }

      if (this.alpha === 0) {
        this.animation.playExplodeEmitter()
        this.isDying = false
        this.isScaling = false
        this.setType(0)
        this.setAlpha(1)
      }
    }
  }

  private initSprite() {
    this.setFrame(this.blockType)
    this.setOrigin(0.5, 0.5)
  }

  public getType(): number {
    return this.blockType
  }

  public setType(id: number): void {
    this.blockType = id
    this.setFrame(this.blockType)
  }

  public activateDead(): void {
    this.isDying = true
  }

  public getDead(): boolean {
    return this.isDying
  }

  public getColor(): string {
    let type: number = this.getType()

    if (type === 2) return 'red'
    if (type === 3) return 'blue'
    return 'green'
  }

  public playScaleAnimation(): void {
    this.animation.playScale()
  }

  public playJumpAnimation(): void {
    this.animation.playJump()
  }

  public resetAnimation(): void {
    this.animation = new BlockAnimation(this)
  }
}
