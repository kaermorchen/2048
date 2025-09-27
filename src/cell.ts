import type { Tile } from "./tile";

export class Cell {
  x: number;
  y: number;
  linkedTile: Tile | undefined;

  constructor(gameBoard: HTMLElement, x: number, y: number) {
    this.x = x;
    this.y = y;

    const cell = document.createElement("div");

    cell.classList.add("cell");

    gameBoard.append(cell);
  }

  linkTile(tile: Tile) {
    tile.setXY(this.x, this.y);
    this.linkedTile = tile;
  }

  isEmpty() {
    return !this.linkedTile;
  }
}
