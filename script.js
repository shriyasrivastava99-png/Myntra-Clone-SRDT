/* STYLE AVENUE — beginner-friendly JavaScript interactions */
// Variables and data types
const storeName = 'Style Avenue';
let activeFilter = 'all';
let cart = [];
let wishlist = [];
const products = [
    { id: 1, name: 'Relaxed Fit Shirt', category: 'men', type: 'Menswear', price: 1299, tag: 'BESTSELLER', description: 'An easy layer for everyday plans.', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80' },
    { id: 2, name: 'Classic Everyday Tee', category: 'men', type: 'Menswear', price: 699, tag: 'EVERYDAY', description: 'A comfortable wardrobe essential.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80' },
    { id: 3, name: 'Modern Day Dress', category: 'women', type: 'Womenswear', price: 1599, tag: 'NEW', description: 'An effortless look for your day out.', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4f?auto=format&fit=crop&w=700&q=80' },
    { id: 4, name: 'Soft Knit Top', category: 'women', type: 'Womenswear', price: 999, tag: 'POPULAR', description: 'A versatile piece to style your way.', image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=80' },
    { id: 5, name: 'Mini Weekend Set', category: 'kids', type: 'Kidswear', price: 899, tag: 'COMFY PICK', description: 'Made for play, comfort and movement.', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80' },
    { id: 6, name: 'Daily Care Kit', category: 'beauty', type: 'Beauty', price: 749, tag: 'SELF-CARE', description: 'Simple essentials for your routine.', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80' },
    { id: 7, name: 'Weekend Street Look', category: 'men', type: 'Menswear', price: 1899, tag: 'STYLE PICK', description: 'Relaxed styling with a modern feel.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80' },
    { id: 8, name: 'Glow Essentials', category: 'beauty', type: 'Beauty', price: 599, tag: 'FAVOURITE', description: 'Little favourites for your beauty shelf.', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80' },
    { id: 9, name: 'Printed Kids Outfit', category: 'kids', type: 'Kidswear', price: 1099, tag: 'NEW', description: 'A playful pick for special little days.', image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=700&q=80' },
    { id: 10, name: 'Statement Occasion Look', category: 'women', type: 'Womenswear', price: 2199, tag: 'TRENDING', description: 'A standout outfit for memorable plans.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80' }
];

// Function without a parameter
function showWelcome() { console.log('Welcome to ' + storeName + '!'); }
// Function with a parameter
function formatPrice(amount) { return '₹' + amount.toLocaleString('en-IN'); }
// Function using another function as a parameter (callback)
function runAfterRender(callback) { callback(); }
// Arrow function
const getProductById = (id) => products.find((item) => item.id === Number(id));

// Switch statement: readable category names
function categoryName(category) {
    switch (category) {
        case 'men': return 'Men';
        case 'women': return 'Women';
        case 'kids': return 'Kids';
        case 'beauty': return 'Beauty';
        default: return 'Featured';
    }
}

// Render product cards. for...of loops through the filtered array.
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    const page = document.body.dataset.page;
    const searchBox = document.getElementById('productSearch');
    const searchText = searchBox ? searchBox.value.toLowerCase().trim() : '';
    let visibleProducts = products.filter((item) => {
        const pageMatch = page === 'home' ? true : item.category === page;
        const filterMatch = activeFilter === 'all' || item.category === activeFilter;
        const searchMatch = (item.name + ' ' + item.type + ' ' + item.description).toLowerCase().includes(searchText);
        return pageMatch && filterMatch && searchMatch;
    });
    // Array method map creates a list of product names for a small page label.
    const visibleNames = visibleProducts.map((item) => item.name);
    console.log('Showing:', visibleNames);
    let cards = '';
    for (const item of visibleProducts) {
        const saved = wishlist.includes(item.id);
        cards += `<div class="col-6 col-md-4 col-lg-3"><article class="product-card"><div class="product-image-wrap"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="product-tag">${item.tag}</span><button class="wishlist-button ${saved ? 'active' : ''}" data-wish="${item.id}" aria-label="Save ${item.name}"><i class="fa-${saved ? 'solid' : 'regular'} fa-heart"></i></button></div><div class="product-info"><p class="product-category">${categoryName(item.category)}</p><h3>${item.name}</h3><p class="product-description">${item.description}</p><div class="product-bottom"><span class="product-price">${formatPrice(item.price)}</span><button class="add-button" data-add="${item.id}">ADD +</button></div></div></article></div>`;
    }
    grid.innerHTML = cards;
    const emptyMessage = document.getElementById('noResults');
    if (emptyMessage) emptyMessage.style.display = visibleProducts.length === 0 ? 'block' : 'none';
    const count = document.getElementById('resultCount');
    if (count) count.textContent = visibleProducts.length + ' styles';
}

// Event delegation: one listener handles buttons created by JavaScript.
const productGrid = document.getElementById('productGrid');
if (productGrid) {
    productGrid.addEventListener('click', function (event) {
        const addButton = event.target.closest('[data-add]');
        const wishButton = event.target.closest('[data-wish]');
        if (addButton) addToCart(addButton.dataset.add);
        if (wishButton) toggleWishlist(wishButton.dataset.wish);
    });
}

function addToCart(productId) {
    const selectedProduct = getProductById(productId);
    if (!selectedProduct) return;
    cart.push(selectedProduct);
    updateCart();
    showToast(selectedProduct.name + ' added to your bag');
}
function toggleWishlist(productId) {
    const id = Number(productId);
    if (wishlist.includes(id)) wishlist = wishlist.filter((savedId) => savedId !== id);
    else wishlist.push(id);
    renderProducts();
}
function updateCart() {
    const count = document.getElementById('cartCount');
    const itemsArea = document.getElementById('cartItems');
    const totalArea = document.getElementById('cartTotal');
    if (count) count.textContent = cart.length;
    if (itemsArea) {
        if (cart.length === 0) itemsArea.innerHTML = '<p class="empty-cart">Your bag is waiting for something lovely.</p>';
        else {
            let rows = '';
            // for...in reads the properties of a cart item object.
            for (const key in cart[0]) { if (key === 'name') console.log('First bag item:', cart[0][key]); }
            for (const item of cart) rows += `<div class="cart-row"><span>${item.name}</span><strong>${formatPrice(item.price)}</strong></div>`;
            itemsArea.innerHTML = rows;
        }
    }
    // reduce calculates the subtotal from the cart array.
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (totalArea) totalArea.textContent = formatPrice(total);
}
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    // A short do...while example: builds a tiny decorative divider for the console.
    let stars = ''; let counter = 0;
    do { stars += '•'; counter++; } while (counter < 3);
    console.log(stars + ' ' + message);
    window.setTimeout(() => toast.classList.remove('show'), 2200);
}

// Search and category filters
const searchInput = document.getElementById('productSearch');
if (searchInput) searchInput.addEventListener('input', renderProducts);
document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', function () {
        activeFilter = this.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach((chip) => chip.classList.remove('active'));
        this.classList.add('active');
        renderProducts();
    });
});

// Cart panel controls
const cartPanel = document.getElementById('cartPanel');
const cartButton = document.getElementById('cartButton');
const closeCart = document.getElementById('closeCart');
if (cartButton && cartPanel) cartButton.addEventListener('click', () => cartPanel.classList.add('open'));
if (closeCart && cartPanel) closeCart.addEventListener('click', () => cartPanel.classList.remove('open'));

// Theme button uses a conditional statement.
const themeButton = document.getElementById('themeButton');
if (themeButton) {
    themeButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeButton.innerHTML = isDark ? '<i class="fa-regular fa-sun"></i><span>Theme</span>' : '<i class="fa-regular fa-moon"></i><span>Theme</span>';
    });
}

// Newsletter form validation: prevent a page reload and show a simple message.
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('formMessage');
        if (email.includes('@') && email.includes('.')) message.textContent = 'Thank you! You are on the style list.';
        else message.textContent = 'Please enter a valid email address.';
        newsletterForm.reset();
    });
}

// forEach and an array method are used to keep the project code readable.
runAfterRender(() => { showWelcome(); renderProducts(); updateCart(); });
