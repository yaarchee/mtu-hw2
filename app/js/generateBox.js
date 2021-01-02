const coubes = document.querySelectorAll(".coube");
const child = document.querySelectorAll(".child");

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function generateBox() {
  let randomPosition = randomInteger(0, coubes.length - 1);
  if (
    coubes[randomPosition].classList.contains("active") ||
    child[randomPosition].classList.contains("small-box")
  ) {
    generateBox();
  } else {
    coubes[randomPosition].classList.add("active");
  }
}

function generateSmallBox() {
  let randomPosition = randomInteger(0, child.length - 1);
  if (
    coubes[randomPosition].classList.contains("active") ||
    child[randomPosition].classList.contains("small-box")
  ) {
    generateSmallBox();
  } else {
    child[randomPosition].classList.add("small-box");
  }
}

export { generateBox, generateSmallBox };
