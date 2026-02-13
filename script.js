// =============================================
// BİRLİKTE OLDUĞUMUZ İLK GÜN
// Format: new Date(YIL, AY(0-11), GÜN)
// =============================================
const BIRLIKTE_BASLANGIC = new Date(2021, 0, 18); // 18 Ocak 2021

// =============================================
// Albüm (24 foto) — dosya adların repo'dakiyle aynı olmalı
// =============================================
const ALBUM = [
  { src: "pictures/Orta1.jpeg",  note: "5 yıl da geçse sonunda gittiğimiz o yer" },
  { src: "pictures/Orta2.jpeg",  note: "Güzel havanın tadını çıkardığımız güzel bir günn" },
  { src: "pictures/Orta3.jpeg",  note: "İlk yetişkin doğum günü kutlamamız, evde misafir ağırlamayı ben çok sevdim" },
  { src: "pictures/Orta4.jpeg",  note: "Yan yana olamazsak bile görüntülü konuşuyoruz bizimkisi öyle bir aşk hikayesi" },
  { src: "pictures/Orta5.jpeg",  note: "İlk tatilimize giderkenn" },
  { src: "pictures/Orta6.jpeg",  note: "Dünyanın en havalı mülakat kıyafeti :) Onlar seni kaybetti" },
  { src: "pictures/Orta7.jpeg",  note: "Armutun iyisini ayılar yiyordu incirin peki???" },
  { src: "pictures/Orta8.jpeg",  note: "Yaptığın mangalla herkesin ağzını açık bırakışını unutamıyorum" },
  { src: "pictures/Orta9.jpeg",  note: "Ben bu beach olayına bayılıyorum tatilde en çok dinlendiğim gündü " },
  { src: "pictures/Orta10.jpeg", note: "Seni seçtim pikaçu abi sayesinde aldığım o çiçek hahahah" },
  { src: "pictures/Orta11.jpeg", note: "Arabayla ilk şehir dışına çıkışımız. Yakın zamanda bir Edirne gezisi?" },
  { src: "pictures/Orta12.jpeg", note: "DAĞLARDA BAĞLARDA BEN UYUDUM HEP ARABADA!?!?!" },
  { src: "pictures/Orta13.jpeg", note: "Ay karda senin evde olup bu pencere önünde kahvaltı etmek mükemmellllll" },
  { src: "pictures/Orta14.jpeg", note: "Sahilde oturup senin yaptığın köfte ekmeği yediğimiz o gün  biran önce bahar gelse keşke" },
  { src: "pictures/Orta15.jpeg", note: "Seninle her yol çok güzel sevgilim ama bu yaz bir başkaydı" },
  { src: "pictures/Orta16.jpeg", note: "Uyuyan Güzell" },
  { src: "pictures/Orta17.jpeg", note: "Seni harcadım sorryy Çooooook seviyorum!" },
  { src: "pictures/Orta18.jpeg", note: "İkea gezmek mi en sevdiğim en sevdiğim" },
  { src: "pictures/Orta19.jpeg", note: "Beraber yaptığımız ilk kurabiyemiz" },
  { src: "pictures/Orta20.jpeg", note: "Beni toplantıdayken de arabana aldığın için teşekkür ederim sevgilim " },
  { src: "pictures/Orta21.jpeg", note: "Neden kavga ettiğimizi unuttum ama bu figürleri aldığımızı hatırlıyorum" },
  { src: "pictures/Orta22.jpeg", note: "Daha sık tiyatroya gitmeliyiz bence" },
  { src: "pictures/Orta23.jpeg", note: "Ve artık o bir FENERBAHÇELİ !!!!!!!" },
  { src: "pictures/Orta24.jpeg", note: "Sevgilim, benimle ilgili tek değişmeyecek şey var ki o da şu : ISLANMAKTAN NEFRETTTTTT " },
];

document.addEventListener("DOMContentLoaded", function () {
  // ==========================
  // 1) Gün sayacı
  // ==========================
  function guncelleGunSayaci() {
    const baslangic = new Date(BIRLIKTE_BASLANGIC);
    baslangic.setHours(0, 0, 0, 0);

    const bugun = new Date();
    bugun.setHours(0, 0, 0, 0);

    const fark = bugun - baslangic;
    const gun = Math.floor(fark / (1000 * 60 * 60 * 24));

    const daysEl = document.getElementById("days");
    if (daysEl) daysEl.textContent = gun >= 0 ? gun : 0;
  }
  guncelleGunSayaci();
  setInterval(guncelleGunSayaci, 60000);

  // ==========================
  // Ortak popup (QA kartı)
  // ==========================
  const qaCardOverlay = document.getElementById("qa-card-overlay");
  const qaCardTitle = document.getElementById("qa-card-title");
  const qaCardContent = document.getElementById("qa-card-content");
  const qaCardClose = document.getElementById("qa-card-close");

  function qaPopupAc(title, content) {
    if (!qaCardOverlay || !qaCardTitle || !qaCardContent) return;
    qaCardTitle.textContent = title || "";
    qaCardContent.textContent = content || "";
    qaCardOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function qaPopupKapat() {
    if (!qaCardOverlay) return;
    qaCardOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (qaCardClose) qaCardClose.addEventListener("click", qaPopupKapat);
  if (qaCardOverlay) {
    qaCardOverlay.addEventListener("click", function (e) {
      if (e.target === qaCardOverlay) qaPopupKapat();
    });
  }

  // ==========================
  // 2) Albüm overlay + sağ/sol + swipe
  // ==========================
  const albumIconBtn = document.getElementById("album-icon-btn");
  const albumOverlay = document.getElementById("album-overlay");
  const albumClose = document.getElementById("album-overlay-close");
  const albumImg = document.getElementById("album-img");
  const albumNote = document.getElementById("album-note");
  const albumCount = document.getElementById("album-count");
  const albumPrev = document.getElementById("album-prev");
  const albumNext = document.getElementById("album-next");

  let albumIndex = 0;

  function albumRender() {
    if (!albumImg || !albumNote || !albumCount) return;
    const item = ALBUM[albumIndex];
    if (!item) return;

    albumImg.src = item.src;
    albumNote.textContent = item.note || "";
    albumCount.textContent = `${albumIndex + 1} / ${ALBUM.length}`;
  }

  function albumOpen() {
    if (!albumOverlay) return;
    albumOverlay.classList.add("open");
    albumOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    albumRender();
  }

  function albumCloseFn() {
    if (!albumOverlay) return;
    albumOverlay.classList.remove("open");
    albumOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function albumNextFn() {
    albumIndex = (albumIndex + 1) % ALBUM.length;
    albumRender();
  }

  function albumPrevFn() {
    albumIndex = (albumIndex - 1 + ALBUM.length) % ALBUM.length;
    albumRender();
  }

  if (albumIconBtn) albumIconBtn.addEventListener("click", albumOpen);
  if (albumClose) albumClose.addEventListener("click", albumCloseFn);
  if (albumNext) albumNext.addEventListener("click", albumNextFn);
  if (albumPrev) albumPrev.addEventListener("click", albumPrevFn);

  if (albumOverlay) {
    albumOverlay.addEventListener("click", function (e) {
      // dış alana tıklayınca kapat
      if (e.target === albumOverlay) albumCloseFn();
    });
  }

  // Swipe (sağa/sola kaydır)
  let touchX = null;
  if (albumImg) {
    albumImg.addEventListener("touchstart", (e) => {
      touchX = e.touches[0].clientX;
    }, { passive: true });

    albumImg.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - touchX;
      touchX = null;

      if (Math.abs(diff) < 40) return;
      if (diff < 0) albumNextFn();
      else albumPrevFn();
    }, { passive: true });
  }

  // ESC ile kapat
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    albumCloseFn();
    qaPopupKapat();
  });

  // ==========================
  // 3) 1–25 + 26 (kalpler)
  // ==========================
  const QA_DATA = [
    { content: "İlk buluşmamız için taa Lüleburgaza gelmen bu çocuk beni gerçekten çok seviyor dediğim ilk gündü..." },
    { content: "Burgaza gelip kaza yaptığında çok korktum çok üzüldüm" },
    { content: "Bu yaz yaptığımız tatil mükemmel ötesiydi" },
    { content: "Her kararımda danıştığım ilk insansın" },
    { content: "Sana ilk ne zaman güvendim bilmiyorum amaaa o günden beri yanındayken evimde hissediyorum." },
    { content: "Seninle uyumak dünyadaki en güzel şeylerden biri" },
    { content: "Seni neden seviyorum bilmiyorum ama seninle olmayı neden çok sevdiğimi biliyorum: her koşulda günümü güzelleştirebildiğin için." },
    { content: "En yakın arkadaşım olduğun için teşekkür ederim sevgilim" },
    { content: "Bana telefonla konuşmayı sevdirdin, artık her şey için seni arıyorum. Yakalandın! hahaha" },
    { content: "Ne yaşarsak yaşayalım sarıldığımızda her şeyin çözüleceğini bilmek dünyadaki en güzel hislerden biri" },
    { content: "İlk doğum günümde benden ayrılıp sonra barışma fikrine çok sinirlensem de şimdi bakınca çok komik geliyor" },
    { content: "Sana her gelme dediğimde iyi ki geldin sevgilim ve her zamanki gibi bana çok iyi geldin." },
    { content: "Albüme bakınca ne çok ilkler var değil mi… daha beraber yaşayacağımız çok ilk var, hepsi için sabırsızlanıyorum" },
    { content: "Futbol maçında sakatlanmanı unutamayacağım, yaşlı dedeler gibiydin" },
    { content: "Son kutladığımız sevgililer gününde çiçek almaya yetişememen ve sonra gidip alman trajikomikti. Umarım bu sene unutmamışsındır." },
    { content: "Bizim için çabalarını görüyorum sevgilim, yoksaydığım zamanlarda da biliyorum. Hepsi için özür dilerim." },
    { content: "Yapıcam dediğin her şeyi yapmana bayılıyorum" },
    { content: "Kütüphanede ders çalışmalarımızı, Yıldız’ı ve o zamanlarımızı çok özledim." },
    { content: "Her regl dönemi öncesi kavga çıkarıyorum, özür dilerim" },
    { content: "Hep böyle kalalım… hep çok mutlu olamayız ama mutlu olduğumuz hiçbir anı unutmayalım" },
    { content: "Beraber okuduk, beraber çalıştık, beraber mezun olduk… daha nice güzel başarılarımıza sevgilim" },
    { content: "Sen ve ben, birlikte. Takımız. Artık 'ben' değil 'biz' diye düşünmek en güzel his." },
    { content: "İyi ki o kulübe girmişsin, iyi ki her şeyi göze aldık, iyi ki barıştık, iyi ki hayatımdasın... " },
    { content: "Seni çoooooooooooook seviyorum" },
    { title: "__FAV5__", content: "" },
  ];

  const heartsWrap = document.getElementById("fav5-hearts");
  const numberGrid = document.getElementById("number-grid");

  if (numberGrid && QA_DATA.length) {
    numberGrid.innerHTML = "";
    for (let i = 0; i < QA_DATA.length; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "number-btn";
      btn.textContent = String(i + 1);

      btn.addEventListener("click", function () {
        const item = QA_DATA[i];
        if (!item) return;

        if (item.title === "__FAV5__") {
          if (!heartsWrap) return;
          heartsWrap.classList.toggle("open");
          heartsWrap.setAttribute("aria-hidden", heartsWrap.classList.contains("open") ? "false" : "true");
          return;
        }
        qaPopupAc(String(i + 1), item.content);
      });

      numberGrid.appendChild(btn);
    }
  }

  // 5 kalp
  const heartBtns = document.querySelectorAll(".fav5-heart-btn");
  heartBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      const title = b.getAttribute("data-title") || "";
      const text = b.getAttribute("data-text") || "";
      qaPopupAc(title, text);
    });
  });
});

// ===============================
// Quiz: Başla -> Popup içinde sorular
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("quiz-start-btn");
  const overlay = document.getElementById("qa-card-overlay");
  const titleEl = document.getElementById("qa-card-title");
  const contentEl = document.getElementById("qa-card-content");
  if (!startBtn || !overlay || !titleEl || !contentEl) return;

  const QUIZ = [
    { q: "1) Benim yükselenim ne?" },
    { q: "2) Benim köyümün adı ne?" },
    { q: "3) Keşke sana bunu yaşatmasaydım dediğin bir an var mı?" },
    { q: "4) Birlikte yapmayı en çok sevdiğin şey ne?" },
    { q: "5) Benim hangi huyum seni hem sinir edip hem güldürüyor?" },
    { q: "6) Birlikte en mutlu hissettiğin an hangisiydi?" },
    { q: "7) İlişkimizde en çok değer verdiğin şey ne?" },
    { q: "8) Eğer değiştirebilseydin hangi özelliğimi değiştirmek isterdin?" },
    { q: "9) Sana aldığım en sevdiğin hediye hangisi?" },
    { q: "10) Çoooook mu? Çooooooooooooooook mu? Beni ne kadar seviyorsun?" },
  ];

  let i = 0;

  function openPopup(q) {
    titleEl.textContent = q;
    contentEl.innerHTML = `
      <div style="color: var(--text-soft); line-height: 1.7;"></div>
      <div style="margin-top: 1rem; display:flex; justify-content: space-between; gap: .75rem;">
        <button id="quiz-prev" type="button" style="flex:1; border:2px solid var(--rose); background:#fff; border-radius:14px; padding:.7rem 1rem; cursor:pointer; font-weight:700; color: var(--rose-dark);">Geri</button>
        <button id="quiz-next" type="button" style="flex:1; border:2px solid var(--rose); background: linear-gradient(135deg, #fff 0%, var(--blush) 100%); border-radius:14px; padding:.7rem 1rem; cursor:pointer; font-weight:700; color: var(--rose-dark);">İleri</button>
      </div>
      <div style="margin-top:.8rem; text-align:center; color: var(--text-soft); font-size:.9rem;">
        ${i + 1} / ${QUIZ.length}
      </div>
    `;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    const prevBtn = document.getElementById("quiz-prev");
    const nextBtn = document.getElementById("quiz-next");

    if (prevBtn) {
      prevBtn.disabled = i === 0;
      prevBtn.style.opacity = i === 0 ? "0.5" : "1";
      prevBtn.onclick = () => {
        if (i > 0) { i--; openPopup(QUIZ[i].q); }
      };
    }

    if (nextBtn) {
      nextBtn.textContent = i === QUIZ.length - 1 ? "Bitir" : "İleri";
      nextBtn.onclick = () => {
        if (i < QUIZ.length - 1) { i++; openPopup(QUIZ[i].q); }
        else { titleEl.textContent = "Bitti 💗"; contentEl.innerHTML = ""; }
      };
    }
  }

  startBtn.addEventListener("click", function () {
    i = 0;
    openPopup(QUIZ[i].q);
  });
});

// ===============================
// Music toggle
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");
  const note = document.getElementById("music-note");
  if (!music || !btn) return;

  let isPlaying = false;

  btn.addEventListener("click", function () {
    if (!isPlaying) {
      music.volume = 0.5;
      music.currentTime = 0;
      music.play();

      btn.classList.add("playing");
      if (note) note.classList.add("show");
      isPlaying = true;
    } else {
      music.pause();

      btn.classList.remove("playing");
      if (note) note.classList.remove("show");
      isPlaying = false;
    }
  });
});
