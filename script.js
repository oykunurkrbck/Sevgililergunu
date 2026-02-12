const albumBtn = document.getElementById("album-icon-btn");
const albumOverlay = document.getElementById("album-overlay");
const albumClose = document.getElementById("album-close");
const albumImg = document.getElementById("album-img");
const albumNote = document.getElementById("album-note");
const prevBtn = document.getElementById("album-prev");
const nextBtn = document.getElementById("album-next");

const photos = [
"pictures/Orta1.jpeg",
"pictures/Orta2.jpeg",
"pictures/Orta3.jpeg",
"pictures/Orta4.jpeg",
"pictures/Orta5.jpeg",
"pictures/Orta6.jpeg",
"pictures/Orta7.jpeg",
"pictures/Orta8.jpeg",
"pictures/Orta9.jpeg",
"pictures/Orta10.jpeg",
"pictures/Orta11.jpeg",
"pictures/Orta12.jpeg",
"pictures/Orta13.jpeg",
"pictures/Orta14.jpeg",
"pictures/Orta15.jpeg",
"pictures/Orta16.jpeg",
"pictures/Orta17.jpeg",
"pictures/Orta18.jpeg",
"pictures/Orta19.jpeg",
"pictures/Orta20.jpeg",
"pictures/Orta21.jpeg",
"pictures/Orta22.jpeg",
"pictures/Orta23.jpeg",
"pictures/Orta24.jpeg"
];

const notes = [
"Birlikte ilk kutlamamız",
"İlk konserimiz",
"Herhangi bir okul günü ama eminim seninle çok güzeldi.",
"Seni harcadım sorryy",
"İlk tatilimiz",
"Korkunç kavgalar sonrası böyle olabilmek..",
"İlk Yeniyılımız",
"Sana harika kombinler yaparken",
"İlk Yıldönümümüz",
"Sana hep böyle bakacağım sevgilimm",
"YAKIŞIKLIMM",
"En sevmediğim anlar",
"Evde çalışma rollerii",
"Bugün ne güzeldik",
"Seni zorla götürdüğüm saçma sapan restoranda bile ne keyif almıştık!",
"Sevgililer günü sürprizin 💐",
"Çooooook seviyorum!",
"İyi ki doğmuştun!",
"Ne kadar kötü olsam da huzur bulduğum yer..",
"Korkunç kararlarımı bile desteklemen",
"İlk beraber oy kullanmamızz",
"En güzel başarımız..",
"Beraber çok güzeliz!",
"Korkunç yazımın en güzel günü!"
];

let current = 0;

function updateAlbum() {
  albumImg.src = photos[current];
  albumNote.textContent = notes[current];
}

albumBtn.onclick = () => {
  albumOverlay.style.display = "flex";
  updateAlbum();
};

albumClose.onclick = () => {
  albumOverlay.style.display = "none";
};

prevBtn.onclick = () => {
  current = (current - 1 + photos.length) % photos.length;
  updateAlbum();
};

nextBtn.onclick = () => {
  current = (current + 1) % photos.length;
  updateAlbum();
};
