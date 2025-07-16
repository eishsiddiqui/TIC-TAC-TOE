import { useState } from "react";

import Log from "./components/Log";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const tempGrid = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function activePlayerUpdate(turn) {
  let currPlayer = "X";
  if (turn.length > 0 && turn[0].player === "X") currPlayer = "O";
  return currPlayer;
}

function App() {
  const [state, setState] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: "Player1",
    O: "Player2",
  });
  const activePlayer = activePlayerUpdate(state);

  function handleActivePlayer(rowIndex, colIndex) {
    setState((currState) => {
      let currPlayer = activePlayerUpdate(currState);

      const updatedState = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currPlayer,
        },
        ...currState,
      ];

      return updatedState;
    });
  }

  let gameBoard = [...tempGrid.map((array) => [...array])];
  for (const element of state) {
    const { square, player } = element;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;
  let draw = false;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    )
      winner = playerName[firstSquareSymbol];

    if (winner === null && state.length === 9) draw = true;
  }

  function handleRematch() {
    setState([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayerName((prevName) => {
      return { ...prevName, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            tempName={playerName.X}
            symbol="X"
            nameHandler={handlePlayerName}
          />
          <Player
            isActive={activePlayer === "O"}
            tempName={playerName.O}
            symbol="O"
            nameHandler={handlePlayerName}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} rematch={handleRematch} />
        )}
        <GameBoard onSquareSelect={handleActivePlayer} gameBoard={gameBoard} />
      </div>
      <Log turns={state} />
    </main>
  );
}

export default App;
