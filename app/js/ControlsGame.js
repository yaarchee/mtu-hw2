import refs from "./refs.js";

const ControlsGame = {
  _timeLeft: 60,
  _points: 0,
  _intervalID: null,
  _isRun: false,

  get isRun() {
    return this._isRun;
  },
  set isRun(isRun) {
    this._isRun = isRun;
  },

  get timeLeft() {
    return this._timeLeft;
  },
  set timeLeft(timeLeft) {
    this._timeLeft = timeLeft;
    refs.secsRef.innerHTML = this._timeLeft;
  },

  get points() {
    return this._points;
  },
  set points(points) {
    this._points = points;
    refs.enemy.innerHTML = this._points;
  },

  get intervalID() {
    return this._intervalID;
  },
  set intervalID(intervalID) {
    this._intervalID = intervalID;
  },

  reset() {
    this.timeLeft = 3;
    this.points = 0;
  },

  // startTimer() {
  //   const targetData = new Date().getTime() + this.defaultSec;
  //   this.idInterval = setInterval(() => {
  //     const tempDate = targetData - Date.now();
  //     this.secLeft = Math.floor((tempDate % (1000 * 60)) / 1000);
  //   });
  // }
};

export default ControlsGame;
