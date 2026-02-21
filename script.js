import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 ضع نفس بيانات firebase من تطبيقك
const firebaseConfig = {
  apiKey: "PUT_API_KEY_HERE",
  authDomain: "PUT_AUTH_DOMAIN_HERE",
  projectId: "PUT_PROJECT_ID_HERE",
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
