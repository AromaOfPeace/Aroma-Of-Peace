// Product data - only keeping the special pack
// Product data - only keeping the special pack
const products = {
  pack: {
    id: 'special-pack',
    name: "Special Pack",
    price: 50,
    image: "pack-image.png"
  }
};

// Cart functionality
let cart = JSON.parse(localStorage.getItem('aromaOfPeaceCart')) || [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Initialize cart
  updateCartCount();
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize elements that need to be visible on load
  const heroContent = document.querySelector('.hero-content');
  heroContent.classList.add('animate');
  
  
  // Cart modal functions
  window.openCartModal = function() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.add('active');
    renderCartItems();
    document.body.style.overflow = 'hidden';
  };
  
  window.closeCartModal = function() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
  };
});

function initAnimations() {
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.section-header, .product-category, .pack-details');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
      }
    });
  };
  
  // Run once on load and then on scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Animate section headers
  gsap.to(".section-header", {
    duration: 1,
    y: 0,
    opacity: 1,
    delay: 0.3,
    ease: "power3.out"
  });
  
  // Animate product categories
  gsap.to(".product-category", {
    duration: 0.8,
    y: 0,
    opacity: 1,
    stagger: 0.2,
    delay: 0.5,
    ease: "back.out(1.7)"
  });
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function setupEventListeners() {
  // Add pack to cart - only set up one event listener
  const addPackBtn = document.getElementById('add-pack-to-cart');
  if (addPackBtn) {
    addPackBtn.addEventListener('click', function() {
      // Check if the pack is already in cart
      const existingItemIndex = cart.findIndex(item => item.id === products.pack.id);
      
      if (existingItemIndex >= 0) {
        // If already in cart, increase quantity
        cart[existingItemIndex].quantity += 1;
      } else {
        // If not in cart, add it
        cart.push({
          ...products.pack,
          quantity: 1
        });
      }
      
      updateCartCount();
      showNotification(`${products.pack.name} added to cart!`);
      
      // Pulse cart button
      gsap.to("#add-pack-to-cart", {
        scale: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
      
      // Trigger confetti
      createConfetti();
      
      // Save to localStorage
      localStorage.setItem('aromaOfPeaceCart', JSON.stringify(cart));
    });
  }
  
  // Close notification
  document.getElementById('close-notification').addEventListener('click', hideNotification);
  
  // Remove all other add-to-cart event listeners
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.removeEventListener('click', addToCart);
    button.style.display = 'none'; // Hide other add-to-cart buttons
  });
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.cart-count').textContent = count;
  localStorage.setItem('aromaOfPeaceCart', JSON.stringify(cart));
}

// Disable generic addToCart function
function addToCart() {
  // This function is now disabled
  showNotification("Only the Special Pack can be added to cart");
  return false;
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    document.getElementById('cart-total').textContent = '0.00 DT';
    return;
  }
  
  let subtotal = 0;
  
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price} DT</div>
      </div>
      <div class="cart-item-controls">
        <button class="decrease-item" data-id="${item.id}">-</button>
        <span class="item-quantity">${item.quantity}</span>
        <button class="increase-item" data-id="${item.id}">+</button>
        <button class="remove-item" data-id="${item.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);
    subtotal += item.price * item.quantity;
  });
  
  // Add event listeners to control buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.getAttribute('data-id');
      removeFromCart(itemId);
    });
  });
  
  document.querySelectorAll('.increase-item').forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.getAttribute('data-id');
      modifyCartItemQuantity(itemId, 1);
    });
  });
  
  document.querySelectorAll('.decrease-item').forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.getAttribute('data-id');
      modifyCartItemQuantity(itemId, -1);
    });
  });
  
  const total = subtotal + 8; // Add delivery fee
  document.getElementById('cart-total').textContent = `${total.toFixed(2)} DT`;
}

function modifyCartItemQuantity(itemId, change) {
  const itemIndex = cart.findIndex(item => item.id === itemId);
  
  if (itemIndex >= 0) {
    cart[itemIndex].quantity += change;
    
    // Remove if quantity reaches 0
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    
    // Update UI and storage
    updateCartCount();
    renderCartItems();
    localStorage.setItem('aromaOfPeaceCart', JSON.stringify(cart));
  }
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartCount();
  renderCartItems();
  localStorage.setItem('aromaOfPeaceCart', JSON.stringify(cart));
  showNotification('Item removed from cart');
}

function showNotification(message) {
  const notificationMessage = document.getElementById('notification-message');
  notificationMessage.textContent = message;
  
  const notificationBanner = document.getElementById('notification-banner');
  notificationBanner.classList.remove('hide');
  notificationBanner.classList.add('show');
  
  setTimeout(hideNotification, 3000);
}

function hideNotification() {
  const notificationBanner = document.getElementById('notification-banner');
  notificationBanner.classList.remove('show');
  notificationBanner.classList.add('hide');
}

// Enhanced Special Pack functionality
function createConfetti() {
  const colors = ['#f8ba33', '#ffd700', '#ffffff', '#ffa726'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    confetti.style.zIndex = '1000';
    document.body.appendChild(confetti);
    
    gsap.to(confetti, {
      y: window.innerHeight + 20,
      x: (Math.random() - 0.5) * 100,
      rotation: Math.random() * 360,
      duration: 2 + Math.random() * 3,
      ease: "power1.out",
      onComplete: () => confetti.remove()
    });
  }
}