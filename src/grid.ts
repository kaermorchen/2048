import { Cell } from "./cell";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
  cells: Cell[] = [];

  constructor(gameBoard: HTMLElement) {
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push(
        new Cell(gameBoard, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
      );
    }
  }

  getRandomEmptyCell() {
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());
    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
  }
}
