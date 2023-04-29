import { useState, useEffect, useRef } from "react";
import { database } from "@/service/FirebaseService";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export const Modal = ({ isOpen, isClose }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [isComputer, setIsComputer] = useState(false);

  const router = useRouter();
  const path = "/game";

  const backdropRef = useRef(null);

  useEffect(() => {
    if (isClose) {
      setIsComputer(false);
    }
  }, [isClose]);
  

  const handleComputerOption = () => {
    setIsComputer(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const forbiddenWords = ["computadora", "bot", "robot"];
    const player1Lower = player1.toLowerCase();
  
    if (player1.trim() === "") {
      alert("Por favor ingrese el nombre del jugador 1.");
    } else if (player1.length > 7) {
      alert("El nombre del jugador 1 no puede tener más de 7 letras.");
    } else if (forbiddenWords.some((word) => player1Lower.includes(word))) {
      alert(
        "El nombre del jugador 1 no puede contener palabras como 'computadora', 'bot' o 'robot'."
      );
    } else {
      if (!isComputer) {
        const player2Lower = player2.toLowerCase();
  
        if (player2.trim() === "") {
          alert("Por favor ingrese el nombre del jugador 2.");
          return;
        } else if (player2.length > 7) {
          alert("El nombre del jugador 2 no puede tener más de 7 letras.");
          return;
        } else if (
          forbiddenWords.some((word) => player2Lower.includes(word))
        ) {
          alert(
            "El nombre del jugador 2 no puede contener palabras como 'computadora', 'bot' o 'robot'."
          );
          return;
        }
      }
  
      addDoc(collection(database, "partidas"), {
        jugador1: player1,
        jugador2: isComputer ? "computer" : player2,
        ganador: null,
        duracion: null,
        turnosGanador: null,
        fechaCreacion: new Date(),
      })
        .then(() => {
          router.push(path);
          console.log("enviado correctamente");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  

  if (!isOpen) {
    return null;
  }
  
  const closeModal = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
        <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Conecta 4
          </h2>
          <p className="mt-1 text-sm text-center text-gray-600">
            Ingrese los nombres de los jugadores
          </p>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="player1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jugador 1
                </label>
                <input
                  id="player1"
                  type="text"
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="player2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jugador 2
                </label>
                {!isComputer && (
                  <input
                    id="player2"
                    type="text"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                    className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
                 {isComputer && (
                  <span className="block text-xl font-[500] text-indigo-500">
                    Computer
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={isClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              >
                Cancelar
              </button>
              <div className="flex gap-3">
                {" "}
                <button
                  type="button"
                  onClick={handleComputerOption}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 transition-all border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:ring-blue-500 focus:border-blue-500"
                >
                  Contra computer
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-700 transition-all border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Empezar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
