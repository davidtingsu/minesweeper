import './App.css';
import { Minesweeper } from './Minesweeper';
import { useEffect, useState, useRef } from 'react';
import { GameEngine } from './GameEngine';
function App() {
  const [m, setM] = useState(9);
  const [n, setN] = useState(9);
  const [mineCount, setMineCount] = useState(10);
  const [board, setBoard] = useState([]);
  const [ready, setReady] = useState(false);

  const gameEngine = useRef();
  useEffect(() => {
    if (ready) return;
    gameEngine.current = new GameEngine(m, n, mineCount);
    gameEngine.current.initialize();
    setReady(true)
  }, [ready]);

  useEffect((isOver) => {
    if (!gameEngine.current?.isOver()) return;
    alert('Game Over');
  }, [gameEngine.current?.isOver()]);

  const handleClick = (i) => {
    if (gameEngine.current.isOver()) return;
    gameEngine.current.click(i);
    setBoard((oldBoard) => {
      return { ...gameEngine.current.state };
    });
  };
  const handleDoubleClick = (e, i) => {
    console.log('handleDoubleClick');
  };
  const handleRightClick = (e, i) => {
    e.preventDefault();
    gameEngine.current.toggleFlag(i);
    setBoard((oldBoard) => {
      return { ...gameEngine.current.state };
    });
  };
  const getCellState = (i) => {
    return gameEngine.current.getCellState(i);
  };

  return (
    <div className="App flex items-center justify-center w-screen h-screen">
      <button onClick={() => { setReady(false) }}
        className={'bg-sky-500 text-white p-3 m-3 absolute top-0 active:opacity-60 hover:opacity-90'}>
        Reset
      </button>

      {!ready ? 'Loading...' :
        <Minesweeper m={m} n={n}
          onContextMenu={handleRightClick}
          onDoubleClick={handleDoubleClick}
          onClick={handleClick}
          getCellState={getCellState}
        />
      }
    </div>
  );
}

export default App;
