import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadRepairs() {
  const container = document.getElementById("tracking-list");
  container.innerHTML = "Loading...";

  try {
    // ✅ القراءة من repairs
    const querySnapshot = await getDocs(collection(db, "repairs"));

    console.log("Documents found:", querySnapshot.size);

    if (querySnapshot.empty) {
      container.innerHTML = "❌ لا توجد بيانات داخل collection repairs";
      return;
    }

    container.innerHTML = `<h3>عدد السجلات: ${querySnapshot.size}</h3>`;

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const card = document.createElement("div");
      card.className = "card";

      let fieldsHTML = "";
      for (const key in data) {
        fieldsHTML += `<strong>${key}:</strong> ${data[key]} <br/>`;
      }

      card.innerHTML = `
        <strong>Document ID:</strong> ${doc.id} <br/><br/>
        ${fieldsHTML}
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Firestore error:", error);
    container.innerHTML = "❌ حصل خطأ — افتح Console";
  }
}

loadRepairs();
