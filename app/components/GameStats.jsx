import "../../style/game.css";
import { useEffect, useState } from "react";
import fetchData from "@/service/client";

export const GameStats = ({elapsedTime}) => {
  const [timeline, setTimeLine] = useState([]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    fetchData().then(setTimeLine);
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-md">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Conecta cuatro
          </div>
          <span
            href="#"
            className="block mt-1 text-lg leading-tight font-medium text-black"
          >
            Estadísticas de la partida
          </span>
          <div className="flex mt-4">
            <div className="w-1/2">
              <span className="block mb-1 text-sm font-medium text-gray-600">
                Jugador 1
              </span>
              {timeline.map(({ id, jugador1 }) => (
                <span
                  key={id}
                  className="block text-xl font-semibold text-indigo-500"
                >
                  {jugador1}
                </span>
              ))}
            </div>
            <div className="w-1/2">
              <span className="block mb-1 text-sm font-medium text-gray-600">
                Jugador 2
              </span>

              {timeline.map(({ id, jugador2}) => (
                <span
                  key={id}
                  className="block text-xl font-semibold text-indigo-500"
                >
                  {jugador2}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <span className="block mb-1 text-sm font-medium text-gray-600">
              Tiempo transcurrido
            </span>
            <span className="block text-xl text-gray-900">
                {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
