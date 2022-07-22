import CursorAnimation from '../animation/CursorAnimation'
import { CONST } from '../const/const'
import { ICursorConstructor } from '../interfaces/cursor.interface'

export class Cursor extends Phaser.GameObjects.Image {
  private currentPosition: [number, number]
  private activated: boolean

  private animation: CursorAnimation

  constructor(aParams: ICursorConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.cursorStartPosition)

    this.currentPosition = aParams.cursorStartPosition
    this.initVariables()
    this.initImage()

    this.scene.add.existing(this)

    this.animation = new CursorAnimation(this)
  }

  private initVariables(): void {
    this.activated = false
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5)
  }

  public moveTo(x: number, y: number): void {
    this.currentPosition = [x, y]
    this.setPosition(x * CONST.tileSize + CONST.tileSize * 0.5, y * CONST.tileSize + CONST.tileSize * 0.5)
  }

  public getX(): number {
    return this.currentPosition[0]
  }

  public getY(): number {
    return this.currentPosition[1]
  }

  public isActivated(): boolean {
    return this.activated
  }

  public setActivated(): void {
    this.activated = !this.activated

    if (this.activated) this.animation.playScaleAnimation()
    else this.animation.stopScaleAnimation()
  }
}
