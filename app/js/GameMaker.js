//const child = document.querySelectorAll(".child");

// import box from "../template/box.hbs";

import controlsGame from "./ControlsGame.js";

export default class GameMaker {
  constructor(gameField) {
    this._gameField = gameField;
    this.lenghtRow = 10;
    this.lenghtCol = 10;
    this.coubesContainer = null;
    this.randomGenerateBoxID = null;
    this.gamePlay = this.gamePlay.bind(this);
  }

  generateBox() {
    console.log("generateBox");
    const randomPosition = this.randomInteger(
      0,
      this.coubesContainer.length - 1
    );

    if (this.coubesContainer[randomPosition].classList.contains("empty")) {
      const randomSize = this.randomInteger(3, 10) * 10;
      const randomColor = this.getColor();
      const className = +randomSize <= 30 ? "small-box" : "big-box";

      const markup = `<div class=${className}
                          style="background-color: ${randomColor}; width: ${randomSize}%; height: ${randomSize}%"></div>`;

      this.coubesContainer[randomPosition].innerHTML = markup;
      this.coubesContainer[randomPosition].classList.remove("empty");
      return;
    }
    this.generateBox();
  }

  gamePlay({ target }) {
    console.log(target);
    console.log("gamePlay");
    console.log(target.classList.contains("big-box"));

    if (
      target.classList.contains("big-box") ||
      target.classList.contains("small-box")
    ) {
      if (target.classList.contains("big-box")) {
        controlsGame.points = controlsGame.points + 1;
        controlsGame.timeLeft =
          controlsGame.timeLeft - 1 <= 0
            ? controlsGame.timeLeft
            : controlsGame.timeLeft - 1;

        console.log("big-box");
      } else {
        controlsGame.points = controlsGame.points + 3;
        controlsGame.timeLeft =
          controlsGame.timeLeft + 1 < 60 ? controlsGame.timeLeft + 1 : 60;
      }

      target.parentElement.classList.add("empty");
      target.remove();
      this.generateBox();
    }
  }

  init() {
    this.generateBox();
  }

  randomGenerateBox() {
    this.randomGenerateBoxID = setInterval(() => {
      const randomCount = this.randomInteger(0, 2);
      const resultFind = Array.from(this.coubesContainer).find((item) =>
        item.classList.contains("empty")
      );
      if (resultFind) {
        if (randomCount > 0) {
          for (let i = 0; i < randomCount; i++) {
            this.generateBox();
          }
        }
      }
    }, 1000);
  }

  generateField() {
    this.gameField.innerHTML = "";
    for (let i = 0; this.lenghtRow * this.lenghtCol > i; i++) {
      this.gameField.insertAdjacentHTML(
        "beforeend",
        `<div class="cube empty"></div>`
      );
    }
    this.coubesContainer = document.querySelectorAll(".cube");
  }

  get gameField() {
    return this._gameField;
  }

  setListener(props) {
    if (props === "off") {
      this._gameField.removeEventListener("click", this.gamePlay);
      return;
    }

    this._gameField.addEventListener("click", this.gamePlay);
  }

  stopRandomGenerateBox() {
    clearInterval(this.randomGenerateBoxID);
  }

  getColor() {
    return `rgb(${this.setRandomColor()},${this.setRandomColor()},${this.setRandomColor()})`;
  }

  setRandomColor() {
    const rand = 0 + Math.random() * (255 + 1 - 0);
    return Math.floor(rand);
  }

  randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
}
