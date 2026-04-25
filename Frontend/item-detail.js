const token = localStorage.getItem("access");
const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

async function loadItemDetails() {

  const response = await fetch(
    `https://campus-rent-jcul.onrender.com/api/items/${itemId}/`,
    {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  );

  const item = await response.json();

  document.getElementById("itemTitle").textContent = item.title;
  document.getElementById("itemLocation").textContent = "College: " + item.college;
  document.getElementById("itemDescription").textContent = item.description;
  document.getElementById("itemPrice").textContent = "₹" + item.price + " / month";

  document.getElementById("itemImage").src =
    item.image
      ? "https://campus-rent-jcul.onrender.com" + item.image
      : "default.png";
}

async function rentItem() {

  const response = await fetch(
    `https://campus-rent-jcul.onrender.com/api/rentals/request/${itemId}/`,
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  );

  const data = await response.json();

  if (response.ok) {
    alert("Rental request sent successfully!");
  } else {
    alert(data.error || "Failed to send request");
  }
}

loadItemDetails();
