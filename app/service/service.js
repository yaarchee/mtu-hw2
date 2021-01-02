const BASE_URL = "http://localhost:3001/";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept-Charset": "utf-8",
  },
};

function getPlayers() {
  return fetch(`${BASE_URL}data`, options)
    .then((res) => {
      return res.json();
    })
    .then((res) => res)
    .catch((er) => console.log("список игроков пуст"));
}

function sendPlayer(data) {
  fetch(`${BASE_URL}user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export { getPlayers, sendPlayer };
