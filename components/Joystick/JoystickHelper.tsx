export enum SwipeClassification {
  LeftSwipe,
  RightSwipe,
  DownSwipe,
  UpSwipe,
  UnclassifiedSwipe,
}

export type SwipeHandlersType = Record<SwipeClassification, () => void>;

export class JoystickHelper {
  static X_FORGIVENESS_RATIO = 25 / 100;
  static Y_FORGIVENESS_RATIO = 25 / 100;
  static X_DISPLACEMENT_THRESHOLD_RATIO = 75 / 200; // divided by 200 instead of by 2 because half of the screen
  static Y_DISPLACEMENT_THRESHOLD_RATIO = 75 / 200;

  private width: number;
  private height: number;
  private xForgiveness: number;
  private yForgiveness: number;
  private xDisplacementThreshold: number;
  private yDisplacementThreshold: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.xForgiveness = this.width * JoystickHelper.X_FORGIVENESS_RATIO;
    this.yForgiveness = this.height * JoystickHelper.Y_FORGIVENESS_RATIO;
    console.log(this.xForgiveness, this.yForgiveness);
    this.xDisplacementThreshold =
      this.width * JoystickHelper.X_DISPLACEMENT_THRESHOLD_RATIO;
    this.yDisplacementThreshold =
      this.height * JoystickHelper.Y_DISPLACEMENT_THRESHOLD_RATIO;
    console.log(this.xDisplacementThreshold, this.yDisplacementThreshold);
  }

  classify(x: number, y: number): SwipeClassification {
    if (
      Math.abs(x) <= this.xForgiveness &&
      y <= -1 * this.yDisplacementThreshold
    ) {
      return SwipeClassification.UpSwipe;
    } else if (
      Math.abs(x) <= this.xForgiveness &&
      y >= 1 * this.yDisplacementThreshold
    ) {
      return SwipeClassification.DownSwipe;
    } else if (
      x >= this.xDisplacementThreshold &&
      Math.abs(y) <= this.yForgiveness
    ) {
      return SwipeClassification.RightSwipe;
    } else if (
      x <= -1 * this.xDisplacementThreshold &&
      Math.abs(y) <= this.yForgiveness
    ) {
      return SwipeClassification.LeftSwipe;
    } else {
      return SwipeClassification.UnclassifiedSwipe;
    }
  }
}
