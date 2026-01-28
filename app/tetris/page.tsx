'use client';

import { GameBoard } from '@/app/components/GameBoard';
import { NextPiece } from '@/app/components/NextPiece';
import { ScoreDisplay } from '@/app/components/ScoreDisplay';
import { useTetrisGame } from '@/app/hooks/useTetrisGame';
import { useKeyboardControls } from '@/app/hooks/useKeyboardControls';

export default function TetrisPage() {
  const {
    gameState,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    togglePause,
    resetGame,
  } = useTetrisGame();

  useKeyboardControls({
    onMoveLeft: moveLeft,
    onMoveRight: moveRight,
    onMoveDown: moveDown,
    onRotate: rotate,
    onHardDrop: hardDrop,
    onPause: togglePause,
    enabled: !gameState.isGameOver,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          TETRIS
        </h1>

        <div className="flex justify-center items-start gap-6 flex-wrap">
          <GameBoard board={gameState.board} currentPiece={gameState.currentPiece} />

          <div className="flex flex-col gap-4">
            <ScoreDisplay score={gameState.score} />
            <NextPiece nextPiece={gameState.nextPiece} />

            <div className="bg-slate-800 rounded-xl p-4 border-2 border-slate-700 space-y-3">
              <h3 className="text-white font-bold text-sm mb-3 text-center">CONTROLS</h3>
              <div className="text-slate-300 text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Move:</span>
                  <span className="text-blue-400 font-mono">← →</span>
                </div>
                <div className="flex justify-between">
                  <span>Rotate:</span>
                  <span className="text-blue-400 font-mono">↑</span>
                </div>
                <div className="flex justify-between">
                  <span>Soft Drop:</span>
                  <span className="text-blue-400 font-mono">↓</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard Drop:</span>
                  <span className="text-blue-400 font-mono">SPACE</span>
                </div>
                <div className="flex justify-between">
                  <span>Pause:</span>
                  <span className="text-blue-400 font-mono">P</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={togglePause}
                disabled={gameState.isGameOver}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold"
                aria-label={gameState.isPaused ? 'Resume game' : 'Pause game'}
              >
                {gameState.isPaused ? 'RESUME' : 'PAUSE'}
              </button>

              <button
                onClick={resetGame}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold"
                aria-label="Restart game"
              >
                RESTART
              </button>
            </div>
          </div>
        </div>

        {gameState.isGameOver && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 border-2 border-slate-700 text-center space-y-4">
              <h2 className="text-4xl font-bold text-red-500 mb-4">GAME OVER</h2>
              <p className="text-white text-xl">Final Score</p>
              <p className="text-5xl font-bold text-blue-400 tabular-nums">
                {gameState.score.toLocaleString()}
              </p>
              <button
                onClick={resetGame}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold mt-6"
                aria-label="Play again"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}

        {gameState.isPaused && !gameState.isGameOver && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 border-2 border-slate-700 text-center">
              <h2 className="text-4xl font-bold text-blue-400 mb-4">PAUSED</h2>
              <p className="text-slate-300 mb-6">Press P or click Resume to continue</p>
              <button
                onClick={togglePause}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                aria-label="Resume game"
              >
                RESUME
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
