import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("cards");

    data.users.forEach(user => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>البريد:</strong> ${user.email}</p>
        <p><strong>المدينة:</strong> ${user.city}</p>
        <p><strong>الحالة:</strong> ${user.status}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("خطأ في تحميل البيانات:", error);
  });
//////
// 🔥 ضع نفس بيانات firebase من تطبيقك
const firebaseConfig = {
  apiKey: "AIzaSyDYjzRZROER7nPX38uuIT8n76W4P36dvVg",
  authDomain: "maintenance-system-b72f9.firebaseapp.com",
  projectId: "maintenance-system-b72f9",
  storageBucket: "maintenance-system-b72f9.firebasestorage.app",
  messagingSenderId: "1063919452245",
  appId: "1:1063919452245:web:1fc13bd894e652a50254dc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.trackOrder = async function () {
  const orderNumber = document.getElementById("orderNumber").value;
  const resultDiv = document.getElementById("result");

  if (!orderNumber) {
    resultDiv.innerHTML = "ادخل رقم الطلب";
    return;
  }

  const q = query(
    collection(db, "repairs"),
    where("orderNumber", "==", orderNumber)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    resultDiv.innerHTML = "لم يتم العثور على الطلب";
    return;
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    resultDiv.innerHTML = `
      <p><b>اسم العميل:</b> ${data.customerName}</p>
      <p><b>الجهاز:</b> ${data.deviceType}</p>
      <p><b>الحالة:</b> ${data.status}</p>
      <p><b>الدفع:</b> ${data.paymentStatus}</p>
      <p><b>السعر:</b> ${data.finalPrice} ريال</p>
    `;
  });
};
