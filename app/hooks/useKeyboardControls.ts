import { useEffect } from 'react';

interface KeyboardControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
  onPause: () => void;
  enabled: boolean;
}

export function useKeyboardControls({
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
  onHardDrop,
  onPause,
  enabled,
}: KeyboardControlsProps) {
  // useEffect is necessary for external system synchronization (keyboard events)
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          onMoveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onMoveRight();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onMoveDown();
          break;
        case 'ArrowUp':
          event.preventDefault();
          onRotate();
          break;
        case ' ':
          event.preventDefault();
          onHardDrop();
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          onPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, onMoveLeft, onMoveRight, onMoveDown, onRotate, onHardDrop, onPause]);
}
