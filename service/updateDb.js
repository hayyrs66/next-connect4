import { doc, updateDoc } from "firebase/firestore";
import { database } from "../service/FirebaseService";

export default async function updateData(partidaId, ganador, duracion, turnosGanador) {
  const partidasRef = doc(database, "partidas", partidaId);

  await updateDoc(partidasRef, {
        ganador: ganador,
        duracion: duracion,
        turnosGanador: turnosGanador
  })

}
