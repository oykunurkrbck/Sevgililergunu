// ===============================
// 1) GÜN SAYACI
// ===============================
// 18 Ocak 2021
const start = new Date(2021, 0, 18);

function updateDays() {
  const now = new Date();

  // Saat farkı yüzünden 1 gün kaymasın diye ikisini de "günün başına" çekiyoruz
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);

  const n = new Date(now);
  n.setHours(0, 0, 0, 0);

  const diff = n - s;
  const days = Math.floor(diff / 86400000);

  const daysEl = document.getElementById("days");
  if (daysEl) daysEl.textContent = days >= 0 ? days : 0;
}

updateDays();
setInterval(updateDays, 60000);


// ===============================
// 2) FOTOĞRAF ALBÜMÜ (24 FOTO)
// ===============================
const photos = [
  { src: "pictures/Orta1.jpeg",  note: "Birlikte ilk kutlamamız" },
  { src: "pictures/Orta2.jpeg",  note: "İlk konserimiz" },
  { src: "pictures/Orta3.jpeg",  note: "Herhangi bir okul günü ama eminim seninle çok güzeldi." },
  { src: "pictures/Orta4.jpeg",  note: "Seni harcadım sorryy" },
  { src: "pictures/Orta5.jpeg",  note: "İlk tatilimiz" },
  { src: "pictures/Orta6.jpeg",  note: "Korkunç kavgalar sonrası böyle olabilmek.." },
  { src: "pictures/Orta7.jpeg",  note: "İlk Yeniyılımız" },
  { src: "pictures/Orta8.jpeg",  note: "Sana harika kombinler yaparken" },
  { src: "pictures/Orta9.jpeg",  note: "İlk Yıldönümümüz" },
  { src: "pictures/Orta10.jpeg", note: "Sana hep böyle bakacağım sevgilimm" },
  { src: "pictures/Orta11.jpeg", note: "YAKIŞIKLIMM" },
  { src: "pictures/Orta12.jpeg", note: "En sevmediğim anlar" },
  { src: "pictures/Orta13.jpeg", note: "Evde çalışma rollerii" },
  { src: "pictures/Orta14.jpeg", note: "Bugün ne güzeldik" },
  { src: "pictures/Orta15.jpeg", note: "Seni zorla götürdüğüm saçma sapan restoranda bile ne keyif almıştık!" },
  { src: "pictures/Orta16.jpeg", note: "Sevgililer günüü.. Yalan söyleyip gizlice bana çiçek alman ahahahaah Tüm yalanların böyle olsun" },
  { src: "pictures/Orta17.jpeg", note: "Çooooook seviyorum!" },
  { src: "pictures/Orta18.jpeg", note: "İyi ki doğmuştun!" },
  { src: "pictures/Orta19.jpeg", note: "Ne kadar kötü olsam da huzur bulduğum yer.." },
  { src: "pictures/Orta20.jpeg", note: "Korkunç kararlarımı bile desteklemen ahahahahha" },
  { src: "pictures/Orta21.jpeg", note: "İlk beraber oy kullanmamızz" },
  { src: "pictures/Orta22.jpeg", note: "En güzel başarımız.." },
  { src: "pictures/Orta23.jpeg", note: "Beraber çok güzeliz!" },
  { src: "pictures/Orta24.jpeg", note: "Korkunç yazımın en güzel günü!" }
];

let i = 0;

// HTML’de bu id’ler var mı kontrol edelim
const overlay = document.getElementById("albumOverlay");
const img = document.getElementById("albumImg");
const note = document.getElementById("albumNote");
const count = document.getElementById("albumCount");

const btnOpen = document.getElementById("albumBtn");
const btnClose = document.getElementById("closeAlbum");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");

function show() {
  if (!img || !note || !count) return;
  img.src = photos[i].src;
  note.textContent = photos[i].note || "";
  count.textContent = `${i + 1} / ${photos.length}`;
}

// Aç
if (btnOpen) {
  btnOpen.addEventListener("click", () => {
    if (!overlay) return;
    overlay.classList.add("active");
    show();
  });
}

// Kapat
if (btnClose) {
  btnClose.addEventListener("click", () => {
    if (!overlay) return;
    overlay.classList.remove("active");
  });
}

// Sağ
if (btnNext) {
  btnNext.addEventListener("click", () => {
    i = (i + 1) % photos.length;
    show();
  });
}

// Sol
if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    i = (i - 1 + photos.length) % photos.length;
    show();
  });
}

// Overlay dışına tıklayınca kapansın (isteğe bağlı)
if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("active");
  });
}

// Klavye okları + ESC (PC için)
document.addEventListener("keydown", (e) => {
  if (!overlay || !overlay.classList.contains("active")) return;

  if (e.key === "Escape") overlay.classList.remove("active");
  if (e.key === "ArrowRight") {
    i = (i + 1) % photos.length;
    show();
  }
  if (e.key === "ArrowLeft") {
    i = (i - 1 + photos.length) % photos.length;
    show();
  }
});
