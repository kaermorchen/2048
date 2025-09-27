export class Tile {
  tileElement: HTMLElement;
  value: number | undefined;
  x: number | undefined;
  y: number | undefined;

  constructor(gameBoard: HTMLElement) {
    this.tileElement = document.createElement("div");
    this.tileElement.classList.add("tile");

    this.setValue(Math.random() > 0.5 ? 2 : 4);

    gameBoard.append(this.tileElement);
  }

  setXY(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.tileElement.style.setProperty("--x", x);
    this.tileElement.style.setProperty("--y", y);
  }

  setValue(value: number) {
    this.value = value;
    this.tileElement.textContent = String(this.value);

    const bgLightness = 100 - Math.log2(value) * 9;
    this.tileElement.style.setProperty("--bg-lightness", `${bgLightness}%`);
    this.tileElement.style.setProperty(
      "--text-lightness",
      `${bgLightness < 50 ? 90 : 10}%`
    );
  }
}
