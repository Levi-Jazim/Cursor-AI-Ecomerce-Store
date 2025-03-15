// Sample product data with Pexels images
const products = [
    {
        id: 1,
        name: "Classic Watch",
        price: 129.99,
        image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 89.99,
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
    },
    {
        id: 3,
        name: "Smartphone",
        price: 699.99,
        image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg"
    },
    {
        id: 4,
        name: "Digital Camera",
        price: 449.99,
        image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"
    },
    {
        id: 5,
        name: "Laptop",
        price: 999.99,
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg"
    },
    {
        id: 6,
        name: "Wireless Speaker",
        price: 79.99,
        image: "https://images.pexels.com/photos/157557/pexels-photo-157557.jpeg"
    },
    {
        id: 7,
        name: "Gaming Controller",
        price: 59.99,
        image: "https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg"
    },
    {
        id: 8,
        name: "Smart Watch",
        price: 199.99,
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"
    }
];

let cart = [];

// Display products
function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    updateCartModal();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart modal
function updateCartModal() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Toggle cart modal
document.querySelector('.cart').addEventListener('click', () => {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
});

// Close cart modal when clicking outside
document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('cartModal')) {
        document.getElementById('cartModal').style.display = 'none';
    }
});

// Initialize the store
displayProducts(); 