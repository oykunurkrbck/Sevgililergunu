@@ -1,530 +1,530 @@
// ═══════════════════════════════════════════════════════
// BİRLİKTE OLDUĞUMUZ İLK GÜN — Bu tarihi değiştir!
// Format: Yıl, Ay (0-11), Gün
// Örnek: 18 Ocak 2021 → new Date(2021, 0, 18)
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
  setInterval(guncelleGunSayaci, 60000);

  // =====================================================
  // 2) Ortak popup (QA kartı)
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
  // 3) Albüm overlay + Swipe’lı Albüm Oynatıcı
  // =====================================================
  const albumIconBtn = document.getElementById('album-icon-btn');
  const albumOverlay = document.getElementById('album-overlay');
  const albumOverlayClose = document.getElementById('album-overlay-close');

  // Albümdeki küçük foto grid'i (overlay içindeki gallery)
  const albumGallery = albumOverlay ? albumOverlay.querySelector('.gallery') : null;
  const albumItems = albumGallery ? Array.from(albumGallery.querySelectorAll('.gallery-item')) : [];

  // Oynatıcı elemanlarını script ile oluşturuyoruz (HTML'ye ekstra ekleme gerekmesin diye)
  let viewerWrap = null;
  let viewerImg = null;
  let viewerNote = null;
  let viewerCount = null;
  let viewerPrev = null;
  let viewerNext = null;
  let viewerBack = null;

  let currentIndex = 0;

  function buildAlbumViewerIfNeeded() {
    if (!albumOverlay || viewerWrap) return;

    viewerWrap = document.createElement('div');
    viewerWrap.id = 'album-viewer';
    viewerWrap.style.display = 'none';
    viewerWrap.style.maxWidth = '1100px';
    viewerWrap.style.margin = '14px auto 0';
    viewerWrap.style.padding = '0 10px 20px';
    viewerWrap.style.textAlign = 'center';

    // Üst: geri
    viewerBack = document.createElement('button');
    viewerBack.type = 'button';
    viewerBack.textContent = '← Albüme dön';
    viewerBack.style.border = '1px solid rgba(232,160,168,0.55)';
    viewerBack.style.background = 'rgba(255,255,255,0.85)';
    viewerBack.style.borderRadius = '14px';
    viewerBack.style.padding = '10px 12px';
    viewerBack.style.cursor = 'pointer';
    viewerBack.style.boxShadow = '0 12px 22px rgba(200,120,130,0.22)';
    viewerBack.style.color = '#4a3f3a';
    viewerBack.style.fontWeight = '800';
    viewerBack.style.margin = '6px 0 12px';

    // Foto alanı
    const frame = document.createElement('div');
    frame.style.position = 'relative';
    frame.style.borderRadius = '20px';
    frame.style.overflow = 'hidden';
    frame.style.background = 'rgba(255,255,255,0.92)';
    frame.style.border = '1px solid rgba(232,160,168,0.35)';
    frame.style.boxShadow = '0 24px 60px rgba(0,0,0,0.12)';
    frame.style.touchAction = 'pan-y'; // yatay swipe için iyi
    frame.style.userSelect = 'none';

    viewerImg = document.createElement('img');
    viewerImg.id = 'album-viewer-img';
    viewerImg.alt = 'Anımız';
    viewerImg.style.width = '100%';
    viewerImg.style.maxHeight = '72vh';
    viewerImg.style.objectFit = 'contain';
    viewerImg.style.display = 'block';
    viewerImg.style.background = '#000';

    // Prev / Next butonları
    viewerPrev = document.createElement('button');
    viewerPrev.type = 'button';
    viewerPrev.textContent = '‹';
    styleNavBtn(viewerPrev);
    viewerPrev.style.left = '10px';

    viewerNext = document.createElement('button');
    viewerNext.type = 'button';
    viewerNext.textContent = '›';
    styleNavBtn(viewerNext);
    viewerNext.style.right = '10px';

    // Alt bilgi
    const info = document.createElement('div');
    info.style.marginTop = '10px';
    info.style.background = 'rgba(255,255,255,0.85)';
    info.style.border = '1px solid rgba(232,160,168,0.35)';
    info.style.borderRadius = '16px';
    info.style.padding = '12px 12px';
    info.style.boxShadow = '0 14px 28px rgba(200,120,130,0.18)';
    info.style.textAlign = 'left';

    viewerCount = document.createElement('div');
    viewerCount.id = 'album-viewer-count';
    viewerCount.style.color = '#7a6b65';
    viewerCount.style.fontSize = '13px';
    viewerCount.style.marginBottom = '6px';
    viewerCount.style.fontWeight = '700';

    viewerNote = document.createElement('div');
    viewerNote.id = 'album-viewer-note';
    viewerNote.style.color = '#4a3f3a';
    viewerNote.style.fontSize = '16px';
    viewerNote.style.lineHeight = '1.65';

    info.appendChild(viewerCount);
    info.appendChild(viewerNote);

    frame.appendChild(viewerImg);
    frame.appendChild(viewerPrev);
    frame.appendChild(viewerNext);

    viewerWrap.appendChild(viewerBack);
    viewerWrap.appendChild(frame);
    viewerWrap.appendChild(info);

    // album-section içine koy (yoksa overlay sonuna koy)
    const albumSection = albumOverlay.querySelector('.album-section') || albumOverlay;
    albumSection.appendChild(viewerWrap);

    // Events
    viewerBack.addEventListener('click', function () {
      showAlbumGrid();
    });

    viewerPrev.addEventListener('click', function () {
      goPrev();
    });
    viewerNext.addEventListener('click', function () {
      goNext();
    });

    // Swipe
    let startX = 0;
    let startY = 0;
    let isDown = false;

    frame.addEventListener('touchstart', function (e) {
      if (!e.touches || e.touches.length !== 1) return;
      isDown = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    frame.addEventListener('touchend', function (e) {
      if (!isDown) return;
      isDown = false;
      // touchend'de changedTouches kullanılır
      const t = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : null;
      if (!t) return;

      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      // dikey kaydırma büyükse swipe sayma
      if (Math.abs(dy) > Math.abs(dx)) return;

      if (dx < -50) goNext();
      if (dx > 50) goPrev();
    });

    // Klavye (bilgisayarda)
    document.addEventListener('keydown', function (e) {
      if (!albumOverlay || !albumOverlay.classList.contains('open')) return;
      if (!viewerWrap || viewerWrap.style.display === 'none') return;

      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    });
  }

  function styleNavBtn(btn) {
    btn.style.position = 'absolute';
    btn.style.top = '50%';
    btn.style.transform = 'translateY(-50%)';
    btn.style.width = '46px';
    btn.style.height = '46px';
    btn.style.borderRadius = '16px';
    btn.style.border = '1px solid rgba(255,255,255,0.25)';
    btn.style.background = 'rgba(255,255,255,0.9)';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '28px';
    btn.style.fontWeight = '900';
    btn.style.color = '#c77b83';
    btn.style.boxShadow = '0 14px 28px rgba(0,0,0,0.18)';
  }

  function openAlbumOverlay() {
    if (!albumOverlay) return;
    albumOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    showAlbumGrid();
  }

  function closeAlbumOverlay() {
    if (!albumOverlay) return;
    albumOverlay.classList.remove('open');
    document.body.style.overflow = '';
    // viewer açık kalsa bile kapat
    if (viewerWrap) viewerWrap.style.display = 'none';
  }

  function showAlbumGrid() {
    // overlay içindeki grid görünsün, viewer gizlensin
    if (albumGallery) albumGallery.style.display = '';
    if (viewerWrap) viewerWrap.style.display = 'none';
  }

  function showAlbumViewer(index) {
    buildAlbumViewerIfNeeded();
    if (!viewerWrap || !viewerImg || !viewerNote || !viewerCount) return;
    if (!albumItems.length) return;

    currentIndex = clamp(index, 0, albumItems.length - 1);

    const item = albumItems[currentIndex];
    const img = item.querySelector('img');
    const note = item.getAttribute('data-note') || '';

    if (albumGallery) albumGallery.style.display = 'none';
    viewerWrap.style.display = 'block';

    if (img) {
      // GitHub Pages / Safari için güvenli: aynı src
      viewerImg.src = img.getAttribute('src') || img.src;
    }
    viewerNote.textContent = note;
    viewerCount.textContent = `${currentIndex + 1} / ${albumItems.length}`;
  }

  function goPrev() {
    if (!albumItems.length) return;
    const nextIndex = (currentIndex - 1 + albumItems.length) % albumItems.length;
    showAlbumViewer(nextIndex);
  }

  function goNext() {
    if (!albumItems.length) return;
    const nextIndex = (currentIndex + 1) % albumItems.length;
    showAlbumViewer(nextIndex);
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  // Albüm butonu
  if (albumIconBtn) {
    albumIconBtn.addEventListener('click', function () {
      openAlbumOverlay();
    });
  }

  // Albüm kapat butonu
  if (albumOverlayClose) {
    albumOverlayClose.addEventListener('click', function () {
      closeAlbumOverlay();
    });
  }

  // Overlay arka plana tıklayınca kapat (içeriğe tıklayınca kapatma)
  if (albumOverlay) {
    albumOverlay.addEventListener('click', function (e) {
      if (e.target === albumOverlay) closeAlbumOverlay();
    });
  }

  // Grid içindeki fotoğraflara tıklayınca viewer aç
  if (albumItems.length) {
    albumItems.forEach(function (item, idx) {
      item.addEventListener('click', function () {
        showAlbumViewer(idx);
      });
    });
  }

  // =====================================================
  // 4) 1–25 + 26 (kalp) QA DATA + sayı grid
  // =====================================================
  const QA_DATA = [
    { title: '1', content: 'İlk buluşmamız için taa Lüleburgaza gelmen bu çocuk beni gerçekten çok seviyor dediğim ilk gündü...' },
    { title: '2', content: 'Burgaza gelip kaza yaptığında çok korktum çok üzüldüm' },
    { title: '3', content: 'Bu yaz yaptığımız tatil mükemmel ötesiydi' },
    { title: '4', content: 'Her kararımda danıştığım ilk insansın' },
    { title: '5', content: 'Sana ilk ne zaman güvendim bilmiyorum amaaa o günden beri yanındayken evimde hissediyorum.' },
    { title: '6', content: 'Ada tatilinde sarhoş olup uyumama rağmen beni tatlı tatlı öpüp hiç kızmaman ahahah seni yerim.' },
    { title: '6', content: 'Seninle uyumak dünyanın en rahat uykusu.' },
    { title: '7', content: 'Seni neden seviyorum bilmiyorum amaa seninle olmayı neden çok sevdiğimi biliyorum: her koşulda günümü bir şekilde güzelleştirebildiğin ve daha tonla sayabileceğim nedenden' },
    { title: '8', content: 'En yakın arkadaşım olduğun için teşekkür ederim sevgilim' },
    { title: '9', content: 'Bana telefonla konuşmayı sevdirdin artık her şey için seni arıyorum yakalandın hahahsh' },
    { title: '10', content: 'Ne yaşarsak yaşayalım sarıldığımızda her şeyin çözüleceğini bilmek dünyadaki en güzel hislerden biri' },
    { title: '11', content: 'İlk doğum günümde benden ayrılıp sonra barışma fikrine çok sinirlensem de şimdi bakınca çok komik geliyor' },
    { title: '12', content: 'Sana her gelme dediğimde iyi ki geldin sevgilim ve her zamanki gibi bana çok iyi geldin.' },
    { title: '13', content: 'Albüme bakınca ne çok ilkler var değil mi, daha beraber yaşayacağımız çok ilk var, hepsi için sabırsızlanıyorum' },
    { title: '14', content: 'Futbol maçında sakatlanmanı unutamayacağım yaşlı dedeler gibiydin' },
    { title: '15', content: 'Son kutladığımız sevgililer gününde çiçek almaya yetişememen ve sonra gidip almana kızdığım için özür dilerimmm çok güzellerdi.' },
    { title: '16', content: 'Bizim için çabalarını görüyorum sevgilim, yoksaydığım zamanlarda da biliyorum aslında… hepsi için özür dilerim.' },
    { title: '17', content: 'Yapıcam dediğin her şeyi yapmana bayılıyorum' },
    { title: '18', content: 'Kütüphanede ders çalışmalarımızı, Yıldızı ve o zamanlarımızı çok özledim.' },
    { title: '19', content: 'Her regl dönemi öncesi kavga çıkarıyorum özür dilerim' },
    { title: '20', content: 'Hep böyle kalalım, hep çok mutlu olamayız ama mutlu olduğumuz hiçbir anı unutmayalım' },
    { title: '21', content: 'Beraber okuduk, beraber çalıştık, beraber mezun olduk… daha nice güzel başarılarımıza sevgilim' },
    { title: '22', content: 'Sen ve ben, birlikte. Takımız. Artık "ben" değil "biz" diye düşünmek en güzel his.' },
    { title: '23', content: 'Seni çoooooooooooook seviyorum' },
    { title: '24', content: 'İyi ki o kulübe girmişsin, iyi ki her şeyi göze aldık, iyi ki barıştık, iyi ki hayatımdasın...' },
    { title: '23', content: 'İyi ki o kulübe girmişsin, iyi ki her şeyi göze aldık, iyi ki barıştık, iyi ki hayatımdasın... ' },
    { title: '24', content: 'Seni çoooooooooooook seviyorum' },
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

        // 26 özel: 5 kalp aç/kapat
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

  // =====================================================
  // 6) ESC ile hepsini kapat
  // =====================================================
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    qaPopupKapat();

    if (albumOverlay && albumOverlay.classList.contains('open')) {
      closeAlbumOverlay();
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
    { q: '1) Benim yükselenim ne?' },
    { q: '2) Benim köyümün adı ne?' },
    { q: '3) Keşke sana bunu yaşatmasaydım dediğin bir an var mı?' },
    { q: '4) Birlikte ne yapmayı en çok seviyorum?' },
    { q: '5) Beni en çok sinirlendiren şey ne?' },
    { q: '6) İlk buluşmamızda ne giymiştim?' },
    { q: '7) Hangi mevsimi en çok severim?' },
    { q: '8) Eğer değiştirebilseydin hangi özelliğimi değiştirmek isterdin?' },
    { q: '9) Benimle ilgili sevdiğin bir özellik söyle?' },
    { q: '10) Çoooook mu? Çooooooooooooooook mu?' }
  ];

  let i = 0;

  function openPopup(q) {
    titleEl.textContent = q;
    contentEl.innerHTML = `
      <div style="color: var(--text-soft); line-height: 1.7;">
        Cevabını bana söyle 💗
      </div>

      <div style="margin-top: 1rem; display:flex; justify-content: space-between; gap: .75rem;">
        <button id="quiz-prev" type="button" style="flex:1; border:2px solid var(--rose); background: #fff; border-radius: 14px; padding:.7rem 1rem; cursor:pointer; font-weight:800; color: var(--rose-dark);">Geri</button>
        <button id="quiz-next" type="button" style="flex:1; border:2px solid var(--rose); background: linear-gradient(135deg, #fff 0%, var(--blush) 100%); border-radius: 14px; padding:.7rem 1rem; cursor:pointer; font-weight:800; color: var(--rose-dark);">${i === QUIZ.length - 1 ? 'Bitir' : 'İleri'}</button>
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
      prevBtn.style.opacity = (i === 0) ? '0.5' : '1';
      prevBtn.addEventListener('click', function () {
        if (i > 0) {
          i--;
          openPopup(QUIZ[i].q);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (i < QUIZ.length - 1) {
          i++;
          openPopup(QUIZ[i].q);
        } else {
          titleEl.textContent = 'Bitti 💗';
          contentEl.innerHTML = `<div style="color: var(--text-soft); line-height:1.7;">Şimdi bana sarılma hakkın var 😌💗</div>`;
        }
      });
    }
  }

  startBtn.addEventListener('click', function () {
    i = 0;
    openPopup(QUIZ[i].q);
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
      music.play().catch(() => {});
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
