import type { Tile } from "./tile";

export class Cell {
  x: number;
  y: number;
  linkedTile: Tile | null = null;
  linkedTileForMerge: Tile | null = null;

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

  unlinkTile() {
    this.linkedTile = null;
  }

  isEmpty() {
    return !this.linkedTile;
  }

  linkTileForMerge(tile: Tile) {
    tile.setXY(this.x, this.y);
    this.linkedTileForMerge = tile;
  }

  unlinkTileForMerge() {
    this.linkedTileForMerge = null;
  }

  hasTileForMerge() {
    return Boolean(this.linkedTileForMerge);
  }

  canAccept(newTile: Tile) {
    return (
      this.isEmpty() ||
      (!this.hasTileForMerge() && this.linkedTile?.value === newTile.value)
    );
  }

  mergeTiles() {
    if (this.linkedTile?.value && this.linkedTileForMerge?.value) {
      this.linkedTile?.setValue(
        this.linkedTile.value + this.linkedTileForMerge.value
      );
      this.linkedTileForMerge.removeFromDOM();
      this.unlinkTileForMerge();
    }
  }
}
