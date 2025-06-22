# 🕌 Jadwal Sholat

Web app sederhana untuk menampilkan jadwal sholat hari saat web diakses berdasarkan lokasi pengguna. Dibuat menggunakan **HTML + JavaScript + Bootstrap 5**, dan memanfaatkan API dari [Aladhan](https://aladhan.com/prayer-times-api) dan [Nominatim OpenStreetMap](https://nominatim.org/).

## 🎯 Fitur

- Deteksi lokasi pengguna secara otomatis (via Geolocation API)
- Menampilkan:
  - Tanggal hari ini (format lokal)
  - Nama desa/kecamatan/kota
  - Tabel waktu sholat (Fajr, Dhuhr, Asr, Maghrib, Isha)
- **Fallback otomatis ke Jakarta** jika:
  - Pengguna menolak izin lokasi
  - Geolocation tidak didukung browser

## 🛠️ Teknologi

- ⚙️ Vanilla JavaScript
- 🎨 Bootstrap 5
- 🌐 [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api)
- 🗺️ [Nominatim OpenStreetMap API](https://nominatim.org/release-docs/develop/api/Reverse/)

## 🚀 Cara Menjalankan

1. Clone repository ini:

   ```bash
   git clone https://github.com/kamu/jadwal-sholat.git
   cd jadwal-sholat
   ```
