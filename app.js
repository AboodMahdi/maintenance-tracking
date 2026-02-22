import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadTracking() {
  const container = document.getElementById("tracking-list");
  container.innerHTML = "Loading...";

  const querySnapshot = await getDocs(collection(db, "tracking"));

  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <strong>ID:</strong> ${doc.id} <br/>
      <strong>Name:</strong> ${data.name || "N/A"} <br/>
      <strong>Status:</strong> ${data.status || "N/A"}
    `;

    container.appendChild(card);
  });
}

loadTracking();
