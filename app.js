import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function testConnection() {
  try {
    const snapshot = await getDocs(collection(db, "repairs"));
    console.log("Connected ✅");
    console.log("Documents count:", snapshot.size);
    alert("Connected. Documents: " + snapshot.size);
  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
  }
}

testConnection();
