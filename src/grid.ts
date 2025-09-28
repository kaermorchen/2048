import { Cell } from "./cell";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
  cells: Cell[] = [];
  cellsGroupedByColumn: Cell[][];
  cellsGroupedByReversedColumn: Cell[][];
  cellsGroupedByRow: Cell[][];
  cellsGroupedByReversedRow: Cell[][];

  constructor(gameBoard: HTMLElement) {
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push(
        new Cell(gameBoard, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
      );
    }

    this.cellsGroupedByColumn = this.groupCellsByColumn();
    this.cellsGroupedByReversedColumn = this.cellsGroupedByColumn.map(
      (column) => column.slice().reverse()
    );
    this.cellsGroupedByRow = this.groupCellsByRow();
    this.cellsGroupedByReversedRow = this.cellsGroupedByRow.map((row) =>
      row.slice().reverse()
    );
  }

  getRandomEmptyCell() {
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());
    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
  }

  groupCellsByColumn() {
    return this.cells.reduce<Cell[][]>((groupedCells, cell) => {
      if (!Array.isArray(groupedCells[cell.x])) {
        groupedCells[cell.x] = [];
      }

      groupedCells[cell.x][cell.y] = cell;

      return groupedCells;
    }, []);
  }

  groupCellsByRow() {
    return this.cells.reduce<Cell[][]>((groupedCells, cell) => {
      if (!Array.isArray(groupedCells[cell.y])) {
        groupedCells[cell.y] = [];
      }

      groupedCells[cell.y][cell.x] = cell;

      return groupedCells;
    }, []);
  }
}
