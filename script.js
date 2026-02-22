function trackOrder() {
  const orderId = document.getElementById("orderId").value.trim();
  const resultDiv = document.getElementById("result");

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = "<p>❌ لم يتم العثور على الطلب</p>";
    return;
  }

  resultDiv.classList.remove("hidden");

  resultDiv.innerHTML = `
    <h3>تفاصيل الطلب</h3>
    <p><strong>العميل:</strong> ${order.customer}</p>
    <p><strong>الجهاز:</strong> ${order.device}</p>
    <p><strong>المشكلة:</strong> ${order.issue}</p>
    <p class="status ${order.status}">
      الحالة: ${translateStatus(order.status)}
    </p>

    <div class="timeline">
      <strong>سجل الحالة:</strong>
      ${order.history.map(step => `<div>✔ ${step}</div>`).join("")}
    </div>
  `;
}

function translateStatus(status) {
  if (status === "open") return "قيد الانتظار";
  if (status === "in_progress") return "قيد الإصلاح";
  if (status === "done") return "تم الانتهاء";
  return status;
}
