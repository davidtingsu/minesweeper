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
    gameEngine.current = new GameEngine(m, n, mineCount);
    gameEngine.current.initialize();
    setReady(true)
  }, []);
  const handleClick = (i) => {
    gameEngine.current.click(i);
    setBoard((oldBoard) => {
      return {...gameEngine.current.state};
    });
  };
  const getCellState = (i) => {
    return gameEngine.current.getCellState(i);
  };

  return (
    <div className="App flex items-center justify-center w-screen h-screen">
      {!ready ? 'Loading...' :
        <Minesweeper m={m} n={n} onClick={handleClick} getCellState={getCellState} />
      }
    </div>
  );
}

export default App;
