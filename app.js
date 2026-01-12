// ===============================
// Aurea Landing Page - app.js
// ===============================

const ORDER_URL = "https://aurea.onpay.my/order/form/aurea";

// ====== EDIT GAMBAR DI SINI ======
const productsData = [
  {
    id: "aura-jiwa",
    name: "🌸 Aura Jiwa — Wardah & Kasturi Kijang",
    tag: "Unisex • Daily / Majlis",
    desc: `Aura Jiwa ialah rangkaian wangian eksklusif yang menenangkan jiwa dan menaikkan aura keyakinan dalaman.
<b>Kasturi Kijang:</b> wangian kasturi klasik yang matang dan berkarisma.
<b>Wardah:</b> haruman lembut, bersih dan segar yang memberi rasa damai serta aura feminin.`,
    bullets: [
      "Bau lembut & menenangkan",
      "Tahan lama",
      "Membantu tingkatkan keyakinan",
      "Aura tenang & eksklusif",
      "Unisex (lelaki & wanita)"
    ],
    images: [
      "https://aurea.onpay.my/media/uploads/Aura%20Jiwa%2030ml.jpg",
      "https://aurea.onpay.my/media/uploads/Aura Jiwa 30ml.jpg?text=Aura+Jiwa+2",
      "https://via.placeholder.com/800x800.png?text=Aura+Jiwa+3"
    ]
  },
  {
    id: "gelora-her",
    name: "💗 Gelora For Her",
    tag: "Women • Best Seller",
    desc: `Wangian feminin yang lembut tetapi memikat untuk menaikkan aura kewanitaan, kelembutan dan keyakinan diri.
Haruman floral yang manis dan menenangkan, sesuai siang atau malam.`,
    bullets: [
      "Bau lembut tetapi menyerlah",
      "Tahan lama",
      "Sesuai siang & malam",
      "Best seller wanita",
      "Membantu menaikkan seri & aura feminin"
    ],
    images: [
      "https://via.placeholder.com/800x800.png?text=Gelora+Her+1",
      "https://via.placeholder.com/800x800.png?text=Gelora+Her+2"
    ]
  },
  {
    id: "gelora-him",
    name: "🖤 Gelora For Him",
    tag: "Men • Professional",
    desc: `Haruman maskulin yang matang, kemas dan berkarisma — untuk lelaki yang ingin tampil yakin, tenang dan berwibawa.
Wangian segar tetapi berkuasa untuk aura profesional.`,
    bullets: [
      "Bau maskulin & elegan",
      "Tahan lama",
      "Tingkatkan keyakinan diri",
      "Menyerlahkan aura matang & profesional"
    ],
    images: [
      "https://via.placeholder.com/800x800.png?text=Gelora+Him+1",
      "https://via.placeholder.com/800x800.png?text=Gelora+Him+2",
      "https://via.placeholder.com/800x800.png?text=Gelora+Him+3"
    ]
  },
  {
    id: "booster",
    name: "🔮 Aura Booster — Inhaler Nasal Stick",
    tag: "Peppermint • Focus",
    desc: `Inhaler beraroma peppermint yang membantu menyegarkan minda, menenangkan emosi dan meningkatkan fokus serta keyakinan diri.
Sesuai digunakan bila penat, stres, cemas atau perlukan kesegaran segera.`,
    bullets: [
      "Bau peppermint menyegarkan",
      "Tingkatkan fokus & kejelasan minda",
      "Rasa segar, tenang & stabil emosi"
    ],
    images: [
      "https://via.placeholder.com/800x800.png?text=Aura+Booster+1",
      "https://via.placeholder.com/800x800.png?text=Aura+Booster+2"
    ]
  },
  {
    id: "glow-balm",
    name: "✨ Glow Balm — Sensual Rose (Untuk Muka)",
    tag: "Face • Glow",
    desc: `Glow Balm membantu melembapkan kulit wajah dan memberikan kesan glow semula jadi supaya wajah kelihatan lebih segar, sihat dan berseri.`,
    bullets: [
      "Melembapkan kulit wajah",
      "Memberi efek glow natural",
      "Sesuai untuk semua jenis kulit",
      "Membantu menaikkan seri wajah"
    ],
    images: [
      "https://via.placeholder.com/800x800.png?text=Glow+Balm+1",
      "https://via.placeholder.com/800x800.png?text=Glow+Balm+2"
    ]
  },
  {
    id: "aura-home",
    name: "🏡 Aura Home — Home Aromatherapy",
    tag: "Home • Calm",
    desc: `Haruman ruang yang membantu mewujudkan suasana tenang, nyaman dan positif di rumah atau tempat kerja.
Sesuai untuk ruang tamu, bilik tidur, pejabat atau ruang meditasi.`,
    bullets: [
      "Haruman menyenangkan & menenangkan",
      "Kurangkan stres & ketegangan emosi",
      "Suasana positif, damai & harmoni"
    ],
    images: [
      "https://via.placeholder.com/800x800.png?text=Aura+Home+1",
      "https://via.placeholder.com/800x800.png?text=Aura+Home+2",
      "https://via.placeholder.com/800x800.png?text=Aura+Home+3"
    ]
  }
];

// ---------- DOM helpers ----------
function qs(sel, el=document){ return el.querySelector(sel); }
function qsa(sel, el=document){ return Array.from(el.querySelectorAll(sel)); }

function escapeHtml(str){
  return (str || "").replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

// ---------- Render ----------
function renderCard(p){
  const slides = (p.images || []).map((src, i) => `
    <div class="slide ${i === 0 ? "is-active" : ""}" data-i="${i}">
      <img src="${src}" alt="${escapeHtml(p.name)} image ${i+1}">
    </div>
  `).join("");

  const dots = (p.images || []).map((_, i) => `
    <button class="dot ${i === 0 ? "is-active" : ""}" data-go="${i}" aria-label="Go to image ${i+1}"></button>
  `).join("");

  const bullets = (p.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join("");

  return `
    <article class="card" id="${p.id}">
      <div class="media">
        <div class="carousel" data-carousel="${p.id}" data-index="0">
          <div class="viewport">
            ${slides}
          </div>
          <div class="controls">
            <button class="navBtn" data-prev aria-label="Previous">‹</button>
            <div class="dots">${dots}</div>
            <button class="navBtn" data-next aria-label="Next">›</button>
          </div>
        </div>
      </div>

      <div class="content">
        <h3 class="name">${escapeHtml(p.name)}</h3>
        <p class="desc">${p.desc}</p>
        <ul class="bullets">${bullets}</ul>
        <span class="tag">${escapeHtml(p.tag || "")}</span>

        <div style="margin-top:12px;">
          <a class="btnOrder" href="${ORDER_URL}" target="_blank" rel="noopener">Order Produk Ini</a>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(){
  const grid = qs("#productsGrid");
  if(!grid) return;
  grid.innerHTML = productsData.map(renderCard).join("");
}

// ---------- Carousel logic ----------
function setSlide(carouselEl, index){
  const slides = qsa(".slide", carouselEl);
  const dots = qsa(".dot", carouselEl);
  const total = slides.length;
  if(total === 0) return;

  let i = index % total;
  if(i < 0) i = total - 1;

  slides.forEach(s => s.classList.remove("is-active"));
  dots.forEach(d => d.classList.remove("is-active"));

  slides[i].classList.add("is-active");
  if(dots[i]) dots[i].classList.add("is-active");

  carouselEl.dataset.index = String(i);
}

function getIndex(carouselEl){
  const v = parseInt(carouselEl.dataset.index || "0", 10);
  return Number.isNaN(v) ? 0 : v;
}

function initCarousels(){
  qsa("[data-carousel]").forEach(carouselEl=>{
    const prevBtn = qs("[data-prev]", carouselEl);
    const nextBtn = qs("[data-next]", carouselEl);
    const dots = qsa(".dot", carouselEl);
    const viewport = qs(".viewport", carouselEl);

    if(prevBtn) prevBtn.addEventListener("click", ()=> setSlide(carouselEl, getIndex(carouselEl) - 1));
    if(nextBtn) nextBtn.addEventListener("click", ()=> setSlide(carouselEl, getIndex(carouselEl) + 1));

    dots.forEach(d=>{
      d.addEventListener("click", ()=>{
        setSlide(carouselEl, parseInt(d.dataset.go, 10));
      });
    });

    // swipe (optional)
    if(viewport){
      let startX = 0;
      viewport.addEventListener("touchstart", (e)=>{
        startX = e.touches[0].clientX;
      }, {passive:true});
      viewport.addEventListener("touchend", (e)=>{
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if(Math.abs(diff) > 35){
          if(diff < 0) setSlide(carouselEl, getIndex(carouselEl) + 1);
          else setSlide(carouselEl, getIndex(carouselEl) - 1);
        }
      }, {passive:true});
    }
  });
}

// ---------- Mobile menu ----------
function initMobileMenu(){
  const burger = qs("#burger");
  const mobileMenu = qs("#mobileMenu");
  if(!burger || !mobileMenu) return;

  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "block";
    mobileMenu.style.display = isOpen ? "none" : "block";
  });

  qsa("a", mobileMenu).forEach(a=>{
    a.addEventListener("click", ()=> mobileMenu.style.display = "none");
  });
}

// ---------- Footer year ----------
function setYear(){
  const y = qs("#year");
  if(y) y.textContent = new Date().getFullYear();
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initCarousels();
  initMobileMenu();
  setYear();
});



