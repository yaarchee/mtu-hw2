function addPlayers(player) {
  localStorage.setItem("players", JSON.stringify([player, ...getPlayers()]));
}

function getPlayers() {
  if (localStorage.getItem("players")) {
    return JSON.parse(localStorage.getItem("players"))
      .sort(compare)
      .slice(0, 10);
  }
  return [];
}

export { addPlayers, getPlayers };
