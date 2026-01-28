import type { Board, Tetromino } from '@/app/types/tetris';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/app/constants/tetris';

interface GameBoardProps {
  board: Board;
  currentPiece: Tetromino | null;
}

export function GameBoard({ board, currentPiece }: GameBoardProps) {
  const displayBoard = board.map(row => [...row]);

  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            displayBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }
  }

  return (
    <div className="inline-block bg-slate-900 p-4 rounded-2xl shadow-2xl border-2 border-slate-700">
      <div className="grid gap-[1px] bg-slate-800 p-[1px]" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)` }}>
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className="w-7 h-7 border border-slate-700/50"
              style={{
                backgroundColor: cell || '#1e293b',
              }}
              aria-label={cell ? `Filled cell at row ${y + 1}, column ${x + 1}` : `Empty cell at row ${y + 1}, column ${x + 1}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
