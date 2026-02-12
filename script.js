// ═══════════════════════════════════════════════════════
// BİRLİKTE OLDUĞUMUZ İLK GÜN
// Format: Yıl, Ay (0-11), Gün
// ═══════════════════════════════════════════════════════
const BIRLIKTE_BASLANGIC = new Date(2020, 0, 18); // 18 Ocak 2020

document.addEventListener('DOMContentLoaded', function () {
  // =====================================================
  // 1) Gün sayacı
  // =====================================================
  function guncelleGunSayaci() {
    const baslangic = new Date(BIRLIKTE_BASLANGIC);
    baslangic.setHours(0, 0, 0, 0);

    const bugun = new Date();
    bugun.setHours(0, 0, 0, 0);

    const fark = bugun - baslangic;
    const gun = Math.floor(fark / (1000 * 60 * 60 * 24));

    const daysEl = document.getElementById('days');
    if (daysEl) daysEl.textContent = gun >= 0 ? gun : 0;
  }
  guncelleGunSayaci();
  setInterval(guncelleGunSayaci, 60000);

  // =====================================================
  // Ortak popup (QA kartı)
  // =====================================================
  const qaCardOverlay = document.getElementById('qa-card-overlay');
  const qaCardTitle = document.getElementById('qa-card-title');
  const qaCardContent = document.getElementById('qa-card-content');
  const qaCardClose = document.getElementById('qa-card-close');

  function qaPopupAc(title, content) {
    if (!qaCardOverlay || !qaCardTitle || !qaCardContent) return;
    qaCardTitle.textContent = title || '';
    qaCardContent.textContent = content || '';
    qaCardOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function qaPopupKapat() {
    if (!qaCardOverlay) return;
    qaCardOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (qaCardClose) qaCardClose.addEventListener('click', qaPopupKapat);
  if (qaCardOverlay) {
    qaCardOverlay.addEventListener('click', function (e) {
      if (e.target === qaCardOverlay) qaPopupKapat();
    });
  }

  // =====================================================
  // 2) Albüm Slider (buton -> overlay aç, swipe + oklar)
  // =====================================================
  const albumBtn = document.getElementById('album-icon-btn');
  const albumOverlay = document.getElementById('album-slider-overlay');
  const albumClose = document.getElementById('album-slider-close');
  const albumPrev = document.getElementById('album-slider-prev');
  const albumNext = document.getElementById('album-slider-next');
  const albumImg = document.getElementById('album-slider-img');
  const albumNote = document.getElementById('album-slider-note');
  const albumCounter = document.getElementById('album-slider-counter');
  const albumContent = document.getElementById('album-slider-content');

  const ALBUM_PHOTOS = [
    "pictures/Orta1.jpeg","pictures/Orta2.jpeg","pictures/Orta3.jpeg","pictures/Orta4.jpeg",
    "pictures/Orta5.jpeg","pictures/Orta6.jpeg","pictures/Orta7.jpeg","pictures/Orta8.jpeg",
    "pictures/Orta9.jpeg","pictures/Orta10.jpeg","pictures/Orta11.jpeg","pictures/Orta12.jpeg",
    "pictures/Orta13.jpeg","pictures/Orta14.jpeg","pictures/Orta15.jpeg","pictures/Orta16.jpeg",
    "pictures/Orta17.jpeg","pictures/Orta18.jpeg","pictures/Orta19.jpeg","pictures/Orta20.jpeg",
    "pictures/Orta21.jpeg","pictures/Orta22.jpeg","pictures/Orta23.jpeg","pictures/Orta24.jpeg"
  ];

  const ALBUM_NOTES = [
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
    "Sevgililer günüü.. Yalan söyleyip gizlice bana çiçek alman ahahahaah Tüm yalanların böyle olsun",
    "Çooooook seviyorum!",
    "İyi ki doğmuştun!",
    "Ne kadar kötü olsam da huzur bulduğum yer..",
    "Korkunç kararlarımı bile desteklemen ahahahahha",
    "İlk beraber oy kullanmamızz",
    "En güzel başarımız..",
    "Beraber çok güzeliz!",
    "Korkunç yazımın en güzel günü!"
  ];

  let albumIndex = 0;

  function albumRender() {
    if (!albumImg || !albumNote) return;
    albumImg.src = ALBUM_PHOTOS[albumIndex];
    albumNote.textContent = ALBUM_NOTES[albumIndex] || "";
    if (albumCounter) albumCounter.textContent = `${albumIndex + 1} / ${ALBUM_PHOTOS.length}`;
  }

  function albumOpen() {
    if (!albumOverlay) return;
    albumOverlay.classList.add('open');
    albumOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    albumRender();
  }

  function albumCloseFn() {
    if (!albumOverlay) return;
    albumOverlay.classList.remove('open');
    albumOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function albumPrevFn() {
    albumIndex = (albumIndex - 1 + ALBUM_PHOTOS.length) % ALBUM_PHOTOS.length;
    albumRender();
  }

  function albumNextFn() {
    albumIndex = (albumIndex + 1) % ALBUM_PHOTOS.length;
    albumRender();
  }

  if (albumBtn) albumBtn.addEventListener('click', albumOpen);
  if (albumClose) albumClose.addEventListener('click', albumCloseFn);
  if (albumOverlay) {
    albumOverlay.addEventListener('click', (e) => {
      if (e.target === albumOverlay) albumCloseFn();
    });
  }
  if (albumPrev) albumPrev.addEventListener('click', albumPrevFn);
  if (albumNext) albumNext.addEventListener('click', albumNextFn);

  // Swipe (iPad için)
  let touchX = null;
  if (albumContent) {
    albumContent.addEventListener('touchstart', (e) => {
      touchX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].screenX : null;
    }, { passive: true });

    albumContent.addEventListener('touchend', (e) => {
      const endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].screenX : null;
      if (touchX === null || endX === null) return;
      const diff = endX - touchX;
      if (Math.abs(diff) < 40) return; // eşik
      if (diff > 0) albumPrevFn(); else albumNextFn();
      touchX = null;
    }, { passive: true });
  }

  // =====================================================
  // 3) Rakamlı Anılar (1–25 + 26 FAV5)
  // =====================================================
  const QA_DATA = [
    { content: 'İlk buluşmamız için taa Lüleburgaza gelmen bu çocuk beni gerçekten çok seviyor dediğim ilk gündü...' },
    { content: 'Burgaza gelip kaza yaptığında çok korktum çok üzüldüm' },
    { content: 'Bu yaz yaptığımız tatil mükemmel ötesiydi' },
    { content: 'Her kararımda danıştığım ilk insansın' },
    { content: 'Sana ilk ne zaman güvendim bilmiyorum amaaa o günden beri yanındayken evimde hissediyorum.' },
    { content: 'Ada tatilinde sarhoş olup uyumama rağmen beni ttlı tatlı öpüp hiç kızmaman ahahah seni yerim.' },
    { content: 'Seni neden seviyorum bilmiyorum amaa seninle olmayı neden çok sevdiğimi biliyorum: her koşulda günümü bir şekilde güzelleştirebildiğin ve daha tonla sayabileceğim nedenden' },
    { content: 'En yakın arkadaşım olduğun için teşekkür ederim sevgilim' },
    { content: 'Bana telefonla konuşmayı sevdirdin artık her şey için seni arıyorum yakalandın hahahsh' },
    { content: 'Ne yaşarsak yaşayalım sarıldığımızda her şeyin çözüleceğini bilmek dünyadaki en güzel hislerde biri' },
    { content: 'İlk doğum günümde benden ayrılıp sonra barışma fikrine çok sinirlensem de şimdi bakınca çok komik geliyor' },
    { content: 'Sana her gelme dediğimde iyi ki geldin sevgilim ve her zamanki gibi bana çok iyi geldin.' },
    { content: 'Albüme bakınca ne çok ilkler var değil mi, daha beraber yaşayacağımız çok ilk var, hepsi için sabırsızlanıyorum' },
    { content: 'Futbol maçında sakatlanmanı unutamayacağım yaşlı dedeler gibiydin' },
    { content: 'Son kutladığımız sevgililer gününde çiçek almaya yetişememen ve sonra gidip almana kızdığım için özür dilerimmm çok güzellerdi. Umarım bu sene zamanında alabilmişsindir' },
    { content: 'Bizim için çabalarını görüyorum sevgilim, yoksaydığım zamanlarda da biliyor oluyorum aslında hepsi için özür dilerim.' },
    { content: 'Yapıcam dediğin her şeyi yapmana bayılıyorum' },
    { content: 'Kütüphanede ders çalışmalarımızı Yıldızı ve o zamanlarımızı çok özledim.' },
    { content: 'Her regl dönemi öncesi kavga çıkarıyorum özür dilerim' },
    { content: 'Hep böyle kalalım, hep çok mutlu olamayız ama mutlu olduğumuz hiçbir anı unutmayalım' },
    { content: 'Beraber okuduk,beraber çalıştık,beraber mezun olduk daha nice güzel başarılarımıza sevgilim' },
    { content: 'Sen ve ben, birlikte. Takımız. Artık "ben" değil "biz" diye düşünmek en güzel his.' },
    { content: 'Seni çoooooooooooook seviyorum' },
    { content: 'İyi ki o kulübe girmişsin, iyi ki her şeyi göze aldık, iyi ki barıştık,iyi ki hayatımdasın...' },
    { title: '__FAV5__', content: '' }
  ];

  const heartsWrap = document.getElementById('fav5-hearts');
  const numberGrid = document.getElementById('number-grid');

  if (numberGrid && QA_DATA.length) {
    numberGrid.innerHTML = '';
    for (let i = 0; i < QA_DATA.length; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'number-btn';
      btn.textContent = String(i + 1);

      btn.addEventListener('click', function () {
        const item = QA_DATA[i];
        if (!item) return;

        if (item.title === '__FAV5__') {
          if (!heartsWrap) return;
          heartsWrap.classList.toggle('open');
          heartsWrap.setAttribute('aria-hidden', heartsWrap.classList.contains('open') ? 'false' : 'true');
          return;
        }

        qaPopupAc(item.title, item.content);
      });

      numberGrid.appendChild(btn);
    }
  }

  // 5 kalp
  const heartBtns = document.querySelectorAll('.fav5-heart-btn');
  heartBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      const title = b.getAttribute('data-title') || '';
      const text = b.getAttribute('data-text') || '';
      qaPopupAc(title, text);
    });
  });

  // =====================================================
  // 4) Quiz
  // =====================================================
  const startBtn = document.getElementById('quiz-start-btn');
  const titleEl = document.getElementById('qa-card-title');
  const contentEl = document.getElementById('qa-card-content');

  const QUIZ = [
    { q: "1) Benim yükselenim ne?" },
    { q: "2) Benim köyümün adı ne?" },
    { q: "3) Keşke sana bunu yaşatmasaydım dediğin bir an var mı?" },
    { q: "4) Birlikte ne yapmayı en çok seviyorum?" },
    { q: "5) Beni en çok sinirlendiren şey ne?" },
    { q: "6) İlk buluşmamızda ne giymiştim?" },
    { q: "7) Hangi mevsimi en çok severim?" },
    { q: "8) Eğer değiştirebilseydin bana aldığın hangi hediyeyi geri almak isterdin?" },
    { q: "9) Benimle ilgili sevmediğin bir özellik söyle?" },
    { q: "10) Çoooook mu? Çooooooooooooooook mu?" }
  ];

  let qi = 0;

  function quizPopupAc() {
    if (!qaCardOverlay || !titleEl || !contentEl) return;

    titleEl.textContent = QUIZ[qi].q;

    contentEl.innerHTML = `
      <div style="margin-top: 1rem; display:flex; justify-content: space-between; gap: .75rem;">
        <button id="quiz-prev" type="button" style="flex:1; border:2px solid var(--rose); background: #fff; border-radius: 14px; padding:.7rem 1rem; cursor:pointer; font-weight:700; color: var(--rose-dark);">Geri</button>
        <button id="quiz-next" type="button" style="flex:1; border:2px solid var(--rose); background: linear-gradient(135deg, #fff 0%, var(--blush) 100%); border-radius: 14px; padding:.7rem 1rem; cursor:pointer; font-weight:700; color: var(--rose-dark);">İleri</button>
      </div>

      <div style="margin-top:.8rem; text-align:center; color: var(--text-soft); font-size:.9rem;">
        ${qi + 1} / ${QUIZ.length}
      </div>
    `;

    qaCardOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    const prev = document.getElementById('quiz-prev');
    const next = document.getElementById('quiz-next');

    if (prev) {
      prev.disabled = (qi === 0);
      prev.style.opacity = (qi === 0) ? "0.5" : "1";
      prev.addEventListener('click', () => {
        if (qi > 0) { qi--; quizPopupAc(); }
      });
    }

    if (next) {
      next.textContent = (qi === QUIZ.length - 1) ? "Bitir" : "İleri";
      next.addEventListener('click', () => {
        if (qi < QUIZ.length - 1) {
          qi++; quizPopupAc();
        } else {
          titleEl.textContent = "Bitti 💗";
          contentEl.innerHTML = "";
        }
      });
    }
  }

  if (startBtn) {
    startBtn.addEventListener('click', function () {
      qi = 0;
      quizPopupAc();
    });
  }

  // =====================================================
  // 5) Müzik toggle
  // =====================================================
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const note = document.getElementById('music-note');
  let isPlaying = false;

  if (music && musicBtn) {
    musicBtn.addEventListener('click', function () {
      if (!isPlaying) {
        music.volume = 0.5;
        music.play();
        musicBtn.classList.add('playing');
        if (note) note.classList.add('show');
        isPlaying = true;
      } else {
        music.pause();
        musicBtn.classList.remove('playing');
        if (note) note.classList.remove('show');
        isPlaying = false;
      }
    });
  }

  // =====================================================
  // 6) ESC ile kapat
  // =====================================================
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    qaPopupKapat();
    albumCloseFn();
    if (heartsWrap && heartsWrap.classList.contains('open')) {
      heartsWrap.classList.remove('open');
      heartsWrap.setAttribute('aria-hidden', 'true');
    }
  });
});
