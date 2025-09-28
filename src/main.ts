import "./style.css";
import { Grid } from "./grid";
import { Tile } from "./tile";
import type { Cell } from "./cell";

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

async function handleInput(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setupInputOnce();
        return;
      }
      await moveUp();
      break;
    case "ArrowRight":
      if (!canMoveRight()) {
        setupInputOnce();
        return;
      }
      await moveRight();
      break;
    case "ArrowDown":
      if (!canMoveDown()) {
        setupInputOnce();
        return;
      }
      await moveDown();
      break;
    case "ArrowLeft":
      if (!canMoveLeft()) {
        setupInputOnce();
        return;
      }
      await moveLeft();
      break;
    default:
      setupInputOnce();
      return;
  }

  if (gameBoard === null) {
    throw new Error("Game board element not found");
  }

  const newTile = new Tile(gameBoard);

  const randomEmptyCell = grid.getRandomEmptyCell();

  if (randomEmptyCell) {
    randomEmptyCell.linkTile(newTile);
  }

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    await newTile.waitForAnimationEnd();
    alert("Try again!");
    return;
  }

  setupInputOnce();
}

async function moveUp() {
  await slideTiles(grid.cellsGroupedByColumn);
}

async function moveDown() {
  await slideTiles(grid.cellsGroupedByReversedColumn);
}

async function moveLeft() {
  await slideTiles(grid.cellsGroupedByRow);
}

async function moveRight() {
  await slideTiles(grid.cellsGroupedByReversedRow);
}

async function slideTiles(groupedCells: Cell[][]) {
  const promises: Promise<void>[] = [];

  groupedCells.forEach((group) => slideTilesInGroup(group, promises));

  await Promise.all(promises);

  grid.cells.forEach((cell) => {
    if (cell.hasTileForMerge()) {
      cell.mergeTiles();
    }
  });
}

function slideTilesInGroup(group: Cell[], promises: Promise<void>[]) {
  for (let i = 1; i < group.length; i++) {
    if (group[i].isEmpty()) {
      continue;
    }

    const cellWithTile = group[i];

    let targetCell;
    let j = i - 1;
    while (
      j >= 0 &&
      cellWithTile.linkedTile &&
      group[j].canAccept(cellWithTile.linkedTile)
    ) {
      targetCell = group[j];
      j--;
    }

    if (!targetCell) {
      continue;
    }

    if (cellWithTile.linkedTile) {
      promises.push(cellWithTile.linkedTile.waitForTransitionEnd());
    }

    if (targetCell.isEmpty()) {
      if (cellWithTile.linkedTile) {
        targetCell.linkTile(cellWithTile.linkedTile);
      }
    } else {
      if (cellWithTile.linkedTile) {
        targetCell.linkTileForMerge(cellWithTile.linkedTile);
      }
    }

    cellWithTile.unlinkTile();
  }
}

function canMoveUp() {
  return canMove(grid.cellsGroupedByColumn);
}

function canMoveDown() {
  return canMove(grid.cellsGroupedByReversedColumn);
}

function canMoveLeft() {
  return canMove(grid.cellsGroupedByRow);
}

function canMoveRight() {
  return canMove(grid.cellsGroupedByReversedRow);
}

function canMove(groupedCells: Cell[][]) {
  return groupedCells.some((group) => canMoveInGroup(group));
}

function canMoveInGroup(group: Cell[]) {
  return group.some((cell, index) => {
    if (index === 0) {
      return false;
    }

    if (cell.isEmpty()) {
      return false;
    }

    const targetCell = group[index - 1];

    if (cell.linkedTile) {
      return targetCell.canAccept(cell?.linkedTile);
    }

    return false;
  });
}
