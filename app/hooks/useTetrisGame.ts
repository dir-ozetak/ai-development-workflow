import { useCallback, useEffect, useRef, useState } from 'react';

import type { GameState, Tetromino } from '@/app/types/tetris';
import { GAME_SPEED } from '@/app/constants/tetris';
import {
  calculateScore,
  checkCollision,
  clearFullLines,
  createEmptyBoard,
  createRandomTetromino,
  getHardDropPosition,
  mergePieceToBoard,
  rotateTetromino,
} from '@/app/utils/tetris';

export function useTetrisGame() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createEmptyBoard(),
    currentPiece: createRandomTetromino(),
    nextPiece: createRandomTetromino(),
    score: 0,
    isGameOver: false,
    isPaused: false,
  }));

  const spawnNewPiece = useCallback(() => {
    setGameState(prev => {
      const newPiece = prev.nextPiece || createRandomTetromino();
      const nextPiece = createRandomTetromino();

      if (checkCollision(prev.board, newPiece)) {
        return { ...prev, isGameOver: true };
      }

      return {
        ...prev,
        currentPiece: newPiece,
        nextPiece,
      };
    });
  }, []);

  const moveDown = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) {
        return prev;
      }

      if (checkCollision(prev.board, prev.currentPiece, 0, 1)) {
        const mergedBoard = mergePieceToBoard(prev.board, prev.currentPiece);
        const { newBoard, linesCleared } = clearFullLines(mergedBoard);
        const scoreGain = calculateScore(linesCleared);

        return {
          ...prev,
          board: newBoard,
          currentPiece: null,
          score: prev.score + scoreGain,
        };
      }

      return {
        ...prev,
        currentPiece: {
          ...prev.currentPiece,
          position: {
            ...prev.currentPiece.position,
            y: prev.currentPiece.position.y + 1,
          },
        },
      };
    });
  }, []);

  const moveLeft = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) {
        return prev;
      }

      if (!checkCollision(prev.board, prev.currentPiece, -1, 0)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: {
              ...prev.currentPiece.position,
              x: prev.currentPiece.position.x - 1,
            },
          },
        };
      }

      return prev;
    });
  }, []);

  const moveRight = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) {
        return prev;
      }

      if (!checkCollision(prev.board, prev.currentPiece, 1, 0)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: {
              ...prev.currentPiece.position,
              x: prev.currentPiece.position.x + 1,
            },
          },
        };
      }

      return prev;
    });
  }, []);

  const rotate = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) {
        return prev;
      }

      const rotated = rotateTetromino(prev.currentPiece);
      if (!checkCollision(prev.board, rotated)) {
        return { ...prev, currentPiece: rotated };
      }

      return prev;
    });
  }, []);

  const hardDrop = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) {
        return prev;
      }

      const dropY = getHardDropPosition(prev.board, prev.currentPiece);
      const droppedPiece: Tetromino = {
        ...prev.currentPiece,
        position: { ...prev.currentPiece.position, y: dropY },
      };

      const mergedBoard = mergePieceToBoard(prev.board, droppedPiece);
      const { newBoard, linesCleared } = clearFullLines(mergedBoard);
      const scoreGain = calculateScore(linesCleared);

      return {
        ...prev,
        board: newBoard,
        currentPiece: null,
        score: prev.score + scoreGain,
      };
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: createRandomTetromino(),
      nextPiece: createRandomTetromino(),
      score: 0,
      isGameOver: false,
      isPaused: false,
    });
  }, []);

  // Use ref to maintain stable reference to moveDown function
  const moveDownRef = useRef(moveDown);
  useEffect(() => {
    moveDownRef.current = moveDown;
  }, [moveDown]);

  // Game loop - useEffect is necessary for timer-based game logic
  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused) {
      return;
    }

    const interval = setInterval(() => {
      moveDownRef.current();
    }, GAME_SPEED);

    return () => {
      clearInterval(interval);
    };
  }, [gameState.isGameOver, gameState.isPaused]);

  // Spawn new piece when current piece is null
  useEffect(() => {
    if (!gameState.currentPiece && !gameState.isGameOver) {
      spawnNewPiece();
    }
  }, [gameState.currentPiece, gameState.isGameOver, spawnNewPiece]);

  return {
    gameState,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    togglePause,
    resetGame,
  };
}
