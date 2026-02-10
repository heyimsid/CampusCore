// --- 1. Navbar Scroll Effect ---
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- 2. 3D Tilt Effect for Cards ---
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// --- 3. TOAST NOTIFICATION FUNCTION ---
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// --- 4. Booking Modal Logic ---
const modal = document.getElementById('bookingModal');
const openBtn = document.querySelector('.btn-primary'); // The "Book a Resource" button
const closeBtn = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');

if(openBtn) {
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });
}

if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// Close if clicked outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Booking Form Submit
if(bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.remove('active');
        showToast("Booking Successful! Reference #8842 🚀");
        bookingForm.reset();
    });
}

// --- 5. Catalog Modal Logic ---
const catalogModal = document.getElementById('catalogModal');
const viewCatalogBtn = document.querySelector('.btn-secondary');
const closeCatalogBtn = document.getElementById('closeCatalog');

if(viewCatalogBtn) {
    viewCatalogBtn.addEventListener('click', () => {
        const catalogSection = document.getElementById('catalog-gallery');
        catalogSection.classList.add('open'); 
        catalogModal.classList.add('active');
    });
}

if(closeCatalogBtn) {
    closeCatalogBtn.addEventListener('click', () => {
        catalogModal.classList.remove('active');
    });
}

// Close Catalog if clicked outside
catalogModal.addEventListener('click', (e) => {
    if (e.target === catalogModal) {
        catalogModal.classList.remove('active');
    }
});

// --- Smart Switch: Close Catalog -> Open Booking ---
function switchModal(itemName) {
    catalogModal.classList.remove('active');
    setTimeout(() => {
        const bookingModal = document.getElementById('bookingModal');
        bookingModal.classList.add('active');
        
        const select = document.getElementById('resourceSelect');
        let option = new Option(itemName, itemName);
        select.add(option, undefined);
        select.value = itemName;
        
    }, 300);
}

// --- 6. AUTH MODAL LOGIC (Login/Register) ---
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn'); 
const closeAuthBtn = document.getElementById('closeAuth');
const loginView = document.getElementById('loginView');
const registerView = document.getElementById('registerView');
const toRegisterBtn = document.getElementById('toRegister');
const toLoginBtn = document.getElementById('toLogin');
const loginFormAction = document.getElementById('loginFormAction');
const registerFormAction = document.getElementById('registerFormAction');

// Open Auth Modal
if(loginBtn) {
    loginBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        loginView.style.display = 'block';
        registerView.style.display = 'none';
    });
}

// Close Auth Modal
if(closeAuthBtn) {
    closeAuthBtn.addEventListener('click', () => {
        authModal.classList.remove('active');
    });
}

// Close if clicked outside
if(authModal) {
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
    });
}

// Switch to Register
if(toRegisterBtn) {
    toRegisterBtn.addEventListener('click', () => {
        loginView.style.display = 'none';
        registerView.style.display = 'block';
    });
}

// Switch to Login
if(toLoginBtn) {
    toLoginBtn.addEventListener('click', () => {
        registerView.style.display = 'none';
        loginView.style.display = 'block';
    });
}

// --- 7. HANDLE LOGIN & REGISTER SUBMIT ---

// Login Success Simulation
if(loginFormAction) {
    loginFormAction.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload
        
        // Simulating a check...
        authModal.classList.remove('active');
        showToast("Login Successful! Welcome back 🔓");
        
        // Optional: Reset form
        loginFormAction.reset();
    });
}

// Register Success Simulation
if(registerFormAction) {
    registerFormAction.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload
        
        // Simulating a check...
        authModal.classList.remove('active');
        showToast("Registration Successful! Account Created 🚀");
        
        // Optional: Reset form
        registerFormAction.reset();
    });
}
