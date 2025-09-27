import "./style.css";
import { Grid } from "./grid";
import { Tile } from "./tile";

const gameBoard = document.getElementById("game-board");

if (gameBoard === null) {
  throw new Error("Game board element not found");
}

const grid = new Grid(gameBoard);

const randomCell = grid.getRandomEmptyCell();
randomCell.linkTile(new Tile(gameBoard));

setupInputOnce();

function setupInputOnce() {
  window.addEventListener("keydown", handleInput, { once: true });
}

function handleInput(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrayTop":
      moveUp();
      break;
    case "ArrayRight":
      break;
    case "ArrayDown":
      break;
    case "ArrayLeft":
      break;
    default:
      setupInputOnce();
      return;
  }

  setupInputOnce();
}

function moveUp() {}
