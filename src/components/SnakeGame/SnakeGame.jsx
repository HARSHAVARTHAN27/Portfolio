import React, { useState, useEffect, useRef } from 'react';

const BOARD_SIZE = 20;
const CELL_SIZE = 20; // px
const INITIAL_SNAKE = [{
  x: 10,
  y: 10
}];
const INITIAL_FOOD = {
  x: 5,
  y: 5
};
const INITIAL_DIRECTION = {
  x: 0,
  y: -1
}; // Up
const GAME_SPEED = 200; // milliseconds

export function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameIntervalRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  // Handle direction change
  const changeDirection = (newDir) => {
    // Prevent reversing into self
    if (direction.x !== -newDir.x || direction.y !== -newDir.y) {
      setNextDirection(newDir);
    }
  };

  // Handle key input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      
      e.preventDefault();

      const keyMap = {
        'ArrowUp': { x: 0, y: -1 },
        'ArrowDown': { x: 0, y: 1 },
        'ArrowLeft': { x: -1, y: 0 },
        'ArrowRight': { x: 1, y: 0 }
      };

      changeDirection(keyMap[e.key]);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Handle touch/swipe
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e) => {
      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };

      const dx = touchEnd.x - touchStartRef.current.x;
      const dy = touchEnd.y - touchStartRef.current.y;

      const minSwipeDistance = 30;

      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (Math.abs(dx) > minSwipeDistance) {
          changeDirection(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 }); // Right or Left
        }
      } else {
        // Vertical swipe
        if (Math.abs(dy) > minSwipeDistance) {
          changeDirection(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 }); // Down or Up
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [direction]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    gameIntervalRef.current = setInterval(() => {
      setSnake(prevSnake => {
        // Update direction
        setDirection(prevDir => {
          const newDir = nextDirection;
          if (newDir.x === -prevDir.x && newDir.y === -prevDir.y) {
            return prevDir; // Can't reverse
          }
          return newDir;
        });

        // Move snake
        const newSnake = [...prevSnake];
        const head = { 
          x: newSnake[0].x + (nextDirection.x || direction.x),
          y: newSnake[0].y + (nextDirection.y || direction.y)
        };

        // Check border collision
        if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 1);
          // Generate new food
          let newFood;
          do {
            newFood = {
              x: Math.floor(Math.random() * BOARD_SIZE),
              y: Math.floor(Math.random() * BOARD_SIZE),
            };
          } while (newSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
          setFood(newFood);
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameIntervalRef.current);
  }, [gameOver, food, direction, nextDirection]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="snake-game-container">
      <h2>Snake Game</h2>
      <div className="game-board"
        style={{
          width: BOARD_SIZE * CELL_SIZE,
          height: BOARD_SIZE * CELL_SIZE
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          ></div>
        ))}
        <div
          className="food"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        ></div>
      </div>
      <div className="game-info">
        <p>Score: {score}</p>
        {gameOver && (
          <div className="game-over">
            <h3>Game Over!</h3>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>

      {/* Mobile Control Buttons */}
      <div className="mobile-controls">
        <button
          className="control-btn up"
          onClick={() => changeDirection({ x: 0, y: -1 })}
          aria-label="Up"
        >
          ▲
        </button>
        <div className="controls-row">
          <button
            className="control-btn left"
            onClick={() => changeDirection({ x: -1, y: 0 })}
            aria-label="Left"
          >
            ◄
          </button>
          <button
            className="control-btn down"
            onClick={() => changeDirection({ x: 0, y: 1 })}
            aria-label="Down"
          >
            ▼
          </button>
          <button
            className="control-btn right"
            onClick={() => changeDirection({ x: 1, y: 0 })}
            aria-label="Right"
          >
            ►
          </button>
        </div>
      </div>
    </div>
  );
}
