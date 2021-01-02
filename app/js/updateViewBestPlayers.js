// import playersTemplate from "../template/players.hbs";
import refs from "./refs.js";
import { getPlayers, sendPlayer } from "../service/service.js";

const updateViewBestPlayer = {
  render() {
    refs.topPlayersTable.innerHTML = "";
    setTimeout(() => {
      getPlayers().then((res) => {
        if (!res) return;
        console.log("updateViewBestPlayer");
        console.log(res);
        res.forEach((player) => {
          const markup = `<li class="top-players__item"><span class="info-player__index"> </span><span
        class="info-player">${player.namePlayer}</span> <span class="info-player">${player.points}</span></li>`;

          refs.topPlayersTable.insertAdjacentHTML("beforeend", markup);
        });
      });
    }, 50);
  },
};

export default updateViewBestPlayer;
