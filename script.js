// Product data
const products = [
    { id: 1, title: "Premium Wireless Headphones", owner: "TechGear Inc.", price: 24999, image: "https://5.imimg.com/data5/SELLER/Default/2022/5/GL/PT/GK/21711192/urbanista-miami-premium-wireless-headphones-anc-with-mic-upto-50-hours-playtime-ruby-red.jpg" },
    { id: 2, title: "Organic Cotton T-Shirt", owner: "EcoWear", price: 7999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3NPRCq3Ev0wtIsMGLmI6-2fcDJ8OcO6wjFg&s" },
    { id: 3, title: "Smart LED Desk Lamp", owner: "SmartHome Tech", price: 8999, image: "https://xcessorieshub.com/wp-content/uploads/2021/12/mi-led-desk-lamp.jpg" },
    { id: 4, title: "Professional Camera Kit", owner: "PhotoPro", price: 39999, image: "https://www.mefoto.com/wp-content/uploads/2025/03/Camera-equipment-1024x684.jpg" },
    { id: 5, title: "Luxury Skincare Set", owner: "Glo Beauty", price: 12999, image: "https://image.made-in-china.com/2f0j00ieskyuFIyZcP/24K-Gold-Luxury-Skin-Care-Set-Facial-Skin-Care-Kit-for-All-Skin-Types.jpg" },
    { id: 6, title: "Fitness Tracker Watch", owner: "ActiveLife", price: 12999, image: "https://hips.hearstapps.com/hmg-prod/images/best-fitness-trackers-watches-women-655defb666097.png?crop=0.329xw:0.657xh;0.00641xw,0.176xh&resize=640:*" },
    { id: 7, title: "Handmade Ceramic Dinnerware Set", owner: "Artisan Home", price: 14999, image: "https://m.media-amazon.com/images/I/716ncF3r9ML._UF894,1000_QL80_.jpg" },
    { id: 8, title: "Designer Leather Handbag", owner: "Luxe Fashion", price: 29999, image: "https://image.made-in-china.com/202f0j00lpubwDQEOWqV/New-Arrival-Designer-Women-s-Bags-Fashion-Leather-Handbags-Shoulder-Bag-Ladies-Handbags.webp" },
    { id: 9, title: "Gaming Laptop Pro", owner: "TechGear Inc.", price: 59999, image: "https://sm.ign.com/t/ign_pk/deal/t/the-powerf/the-powerful-lenovo-legion-pro-7i-16-rtx-4090-gaming-laptop_vp2t.1280.jpg" },
    { id: 10, title: "Professional Hair Dryer", owner: "Glo Beauty", price: 8999, image: "https://bremod.net/wp-content/uploads/2024/06/Bremod-Hair-Dryer002.jpg" }
];

// DOM elements
const productsContainer = document.getElementById('products');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const priceFilter = document.getElementById('price-filter');
const priceValue = document.getElementById('price-value');
const applyFiltersBtn = document.getElementById('apply-filters');
const loadingIndicator = document.querySelector('.loading');

// State variables
let currentPage = 1;
const itemsPerPage = 3;
let filteredProducts = [...products];

// Initialize the product display
displayProducts();

// Event listeners
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage * itemsPerPage < filteredProducts.length) {
        currentPage++;
        displayProducts();
    }
});

priceFilter.addEventListener('input', () => {
    priceValue.textContent = `₨${priceFilter.value}`;
});

applyFiltersBtn.addEventListener('click', applyFilters);

// Functions
function displayProducts() {
    productsContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products match your criteria.</p>';
    } else {
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image" />
                <div class="product-details">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-owner">By ${product.owner}</p>
                    <p class="product-price">₨${product.price.toFixed(2)}</p>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    updateNavigationButtons();
}

function updateNavigationButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * itemsPerPage >= filteredProducts.length;
}

function applyFilters() {
    showLoading(true);

    setTimeout(() => {
        const maxPrice = parseInt(priceFilter.value);

        filteredProducts = products.filter(product => product.price <= maxPrice);

        currentPage = 1;
        displayProducts();
        showLoading(false);
    }, 800);
}

function showLoading(show) {
    if (show) {
        loadingIndicator.style.display = 'block';
        productsContainer.style.opacity = '0.5';
    } else {
        loadingIndicator.style.display = 'none';
        productsContainer.style.opacity = '1';
    }
}
