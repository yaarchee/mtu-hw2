import express from "express";
import path from "path";
import fs from "fs";
import sortBestPlayers from "./services.js";

const app = express();
const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.static("app"));
// app.use(express.static("html"));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./app", "index.html"));
});

// app.get("*", (req, res) => {
//
//   res.sendFile(path.join(__dirname, "./html", "notFound.html"));
// });

//app.use(express.static("data"));
app.get("/data", (req, res) => {
  fs.readFile("./data/data.json", "utf8", (err, data) => {
    if (err) throw err;
    res.send(sortBestPlayers(data));
  });
});

app.post("/user", function ({ body }, res) {
  fs.readFile("./data/data.json", "utf8", (err, data) => {
    if (err) throw err;

    const players = JSON.parse(data);

    players.push(body);
    const jsonPlayers = JSON.stringify(players);
    console.log(jsonPlayers + "  jsonPlayers");
    fs.writeFile("./data/data.json", jsonPlayers, (err) => {
      if (err) throw err;
      console.log("Data has been replaced!");
    });
  });
});

app.get("*", (req, res) => {
  res.redirect("/");
});
