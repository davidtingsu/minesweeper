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
  const [debug, setDebug] = useState(false);

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
    gameEngine.current.doubleClick(i);
    setBoard((oldBoard) => {
      return { ...gameEngine.current.state };
    });
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
      <div className='absolute top-20'>
      <label className="relative inline-flex items-center cursor-pointer">
        <input onChange={(e) => setDebug(e.target.checked)} type="checkbox" value="" class="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900">Debug</span>
      </label>
      </div>

      {!ready ? 'Loading...' :
        <Minesweeper m={m} n={n}
          debug={debug}
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
