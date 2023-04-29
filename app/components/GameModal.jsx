import Link from "next/link";

export default function GameModal({
  sendWinner,
  turnosGanador,
  elapsedTime,
  closeModal,
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Resultado de la partida
          </h2>
          <p className="text-gray-600">
            Ganador:{" "}
            <span className="text-indigo-500 font-semibold">{sendWinner}</span>
          </p>
          <p className="text-gray-600">
            Turnos del ganador:{" "}
            <span className="text-indigo-500 font-semibold">
              {turnosGanador}
            </span>
          </p>
          <p className="text-gray-600 mt-2">
            Duración de la partida:{" "}
            <span className="font-semibold">{elapsedTime}</span>
          </p>
          <div className="mt-6 flex">
            <Link href={"/"}>
              <button className="mr-4 px-3 py-[0.150rem] font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-all border border-transparent rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                Página principal
              </button>
            </Link>
            <button
              onClick={closeModal}
              className="px-3 py-[0.150rem] font-medium text-white bg-red-500 hover:bg-red-600 transition-all border border-transparent rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
