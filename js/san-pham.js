const money = (value) => `${new Intl.NumberFormat("vi-VN").format(value)}đ`;
const qs = (selector) => document.querySelector(selector);
const data = window.storeData;

function header(active) {
  return `
    <header class="site-header">
      <div class="container navbar">
        <a class="brand" href="danh-sach-san-pham.html" aria-label="GreenFood">
          <span class="brand-mark">◎</span><span>GreenFood</span>
        </a>
        <nav class="nav-links" aria-label="Điều hướng chính">
          <a class="${active === "vegetable" ? "active" : ""}" href="danh-sach-san-pham.html#vegetable">Rau Củ</a>
          <a href="danh-sach-san-pham.html#fruit">Trái Cây</a>
          <a href="danh-sach-san-pham.html#fresh">Thực Phẩm</a>
          <a href="danh-sach-san-pham.html#drink">Đồ Uống</a>
          <a class="sale-link" href="danh-sach-san-pham.html#sale">Khuyến Mãi</a>
        </nav>
        <div class="nav-actions">
          <label class="search-box"><span>⌕</span><input placeholder="Tìm kiếm thực phẩm tươi sống..." /></label>
          <button class="account-btn">♙ Tài khoản</button>
          <button class="cart-btn" aria-label="Giỏ hàng">🛒<span>3</span></button>
        </div>
      </div>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand footer-brand" href="danh-sach-san-pham.html"><span class="brand-mark">◎</span><span>Green Food</span></a>
          <p>Mang trải nghiệm chợ nông sản đến tận cửa nhà bạn. Thuần khiết, hữu cơ và luôn tươi mới.</p>
          <div class="socials"><span>☮</span><span>◉</span></div>
        </div>
        <div><h3>Liên Kết Nhanh</h3><a>Trang Trại</a><a>Lịch Mùa Vụ</a><a>Gói Đăng Ký</a></div>
        <div><h3>Hỗ Trợ</h3><a>Chính Sách Giao Hàng</a><a>Điều Khoản Dịch Vụ</a><a>Chính Sách Bảo Mật</a><a>Câu Hỏi Thường Gặp</a></div>
        <div><h3>Bản Tin</h3><p>Nhận công thức và ưu đãi qua email của bạn.</p><label class="newsletter"><input placeholder="your@email.com"><button>Đăng Ký</button></label></div>
      </div>
      <div class="container copyright">© 2024 Fresh Market. Bảo lưu mọi quyền. Nguồn gốc địa phương, tầm nhìn toàn cầu.</div>
    </footer>`;
}

function productCard(p) {
  return `
    <article class="product-card">
      <a class="product-image" href="chi-tiet-san-pham.html?id=${p.id}" style="background-image:url('${p.image}')">
        <button class="wish-btn" aria-label="Yêu thích">♡</button>
        ${p.badge ? `<span class="discount">${p.badge}</span>` : ""}
      </a>
      <div class="product-body">
        <span class="product-tag">${p.tag}</span>
        <h3><a href="chi-tiet-san-pham.html?id=${p.id}">${p.name}</a></h3>
        <div class="product-meta"><span>${p.unit}</span><span>${p.origin}</span></div>
        <div class="price-row"><div class="price">${money(p.price)}</div><button class="add-btn">Thêm</button></div>
      </div>
    </article>`;
}

function sectionBlock(section) {
  const products = data.products.filter((p) => p.category === section.id).slice(0, 3);
  return `
    <section id="${section.id}" class="product-section">
      <div class="section-heading"><h2>${section.title}</h2><span>${section.count} sản phẩm</span></div>
      <button class="slide-btn slide-prev">‹</button>
      <div class="product-grid">${products.map(productCard).join("")}</div>
      <button class="slide-btn slide-next">›</button>
    </section>`;
}

function renderList() {
  const app = qs("#app");
  if (!app) return;
  app.innerHTML = `${header("vegetable")}
    <main>
      <section class="container hero">
        <div class="hero-card">
          <div>
            <span class="eyebrow">Sống xanh hôm nay</span>
            <h1>Sản phẩm tươi sạch cho bữa ăn mỗi ngày</h1>
            <p class="lead">Danh sách rau củ, trái cây, thực phẩm tươi và đồ uống lành mạnh được phân loại rõ ràng, giúp khách hàng dễ dàng lựa chọn nhanh chóng theo nhu cầu.</p>
          </div>
          <div class="hero-visual" style="background-image:url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=90')">
            <div class="floating-card"><strong>128+</strong><span>sản phẩm đang bán</span></div>
          </div>
        </div>
      </section>
      <section class="container shop-layout">
        <aside class="panel">
          <h2>Phân loại</h2>
          <div class="category-list">${data.categories.map((c, i) => `<button class="category-btn ${i === 0 ? "active" : ""}" data-category="${c.id}"><span>${c.name}</span><b>${c.count}</b></button>`).join("")}</div>
          <div class="filter-title">Lọc theo</div>
          <div class="filter-list"><label><input type="checkbox" checked> Đang khuyến mãi</label><label><input type="checkbox"> Hữu cơ</label><label><input type="checkbox"> Giao nhanh trong 2 giờ</label><label><input type="checkbox"> Hàng mới</label></div>
        </aside>
        <div class="shop-content">
          <div class="quick-tabs"><button class="active">Tất cả</button><button>Bán chạy</button><button>Mới về</button><button>Hữu cơ</button><button>Giảm giá</button><span>Sắp xếp: <b>Mới nhất</b></span></div>
          ${data.sections.map(sectionBlock).join("")}
          <div class="promo-strip"><div><h2>Combo rau củ tuần này</h2><p>Tiết kiệm đến 25% với combo rau củ mới tuần này</p></div><a class="promo-btn" href="#vegetable">Xem ngay</a></div>
        </div>
      </section>
    </main>${footer()}`;
}

function renderDetail() {
  const app = qs("#detail-app");
  if (!app) return;
  const id = new URLSearchParams(location.search).get("id") || "green-mix";
  const p = data.products.find((item) => item.id === id) || data.products[0];
  const gallery = p.gallery || [p.image];
  const related = data.products.filter((item) => item.id !== p.id && item.category === p.category).slice(0, 3);
  app.innerHTML = `${header("vegetable")}
    <main>
      <section class="container detail-wrap">
        <div class="breadcrumb"><a href="danh-sach-san-pham.html">Cửa hàng</a> / ${p.tag} / <b>${p.name}</b></div>
        <div class="detail-hero">
          <div class="gallery"><div class="thumbs">${gallery.map((img, i) => `<button class="thumb ${i === 0 ? "active" : ""}" data-img="${img}" style="background-image:url('${img}')"></button>`).join("")}</div><div class="main-img" id="main-img" style="background-image:url('${gallery[0]}')"></div></div>
          <div class="product-info"><span class="eyebrow">${p.tag}</span><span class="status">${p.stock || "Sẵn sàng"}</span><h1>${p.name}</h1><p class="lead">${p.desc || "Sản phẩm tươi được sơ chế, đóng gói và kiểm tra chất lượng trước khi giao."}</p><div class="detail-price"><div class="price">${money(p.price)}</div><span>/${p.unit}</span>${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ""}</div><div class="metrics">${(p.metrics || [["Xuất xứ", p.origin], ["Đơn vị", p.unit], ["Trạng thái", "Còn hàng"]]).map((m) => `<div class="metric"><small>${m[0]}</small><strong>${m[1]}</strong></div>`).join("")}</div><div class="actions"><button class="account-btn big">Thêm vào giỏ hàng</button><button class="secondary-btn">Mua ngay</button></div></div>
        </div>
      </section>
      <section class="container content-sections"><div class="info-card"><h2>Thông tin đóng gói</h2><p class="lead">Dữ liệu sản phẩm hiện được đọc từ mock store. Khi có backend, lớp service chỉ cần thay nguồn data bằng API mà không phải sửa layout.</p><div class="facts">${(p.facts || ["Đóng gói trong ngày", "Kiểm tra chất lượng", "Hóa đơn rõ ràng", "Hỗ trợ đổi trả 24h"]).map((f) => `<div class="fact">${f}</div>`).join("")}</div><h2 class="related-title">Sản phẩm liên quan</h2><div class="product-grid related-grid">${related.map(productCard).join("")}</div></div><aside class="checkout-card"><h2>Tóm tắt mua nhanh</h2><p>Tạm tính cho 1 ${p.unit}</p><div class="price-row"><strong>Tổng tiền</strong><div class="price">${money(p.price)}</div></div><button class="add-btn checkout-btn">Tiến hành thanh toán</button></aside></section>
    </main>${footer()}`;
  document.querySelectorAll("[data-img]").forEach((btn) => btn.addEventListener("click", () => {
    qs("#main-img").style.backgroundImage = `url('${btn.dataset.img}')`;
    document.querySelectorAll("[data-img]").forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");
  }));
}

renderList();
renderDetail();
