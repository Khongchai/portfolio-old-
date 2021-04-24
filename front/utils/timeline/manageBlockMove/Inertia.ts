export class Inertia {
  init: number;
  cur: number;
  prev: number;
  delta: number | undefined = undefined;
  rotation = 0;

  constructor() {
    this.init = 0;
    this.cur = this.init;
    this.prev = this.cur;
  }

  setPoints(currentPos: number) {
    this.rotation++;
    //compare to 2 points away
    if (this.rotation == 2) {
      this.prev = this.cur;
      this.rotation = 0;
    }
    this.cur = currentPos;
  }

  resetDelta() {
    this.delta = 0;
  }

  setDelta() {
    this.delta = this.cur - this.prev;
  }

  getDelta() {
    /**
     * get current delta, value of delta must first be defined
     */
    this.handleDeltaUndefined();
    return this.delta!;
  }

  slowDown() {
    this.handleDeltaUndefined();
    let delta = this.delta!;
    if (delta > 0) {
      delta -= 0.01;
    } else {
      delta += 0.01;
    }
    this.delta = delta;
  }

  handleDeltaUndefined() {
    if (!this.delta) {
      throw "Rate of change 'delta' not set";
    }
  }
}
