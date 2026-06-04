// ===== IMAGE GALLERY =====
const thumbs = document.querySelectorAll('.pd-thumb');
const mainImg = document.getElementById('mainProductImg');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    mainImg.src = thumb.dataset.img;
  });
});

// ===== WISHLIST BUTTONS =====
const wishlistBtn = document.getElementById('wishlistBtn');
const wishActionBtn = document.getElementById('wishActionBtn');

function toggleWish(btn) {
  btn.classList.toggle('wished');
  const icon = btn.querySelector('i');
  if (btn.classList.contains('wished')) {
    icon.classList.replace('fa-regular', 'fa-solid');
  } else {
    icon.classList.replace('fa-solid', 'fa-regular');
  }
}

wishlistBtn.addEventListener('click', () => toggleWish(wishlistBtn));
wishActionBtn.addEventListener('click', () => toggleWish(wishActionBtn));

// ===== COLOR SELECTOR =====
const colorBtns = document.querySelectorAll('.pd-color');
const selectedColorEl = document.getElementById('selectedColor');

colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    colorBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedColorEl.textContent = btn.dataset.color;
  });
});

// ===== SIZE DROPDOWN =====
const sizeSelect = document.getElementById('sizeSelect');
const sizeDisplay = document.getElementById('sizeDisplay');
const sizeOptions = document.getElementById('sizeOptions');
const selectedSizeEl = document.getElementById('selectedSize');
const sizeItems = sizeOptions.querySelectorAll('li');

sizeDisplay.addEventListener('click', (e) => {
  e.stopPropagation();
  sizeSelect.classList.toggle('open');
});

sizeItems.forEach(item => {
  item.addEventListener('click', () => {
    sizeItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const val = item.dataset.value;
    sizeDisplay.querySelector('span').textContent = val;
    selectedSizeEl.textContent = val;
    sizeSelect.classList.remove('open');
  });
});

document.addEventListener('click', () => {
  sizeSelect.classList.remove('open');
});

// ===== QUANTITY =====
const qtyInput = document.getElementById('qtyInput');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');

qtyMinus.addEventListener('click', () => {
  let val = parseInt(qtyInput.value);
  if (val > 1) qtyInput.value = val - 1;
});

qtyPlus.addEventListener('click', () => {
  let val = parseInt(qtyInput.value);
  if (val < 99) qtyInput.value = val + 1;
});

qtyInput.addEventListener('change', () => {
  let val = parseInt(qtyInput.value);
  if (isNaN(val) || val < 1) qtyInput.value = 1;
  if (val > 99) qtyInput.value = 99;
});

// ===== ADD TO CART =====
const cartBadge = document.getElementById('cartBadge');
const cartToast = document.getElementById('cartToast');
let cartCount = 0;

function showToast() {
  cartToast.classList.add('show');
  setTimeout(() => cartToast.classList.remove('show'), 2500);
}

document.getElementById('addToCartBtn').addEventListener('click', () => {
  cartCount += parseInt(qtyInput.value);
  cartBadge.textContent = cartCount;
  cartBadge.classList.add('show');
  showToast();

  const btn = document.getElementById('addToCartBtn');
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
  btn.style.background = '#22c55e';
  btn.style.color = 'white';
  btn.style.borderColor = '#22c55e';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to cart';
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 1500);
});

document.getElementById('buyNowBtn').addEventListener('click', () => {
  cartCount += parseInt(qtyInput.value);
  cartBadge.textContent = cartCount;
  cartBadge.classList.add('show');
  showToast();
});

// ===== TABS =====
const tabs = document.querySelectorAll('.pd-tab');
const tabContents = document.querySelectorAll('.pd-tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ===== RELATED WISHLIST =====
document.querySelectorAll('.rel-wish').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('wished');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('wished')) {
      icon.classList.replace('fa-regular', 'fa-solid');
      icon.style.color = '#FF6B6B';
    } else {
      icon.classList.replace('fa-solid', 'fa-regular');
      icon.style.color = '';
    }
  });
});

// ===== JS SEARCH BAR =====
// ===== JS SEARCH BAR =====
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchBtn = document.getElementById('searchBtn');

const searchData = [
  'Smart Watch Series 6', 'Smart Watch Pro Max', 'Laptop Pro 14-inch',
  'Wireless Headphones', 'DSLR Camera 4K', 'Bluetooth Speaker',
  'Tablet 10" HD', 'Mechanical Keyboard', 'Smartphone X200',
  'Gaming Mouse', 'True Wireless Earbuds', 'WiFi Router Pro',
  'USB-C Hub', 'Portable SSD', '4K Monitor',
];

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  searchSuggestions.innerHTML = '';

  if (query.length < 1) {
    searchSuggestions.classList.remove('show');
    return;
  }

  const matches = searchData.filter(item => item.toLowerCase().includes(query));

  if (matches.length === 0) {
    searchSuggestions.classList.remove('show');
    return;
  }

  matches.slice(0, 6).forEach(match => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    const regex = new RegExp(`(${query})`, 'gi');
    const highlighted = match.replace(regex, '<strong style="color:#0D6EFD">$1</strong>');
    div.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> ${highlighted}`;
    div.addEventListener('mousedown', (e) => {
      e.preventDefault();
      searchInput.value = match;
      searchSuggestions.classList.remove('show');
    });
    searchSuggestions.appendChild(div);
  });

  searchSuggestions.classList.add('show');
});

searchInput.addEventListener('blur', () => {
  setTimeout(() => searchSuggestions.classList.remove('show'), 200);
});

searchInput.addEventListener('focus', () => {
  if (searchInput.value.trim().length > 0) {
    searchInput.dispatchEvent(new Event('input'));
  }
});

searchBtn.addEventListener('click', () => {
  searchSuggestions.classList.remove('show');
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchSuggestions.classList.remove('show');
});// ===== CATEGORY DROPDOWN =====
const allCategoryBtn = document.getElementById('allCategoryBtn');
const categories = ['Automobiles', 'Clothes and wear', 'Home interiors', 
  'Computer and tech', 'Tools, equipments', 'Sports and outdoor', 
  'Animal and pets', 'Machinery tools'];

allCategoryBtn.addEventListener('click', () => {
  let existing = document.getElementById('categoryDropdown');
  if (existing) {
    existing.remove();
    return;
  }
  const dropdown = document.createElement('div');
  dropdown.id = 'categoryDropdown';
  dropdown.style.cssText = `
    position: absolute;
    top: 48px;
    left: 0;
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.10);
    z-index: 999;
    min-width: 200px;
    overflow: hidden;
  `;
  categories.forEach(cat => {
    const item = document.createElement('div');
    item.textContent = cat;
    item.style.cssText = `
      padding: 10px 16px;
      font-size: 13px;
      color: #505050;
      cursor: pointer;
      transition: background 0.15s;
    `;
    item.addEventListener('mouseover', () => item.style.background = '#F0F5FF');
    item.addEventListener('mouseout', () => item.style.background = 'white');
    item.addEventListener('click', () => dropdown.remove());
    dropdown.appendChild(item);
  });

  document.querySelector('.navbar').style.position = 'relative';
  document.querySelector('.navbar').appendChild(dropdown);
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.all-category')) {
    const dd = document.getElementById('categoryDropdown');
    if (dd) dd.remove();
  }
});