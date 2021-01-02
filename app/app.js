import preload from "./js/preolad.js";
// import "./index.html";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles.css";
import refs from "./js/refs.js";
import modal from "./js/Modal.js";
import GameMaker from "./js/GameMaker.js";
import controlsGame from "./js/ControlsGame.js";
import updateViewBestPlayer from "./js/updateViewBestPlayers.js";
import { sendPlayer } from "./service/service.js";

const gameMaker = new GameMaker(refs.wrap);

console.log("JS ON");
updateViewBestPlayer.render();

refs.wrapBtn.addEventListener("click", run);

function run({ target }) {
  if (target.id === "start") {
    pause();
    return;
  }
  getNewGame();
}

function getNewGame() {
  if (controlsGame.isRun) {
    stop();
  }
  console.log("init");
  controlsGame.reset();
  refs.btnStart.disabled = false;
  gameMaker.generateField();
  gameMaker.generateBox();
  pause();
}

function pause() {
  controlsGame.isRun = !controlsGame.isRun;
  if (controlsGame.isRun) {
    refs.btnStart.innerHTML = "пауза";
    gameMaker.randomGenerateBox();
    gameMaker.setListener("on");
    controlsGame.intervalID = setInterval(() => {
      if (controlsGame.timeLeft === 0) {
        stop();
        modal.showModal();
        return;
      }
      controlsGame.timeLeft = controlsGame.timeLeft - 1;
    }, 1000);
  } else {
    refs.btnStart.innerHTML = "старт";
    console.log("pause");
    clearInterval(controlsGame.intervalID);
    gameMaker.setListener("off");
    gameMaker.stopRandomGenerateBox();
  }
}

function stop() {
  gameMaker.setListener("off");
  gameMaker.stopRandomGenerateBox();
  clearInterval(controlsGame.intervalID);
  controlsGame.isRun = false;
  refs.btnStart.disabled = true;
}

refs.form.addEventListener("submit", saveResult);

function saveResult(e) {
  e.preventDefault();
  const namePlayer = e.currentTarget.elements.name.value;
  const points = controlsGame.points;

  sendPlayer({
    namePlayer,
    points,
  });
  updateViewBestPlayer.render();

  modal.closeModal();
}
