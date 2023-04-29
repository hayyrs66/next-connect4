import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { database } from "./FirebaseService";

export default async function fetchGanadores() {
  const q = query(
    collection(database, "partidas"),
    orderBy("fechaCreacion", "desc"),
    limit(10)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;

    return {
      id,
      ganador: data.ganador,
      duracion: data.duracion,
      jugador1: data.jugador1,
      jugador2: data.jugador2,
      turnosGanador: data.turnosGanador
    };
  });
}
