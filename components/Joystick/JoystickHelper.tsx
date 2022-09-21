export enum Classification {
  LeftSwipe,
  RightSwipe,
  DownSwipe,
  UpSwipe,
  UnClassifiedSwipe,
}

class JoystickHelper {
  static xThreshold = 10 / 100;
  static yThreshold = 10 / 100;

  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  classify(x: number, y: number) {}
}
