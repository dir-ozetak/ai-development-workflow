import type { Tetromino } from '@/app/types/tetris';

interface NextPieceProps {
  nextPiece: Tetromino | null;
}

export function NextPiece({ nextPiece }: NextPieceProps) {
  if (!nextPiece) {
    return null;
  }

  const maxSize = Math.max(nextPiece.shape.length, nextPiece.shape[0]?.length || 0);
  const gridSize = Math.max(4, maxSize);

  return (
    <div className="bg-slate-800 rounded-xl p-4 border-2 border-slate-700">
      <h3 className="text-white font-bold text-sm mb-3 text-center">NEXT</h3>
      <div
        className="grid gap-[1px] bg-slate-900 p-2 rounded-lg"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {Array.from({ length: gridSize }).map((_, y) =>
          Array.from({ length: gridSize }).map((_, x) => {
            const shapeY = y - Math.floor((gridSize - nextPiece.shape.length) / 2);
            const shapeX = x - Math.floor((gridSize - (nextPiece.shape[0]?.length || 0)) / 2);
            const isActive =
              shapeY >= 0 &&
              shapeY < nextPiece.shape.length &&
              shapeX >= 0 &&
              shapeX < (nextPiece.shape[shapeY]?.length || 0) &&
              nextPiece.shape[shapeY][shapeX];

            return (
              <div
                key={`${x}-${y}`}
                className="w-6 h-6 border border-slate-700/50 rounded-sm"
                style={{
                  backgroundColor: isActive ? nextPiece.color : '#0f172a',
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
