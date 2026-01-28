import type { Board, Tetromino, TetrominoType } from '@/app/types/tetris';
import { BOARD_HEIGHT, BOARD_WIDTH, TETROMINO_COLORS, TETROMINO_SHAPES, TETROMINO_TYPES } from '@/app/constants/tetris';

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
}

export function createRandomTetromino(): Tetromino {
  const type = TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)] as TetrominoType;
  return {
    type,
    shape: TETROMINO_SHAPES[type],
    position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(TETROMINO_SHAPES[type][0].length / 2), y: 0 },
    color: TETROMINO_COLORS[type],
  };
}

export function rotateTetromino(tetromino: Tetromino): Tetromino {
  const rotated = tetromino.shape[0].map((_, index) =>
    tetromino.shape.map(row => row[index]).reverse()
  );
  return { ...tetromino, shape: rotated };
}

export function checkCollision(board: Board, tetromino: Tetromino, offsetX = 0, offsetY = 0): boolean {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const newX = tetromino.position.x + x + offsetX;
        const newY = tetromino.position.y + y + offsetY;

        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX] !== null)
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export function mergePieceToBoard(board: Board, tetromino: Tetromino): Board {
  const newBoard = board.map(row => [...row]);

  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const boardY = tetromino.position.y + y;
        const boardX = tetromino.position.x + x;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = tetromino.color;
        }
      }
    }
  }

  return newBoard;
}

export function clearFullLines(board: Board): { newBoard: Board; linesCleared: number } {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
  }

  return { newBoard, linesCleared };
}

export function calculateScore(linesCleared: number): number {
  const lineScores: Record<number, number> = {
    1: 100,
    2: 300,
    3: 500,
    4: 800,
  };
  return lineScores[linesCleared] || 0;
}

export function getHardDropPosition(board: Board, tetromino: Tetromino): number {
  let dropY = 0;
  while (!checkCollision(board, tetromino, 0, dropY + 1)) {
    dropY++;
  }
  return tetromino.position.y + dropY;
}
