function sortBestPlayers(players) {
  const sortArrayPlayers = JSON.parse(players).sort(compare).slice(0, 10);
  return JSON.stringify(sortArrayPlayers);
}

function compare(a, b) {
  if (a.points > b.points) return -1;
  if (a.points < b.points) return 1;
  return 0;
}

export default sortBestPlayers;
