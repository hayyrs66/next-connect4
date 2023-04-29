"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import fetchGanadores from "@/service/fetch";

export default function Ranking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchGanadores().then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
        Últimos 10 Ganadores
        </h1>
      </div>
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="relative bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500 mb-0">
                      Ganador
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 mb-0">
                      {item.ganador}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500 mb-0">
                      Turnos del ganador
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 mb-0">
                      {item.turnosGanador}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500 mb-0">
                      Duracion:
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 mb-0">
                      {item.duracion}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500 mb-0">
                      Jugadores
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 mb-0">
                      {item.jugador1} vs {item.jugador2}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
