// ===== VIEW TOGGLE (Grid / List) =====
const gridBtn = document.getElementById('gridViewBtn');
const listBtn = document.getElementById('listViewBtn');
const grid = document.getElementById('productGrid');

gridBtn.addEventListener('click', () => {
  grid.classList.remove('list-view');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  grid.classList.add('list-view');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

// ===== WISHLIST TOGGLE =====
document.querySelectorAll('.pl-wish').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('wished');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('wished')) {
      icon.classList.replace('fa-regular', 'fa-solid');
    } else {
      icon.classList.replace('fa-solid', 'fa-regular');
    }
  });
});

// ===== PAGINATION =====
const pageNums = document.querySelectorAll('.page-num');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPage = 1;
const totalPages = 12;

function setPage(page) {
  currentPage = page;
  pageNums.forEach(btn => btn.classList.remove('active'));
  pageNums.forEach(btn => {
    if (parseInt(btn.textContent) === page) {
      btn.classList.add('active');
    }
  });
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

pageNums.forEach(btn => {
  if (!isNaN(parseInt(btn.textContent))) {
    btn.addEventListener('click', () => setPage(parseInt(btn.textContent)));
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) setPage(currentPage - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) setPage(currentPage + 1);
});

// ===== LOAD MORE =====
const loadMoreBtn = document.getElementById('loadMoreBtn');
const extraProducts = [
  { name: 'USB-C Hub 7-in-1', category: 'Accessories', price: '$45.00', rating: 4, reviews: 93, badge: '' },
  { name: 'Portable SSD 1TB', category: 'Storage', price: '$89.00', oldPrice: '$110.00', rating: 5, reviews: 177, badge: 'sale' },
  { name: 'Webcam 4K HD', category: 'Peripherals', price: '$129.00', rating: 4, reviews: 55, badge: 'new' },
  { name: 'Power Bank 20000mAh', category: 'Accessories', price: '$38.00', rating: 4, reviews: 214, badge: '' },
];

function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += i <= rating
      ? '<i class="fa-solid fa-star"></i>'
      : '<i class="fa-regular fa-star"></i>';
  }
  return html;
}

loadMoreBtn.addEventListener('click', () => {
  loadMoreBtn.innerHTML = '<span class="spinner" style="display:inline-block"></span> Loading...';
  loadMoreBtn.disabled = true;

  setTimeout(() => {
    extraProducts.forEach(p => {
      const card = document.createElement('div');
      card.className = 'pl-card';
      const badgeHTML = p.badge === 'new'
        ? '<span class="pl-badge badge-new">NEW</span>'
        : p.badge === 'sale'
        ? '<span class="pl-badge badge-sale">SALE</span>'
        : '';
      const oldPriceHTML = p.oldPrice ? `<span class="pl-old">${p.oldPrice}</span>` : '';

      card.innerHTML = `
        <div class="pl-img-wrap">
          <img src="https://placehold.co/220x170/f3f4f6/374151?text=${encodeURIComponent(p.name)}" alt="${p.name}" />
          <button class="pl-wish"><i class="fa-regular fa-heart"></i></button>
          ${badgeHTML}
        </div>
        <div class="pl-info">
          <p class="pl-category">${p.category}</p>
          <p class="pl-name">${p.name}</p>
          <div class="pl-stars">${renderStars(p.rating)}<span>(${p.reviews})</span></div>
          <div class="pl-bottom">
            <div class="pl-prices">
              <span class="pl-price">${p.price}</span>
              ${oldPriceHTML}
            </div>
            <button class="pl-buy-btn">Buy Now</button>
          </div>
        </div>
      `;

      card.querySelector('.pl-wish').addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        btn.classList.toggle('wished');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('wished')) {
          icon.classList.replace('fa-regular', 'fa-solid');
        } else {
          icon.classList.replace('fa-solid', 'fa-regular');
        }
      });

      grid.appendChild(card);
    });

    const countEl = document.getElementById('resultCount');
    countEl.textContent = parseInt(countEl.textContent) + extraProducts.length;

    loadMoreBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Load more products';
    loadMoreBtn.disabled = false;

    if (grid.children.length >= 32) {
      loadMoreBtn.textContent = 'All products loaded';
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = '0.5';
      loadMoreBtn.style.cursor = 'default';
    }
  }, 800);
});

// ===== SORT =====
document.getElementById('sortSelect').addEventListener('change', (e) => {
  const cards = [...grid.querySelectorAll('.pl-card')];
  const val = e.target.value;

  const getPrice = (card) => {
    const t = card.querySelector('.pl-price').textContent.replace(/[$,]/g, '');
    return parseFloat(t);
  };
  const getRating = (card) => card.querySelectorAll('.fa-solid.fa-star').length;

  let sorted;
  if (val === 'Price: Low to High') {
    sorted = cards.sort((a, b) => getPrice(a) - getPrice(b));
  } else if (val === 'Price: High to Low') {
    sorted = cards.sort((a, b) => getPrice(b) - getPrice(a));
  } else if (val === 'Best Rating') {
    sorted = cards.sort((a, b) => getRating(b) - getRating(a));
  } else {
    sorted = cards;
  }

  sorted.forEach(card => grid.appendChild(card));
});
// ===== FILTERS =====
// Category filter
document.querySelectorAll('input[name="category"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const selected = radio.parentElement.textContent.trim();
    document.getElementById('resultCount').textContent = 
      selected === 'All' ? '12' : Math.floor(Math.random() * 8) + 4;
  });
});

// Clear all filters
document.querySelector('.clear-btn').addEventListener('click', () => {
  document.querySelectorAll('input[name="category"]')[0].checked = true;
  document.querySelectorAll('input[name="rating"]')[2].checked = true;
  document.querySelectorAll('input[type="checkbox"]').forEach((cb, i) => {
    cb.checked = i === 0;
  });
  document.querySelectorAll('.price-input').forEach(input => input.value = '');
  document.getElementById('resultCount').textContent = '12';
});