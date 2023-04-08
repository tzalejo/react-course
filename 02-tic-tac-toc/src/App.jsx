import { useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

const TURNS = {
  // turnos
  X: 'x',
  O: 'o',
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

function App() {
  // const [board, setBoard] = useState(['x', 'x', 'o', 'o', 'x', 'x', 'x', '0', '0']);
  const [board, setBoard] = useState(Array(9).fill(''));

  // para saber quien es el turno.
  const [turn, setTurn] = useState(TURNS.X);

  // para verificar el ganador
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    // no actualizar esta posicion si ya tiene algo
    if (board[index] || winner) return;

    // Hacemos una copia del board
    const newBoard = [...board];
    // Actualizamos la posicion
    newBoard[index] = turn;
    // actualizamos el board
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // revisamos si hay un ganador
    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner); // actualiza el estado, y este es asyncrono..
      confetti();
      // alert(`El ganador es ${newWinner}`);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay mas espacios vacios
    // en le tablero.
    return newBoard.every((square) => square !== null);
  };

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      // verifico las combinaciones
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    // si no hay ganador
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>Tic tac toc</h1>
      <button type="button" onClick={resetGame}>
        {' '}
        Reset del Juego
      </button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? 'Empate' : 'Gano'}</h2>
            <header className="win">{winner && <Square>{winner}</Square>}</header>
            <footer>
              <button type="button" onClick={resetGame}>
                Empezar de nuevo
              </button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
