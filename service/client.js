import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { database } from "./FirebaseService";

export default async function fetchData() {
  const q = query(
    collection(database, "partidas"),
    orderBy("fechaCreacion", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;

    return {
      id,
      ...data,
    };
  });
}
