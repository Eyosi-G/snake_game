const snake = document.getElementById("snake");
let snakePosition = [0, 1, 2, 3];
let fruitPosition = 50;
let isGameOver = false;

const createGridItem = (isOdd) => {
  const gridItem = document.createElement("div");
  if (isOdd) {
    gridItem.className = "grid_item_white";
  } else {
    gridItem.className = "grid_item_red";
  }
  return gridItem;
};

const createGrid = (square, gridSize) => {
  const container = document.getElementById("container");
  let isOdd = true;
  for (let i = 0; i < square; i += gridSize) {
    isOdd = !isOdd;
    for (let j = 0; j < square; j += gridSize) {
      container.appendChild(createGridItem(isOdd));
      isOdd = !isOdd;
    }
  }
};

const positionSnake = () => {
  const grids = document.querySelectorAll("#container div");
  for (let i = 0; i < snakePosition.length; i++) {
    grids[i].setAttribute("class", "snake_block");
  }
};

const touchItSelf = () => {
  return new Set(snakePosition).size !== snakePosition.length;
};

const eatFruit = () => {
  return snakePosition.includes(fruitPosition);
};

const drawFruit = () => {
  const grids = document.querySelectorAll("#container div");
  grids[fruitPosition].setAttribute("class", "fruit");
};
const placeRandomFruit = () => {
  let random = Math.floor(Math.random() * 100);
  while (!snakePosition.includes(fruitPosition)) {
    random = Math.floor(Math.random() * 100);
  }
  fruitPosition = random;
};

const moveSnake = (bySize) => {
  let tail = snakePosition[snakePosition.length - 1];
  let newTail = tail + bySize;
  snakePosition = [...snakePosition, newTail];

  if (eatFruit()) {
    // place random fruit
    placeRandomFruit();
    drawFruit();
    return;
    // grow
  }

  snakePosition.shift();

  if (touchItSelf()) {
    isGameOver = true;
    return;
  }
};

const redrawPosition = () => {
  removeGrids();
  createGrid(400, 40);
  const grids = document.querySelectorAll("#container div");
  snakePosition.forEach((position) => {
    grids[position].setAttribute("class", "snake_block");
  });
  grids[fruitPosition].setAttribute("class", "fruit");
};

const removeGrids = () => {
  const grids = document.querySelectorAll("#container div");
  grids.forEach((grid) => {
    grid.parentNode.removeChild(grid);
  });
};
const moveSnakeEventHandler = () => {
  document.addEventListener("keydown", (e) => {
    if (!isGameOver) {
      switch (e.key) {
        case "ArrowDown":
          moveSnake(10);
          break;
        case "ArrowUp":
          moveSnake(-10);
          break;
        case "ArrowLeft":
          moveSnake(-1);
          break;
        case "ArrowRight":
          moveSnake(1);
          break;
      }
      redrawPosition();
    }
  });
};

createGrid(400, 40);
drawFruit();
positionSnake();
moveSnakeEventHandler();
