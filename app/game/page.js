"use client";

import { useState, useEffect } from "react";
import { GameStats } from "../components/GameStats";
import fetchData from "@/service/client";
import updateData from "@/service/updateDb";
import GameModal from "../components/GameModal";

const ColsRender = ({ col, handleClick, winningCells }) => {
  return (
    <div className="w-16" onClick={handleClick}>
      {col.map((gridCell, index) => {
        const isWinningCell = winningCells.some(
          (cell) => cell.col === col && cell.row === index
        );
        const cellClassName = isWinningCell ? "bg-green-300" : "bg-gray-200";

        return (
          <div
            className={`gridCell w-14 h-14 border
          border-gray-300 rounded-full flex items-center justify-center m-1
          hover:${cellClassName} transition-all ${cellClassName}`}
            key={index}
          >
            {gridCell === PieceX && (
              <div className="w-12 h-12 bg-indigo-500 rounded-full"></div>
            )}
            {gridCell === PieceO && (
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const PieceX = "jugador1";
const PieceO = "jugador2";

const GameRender = ({
  partidaId,
  elapsedTime,
  setIsGameOver,
  name1,
  name2,
  isAgainstComputer,
}) => {
  let colArray = {};
  for (let col = 0; col < 7; col++) {
    colArray[col] = [null, null, null, null, null, null];
  }
  const [cols, setCols] = useState(colArray);
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(PieceX);
  const [isEmpate, setIsEmpate] = useState(false);
  const [playerTurns, setPlayerTurns] = useState({ [PieceX]: 0, [PieceO]: 0 });
  const [winningCells, setWinningCells] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const gameOver = (currentPlayer) => {
    // checking for horizontal winner
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7 - 3; col++) {
        const piece = cols[col][row];
        if (
          piece != null &&
          piece === cols[col + 1][row] &&
          piece === cols[col + 2][row] &&
          piece === cols[col + 3][row]
        ) {
          setWinner(piece);
          setIsGameOver(true);
          return true;
        }
      }
    }

    // checking for vertical winner
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6 - 3; row++) {
        const piece = cols[col][row];
        if (
          piece != null &&
          piece === cols[col][row + 1] &&
          piece === cols[col][row + 2] &&
          piece === cols[col][row + 3]
        ) {
          setWinner(piece);
          setIsGameOver(true);
          return true;
        }
      }
    }

    // checking for diagonal up to the right winner
    for (let col = 0; col < 7 - 3; col++) {
      for (let row = 0; row < 6 - 3; row++) {
        const piece = cols[col][row];
        if (
          piece != null &&
          piece === cols[col + 1][row + 1] &&
          piece === cols[col + 2][row + 2] &&
          piece === cols[col + 3][row + 3]
        ) {
          setWinner(piece);
          setIsGameOver(true);
          return true;
        }
      }
    }

    // checking for diagonal down to the right winner
    for (let col = 0; col < 7 - 3; col++) {
      for (let row = 3; row < 6; row++) {
        const piece = cols[col][row];
        if (
          piece != null &&
          piece === cols[col + 1][row - 1] &&
          piece === cols[col + 2][row - 2] &&
          piece === cols[col + 3][row - 3]
        ) {
          setWinner(piece);
          setIsGameOver(true);
          return true;
        }
      }
    }
    return false;
  };

  const isBoardFull = () => {
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        if (cols[col][row] === null) {
          return false;
        }
      }
    }
    return true;
  };

  const handleClick = (currentCol) => {
    // Si el juego ya terminó, no permitir movimientos
    if (winner || isEmpate) {
      return;
    }
    // Si es el turno de la computadora, no permitir movimientos
    if (isAgainstComputer && currentPlayer === PieceO) {
      return;
    }
    // Realizar el movimiento del jugador
    playerMove(currentCol, currentPlayer);
  };

  const fillField = (currentCol, player, skipToggle = false) => {
    const column = cols[currentCol];
    const positionOfNull = column.lastIndexOf(null);

    // Check if the column is not full
    if (positionOfNull === -1) {
      return;
    }

    column[positionOfNull] = player;
    setCols({
      ...cols,
      [currentCol]: column,
    });

    playerTurns[player]++;

    if (gameOver()) {
      setWinner(player);
    } else if (isBoardFull()) {
      setIsEmpate(true);
      setIsGameOver
      console.log(isEmpate)
      setCurrentPlayer(player === PieceX ? PieceO : PieceX);
    }
  };

  const computerMove = () => {
    const currentCol = Math.floor(Math.random() * 7);
    setCurrentPlayer(PieceO);

    fillField(currentCol, PieceO, true);

    setCurrentPlayer(PieceX);
  };

  const playerMove = (currentCol, currentPlayer) => {
    fillField(currentCol, currentPlayer);

    if (!winner && !isEmpate && isAgainstComputer) {
      if (!gameOver(currentPlayer)) {
        setCurrentPlayer(PieceO);
        setTimeout(() => {
          computerMove();
        }, 500);

      }
    } else {
      setCurrentPlayer(currentPlayer === PieceX ? PieceO : PieceX);
    }
  };

  const getWinnerName = () => {
    if (winner === PieceX) {
      return name1;
    } else if (winner === PieceO) {
      if (isAgainstComputer) {
        return "computadora";
      } else {
        return name2;
      }
    } else {
      return null;
    }
  };

  const sendWinner = getWinnerName();
  const turnosGanador = winner ? playerTurns[winner] : null;

  useEffect(() => {
    if (winner || isEmpate) {
      setShowModal(true);
    }
  }, [winner, isEmpate]);

  const closeModal = () => {
    setShowModal(false);
  };

  if (winner) {
    updateData(partidaId, sendWinner, elapsedTime, turnosGanador);

    return (
      <>
        <div className="grid grid-cols-7 gap-1">
          {Object.entries(cols).map(([k, col], index) => {
            return (
              <ColsRender
                col={col}
                key={index}
                handleClick={() => {
                  handleClick(index);
                }}
                winningCells={winningCells}
              />
            );
          })}
        </div>
        {showModal && (
          <GameModal
            sendWinner={sendWinner}
            turnosGanador={turnosGanador}
            elapsedTime={elapsedTime}
            closeModal={closeModal}
          />
        )}
      </>
    );

  } else {
    return (
      <div className="grid grid-cols-7 gap-1">
        {Object.entries(cols).map(([k, col], index) => {
          return (
            <ColsRender
              col={col}
              key={index}
              handleClick={() => {
                handleClick(index);
              }}
              winningCells={winningCells}
            />
          );
        })}
      </div>
    );
  }
};

export default function GamePage() {
  const [partidaId, setPartidaId] = useState(null);
  const [doc, setDoc] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [isAgainstComputer, setIsAgainstComputer] = useState(false);

  useEffect(() => {
    if (!isGameOver) {
      const timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isGameOver]);

  const formatElapsedTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    fetchData().then(setDoc);
  }, []);

  useEffect(() => {
    doc.map(({ id, jugador1, jugador2 }) => {
      setPartidaId(id);
      setName1(jugador1);
      setName2(jugador2);

      if (jugador2 === "computer") setIsAgainstComputer(true);
    });
  }, [doc]);

  return (
    <div className="App">
      <section>
        <div className="flex justify-center items-center">
          <div className="flex space-x-4 p-6 rounded">
            <GameRender
              partidaId={partidaId}
              elapsedTime={formatElapsedTime(elapsedTime)}
              setIsGameOver={setIsGameOver}
              name1={name1}
              name2={name2}
              isAgainstComputer={isAgainstComputer}
            />
            <GameStats elapsedTime={elapsedTime} />
          </div>
        </div>
      </section>
    </div>
  );
}
