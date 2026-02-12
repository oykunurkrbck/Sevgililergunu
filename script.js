// ═══════════════════════════════════════════════════════
// BİRLİKTE OLDUĞUMUZ İLK GÜN — Bu tarihi değiştir!
// Format: Yıl, Ay (0-11), Gün
// Örnek: 15 Haziran 2024 → new Date(2024, 5, 15)
// ═══════════════════════════════════════════════════════
const BIRLIKTE_BASLANGIC = new Date(2021, 0, 18); // 18 Ocak 2021

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
  setInterval(guncelleGunSayaci, 60000); // her dakika

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
  // 2) Albüm overlay (sol üst Albüm butonu)
  // =====================================================
  const albumIconBtn = document.getElementById('album-icon-btn');
  const albumOverlay = document.getElementById('album-overlay');
  const albumOverlayClose = document.getElementById('album-overlay-close');

  function albumOverlayAcKapat() {
    if (!albumOverlay) return;
    albumOverlay.classList.toggle('open');
  }

  if (albumIconBtn) albumIconBtn.addEventListener('click', albumOverlayAcKapat);

  if (albumOverlayClose) {
    albumOverlayClose.addEventListener('click', function () {
      if (albumOverlay) albumOverlay.classList.remove('open');
    });
  }

  if (albumOverlay) {
    albumOverlay.addEventListener('click', function (e) {
      if (e.target === albumOverlay) albumOverlay.classList.remove('open');
    });
  }

  // =====================================================
  // 3) Lightbox (foto tıkla -> büyük foto + not)
  // =====================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxNote = document.getElementById('lightbox-note');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function lightboxAc(imgSrc, note) {
    if (!lightbox || !lightboxImg || !lightboxNote) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = 'Anımız';
    lightboxNote.textContent = note || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function lightboxKapat() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item) {
    const img = item.querySelector('img');
    const note = item.getAttribute('data-note') || '';
    if (img) {
      item.addEventListener('click', function () {
        const src = img.src || '';
        // Unsplash paramlarını büyütmeye çalış; yoksa aynen bırak
        const bigSrc = src.includes('&w=') ? src.replace(/&w=\d+&h=\d+/, '&w=800&h=800') : src;
        lightboxAc(bigSrc, note);
      });
    }
  });

  if (lightboxClose) lightboxClose.addEventListener('click', lightboxKapat);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightboxKapat();
    });
  }

  // =====================================================
  // 4) 1–25 Soru/Cevap verisi + sayı grid
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

        // 26 özel davranış
        if (item.title === '__FAV5__') {
          if (!heartsWrap) return;
          heartsWrap.classList.toggle('open');
          heartsWrap.setAttribute(
            'aria-hidden',
            heartsWrap.classList.contains('open') ? 'false' : 'true'
          );
          return;
        }

        qaPopupAc(item.title, item.content);
      });

      numberGrid.appendChild(btn);
    }
  }

  // =====================================================
  // 5) 5 kalp tıklayınca yazı aç
  // =====================================================
  const heartBtns = document.querySelectorAll('.fav5-heart-btn');
  heartBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      const title = b.getAttribute('data-title') || '';
      const text = b.getAttribute('data-text') || '';
      qaPopupAc(title, text);
    });
  });

  // 6) En alttaki gizli mesaj alanı (sayfada yoksa sorun değil)
  const secretWrap = document.getElementById('secret-message');
  const secretToggle = document.getElementById('secret-toggle');
  if (secretWrap && secretToggle) {
    secretToggle.addEventListener('click', function () {
      secretWrap.classList.toggle('open');
    });
  }

  // =====================================================
  // 7) ESC ile hepsini kapat
  // =====================================================
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    lightboxKapat();
    qaPopupKapat();

    if (albumOverlay && albumOverlay.classList.contains('open')) {
      albumOverlay.classList.remove('open');
    }
    if (heartsWrap && heartsWrap.classList.contains('open')) {
      heartsWrap.classList.remove('open');
      heartsWrap.setAttribute('aria-hidden', 'true');
    }
  });
});

// ===============================
// Quiz: Başla -> Popup içinde sorular
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.getElementById('quiz-start-btn');
  const overlay = document.getElementById('qa-card-overlay');
  const titleEl = document.getElementById('qa-card-title');
  const contentEl = document.getElementById('qa-card-content');

  if (!startBtn || !overlay || !titleEl || !contentEl) return;

  const QUIZ = [
    { q: "1) Benim yükselenim ne?" },
    { q: "2) Benim köyümün adı ne?" },
    { q: "3) Keşke sana bunu yaşatmasaydım dediğin bir an var mı?" },
    { q: "4) Birlikte ne yapmayı en çok seviyorum?" },
    { q: "5) Beni en çok sinirlendiren şey ne?" },
    { q: "6) İlk buluşmamızda ne giymiştim?" },
    { q: "7) Hangi mevsimi en çok severim?" },
    { q: "8) Eğer değiştirebilseydin hangi özelliğimi değiştirmek isterdin?" },
    { q: "9) Benimle ilgili sevdiğin bir özellik söyle?" },
    { q: "10) Çoooook mu? Çooooooooooooooook mu?" }
  ];

  let i = 0;

  function openPopup(q, helperText) {
    titleEl.textContent = q;
    contentEl.innerHTML = `
      <div style="color: var(--text-soft); line-height: 1.7;">
        ${helperText || ""}
      </div>

      <div style="margin-top: 1rem; display:flex; justify-content: space-between; gap: .75rem;">
        <button id="quiz-prev" type="button" style="flex:1; border:2px solid var(--rose); background: #fff; border-radius: 14px; padding:.7rem 1rem; cursor:pointer; font-weight:700; color: var(--rose-dark);">Geri</button>
        <button id="quiz-next" type="button" style="flex:1; border:2px solid var(--rose); background: linear-gradient(135deg, #fff 0%, var(--blush) 100%); border-radius: 14px; padding:.7rem 1rem; cursor:pointer; font-weight:700; color: var(--rose-dark);">İleri</button>
      </div>

      <div style="margin-top:.8rem; text-align:center; color: var(--text-soft); font-size:.9rem;">
        ${i + 1} / ${QUIZ.length}
      </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    const prevBtn = document.getElementById('quiz-prev');
    const nextBtn = document.getElementById('quiz-next');

    if (prevBtn) {
      prevBtn.disabled = (i === 0);
      prevBtn.style.opacity = (i === 0) ? "0.5" : "1";
      prevBtn.addEventListener('click', function () {
        if (i > 0) {
          i--;
          openPopup(QUIZ[i].q, QUIZ[i].a);
        }
      });
    }

    if (nextBtn) {
      nextBtn.textContent = (i === QUIZ.length - 1) ? "Bitir" : "İleri";
      nextBtn.addEventListener('click', function () {
        if (i < QUIZ.length - 1) {
          i++;
          openPopup(QUIZ[i].q, QUIZ[i].a);
        } else {
          titleEl.textContent = "Bitti 💗";
          contentEl.innerHTML = ``;
        }
      });
    }
  }

  startBtn.addEventListener('click', function () {
    i = 0;
    openPopup(QUIZ[i].q, QUIZ[i].a);
  });
});

// ===============================
// Music toggle
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const music = document.getElementById('bg-music');
  const btn = document.getElementById('music-btn');
  const note = document.getElementById('music-note');

  if (!music || !btn) return;

  let isPlaying = false;

  btn.addEventListener('click', function () {
    if (!isPlaying) {
      music.volume = 0.5;
      music.play();

      btn.classList.add('playing');
      if (note) note.classList.add('show');

      isPlaying = true;
    } else {
      music.pause();

      btn.classList.remove('playing');
      if (note) note.classList.remove('show');

      isPlaying = false;
    }
  });
});
