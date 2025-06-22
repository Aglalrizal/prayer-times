const table = document.getElementById("prayer-times-table");
const tableBody = document.getElementById("prayer-times-table-body");
const loadingText = document.getElementById("loading");
const dateEl = document.getElementById("date");
const today = new Date();
const locationEl = document.getElementById("location");

function setDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  dateEl.classList.remove("d-none");
  dateEl.textContent = `🗓️ ${today.toLocaleDateString("id-ID", options)}`;
}

async function getLocationName(latitude = -6.2, longitude = 106.816666) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`
  );
  const data = await res.json();
  const address = data.address;

  let lokasi = `${address.village ?? ""}, ${address.county ?? ""}`;
  if (lokasi === ",") {
    lokasi = "Somewhere in universe";
  }
  return lokasi;
}

function renderLocation(lokasi) {
  locationEl.classList.remove("d-none");
  locationEl.textContent = `📍 ${lokasi}`;
}

async function prayerTimes(latitude = -6.2, longitude = 106.816666) {
  const res = await fetch(
    `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=20`
  );
  const data = await res.json();
  const prayerTimes = data.data[today.getDate() - 1].timings;
  return [
    { name: "Fajr", time: prayerTimes["Fajr"] },
    { name: "Dhuhr", time: prayerTimes["Dhuhr"] },
    { name: "Asr", time: prayerTimes["Asr"] },
    { name: "Maghrib", time: prayerTimes["Maghrib"] },
    { name: "Isha", time: prayerTimes["Isha"] },
  ];
}

function getUserLocation() {
  if (!navigator.geolocation) {
    alert("Izin lokasi tidak didukung oleh browser Anda");
  } else {
    navigator.geolocation.getCurrentPosition(succes, error);
  }
}

function showError(msg) {
  loadingText.textContent = msg;
  loadingText.classList.add("alert-warning");
  table.classList.add("d-none");
}

async function succes(position) {
  try {
    console.log(position.coords);
    const locationData = await getLocationName(
      position.coords.latitude,
      position.coords.longitude
    );
    loadingText.classList.add("d-none");
    renderLocation(locationData);
    setDate();
    const prayerTimeData = await prayerTimes(
      position.coords.latitude,
      position.coords.longitude
    );
    renderTable(prayerTimeData);
  } catch (error) {
    showError("Gagal mengambil data jadwal sholat.");
  }
}

async function error() {
  showError(
    "Tidak dapat mendapatkan lokasi anda. Menampilkan Jadwal untuk Jakarta"
  );
  renderLocation("Jakarta");
  setDate();
  const prayTimesData = await prayerTimes();
  renderTable(prayTimesData);
}

function renderTable(data) {
  table.classList.remove("d-none");
  tableBody.innerHTML = "";
  data.forEach(({ name, time }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${time}</td>
    `;
    tableBody.appendChild(row);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  getUserLocation();
});
