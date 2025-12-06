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

// --- 3. Modal Logic (The New Part) ---
const modal = document.getElementById('bookingModal');
const openBtn = document.querySelector('.btn-primary'); // The "Book a Resource" button
const closeBtn = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');

// Open Modal
openBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stop jump to top
    modal.classList.add('active');
});

// Close Modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close if clicked outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// --- 4. Form Submission Simulation ---
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual server submit for now
    
    // Close modal
    modal.classList.remove('active');
    
    // Show Success Toast
    showToast("Booking Successful! Reference #8842");
    
    // Optional: Reset form
    bookingForm.reset();
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// --- 5. Catalog Modal Logic ---
const catalogModal = document.getElementById('catalogModal');
const viewCatalogBtn = document.querySelector('.btn-secondary');
const closeCatalogBtn = document.getElementById('closeCatalog');

// Open Catalog
viewCatalogBtn.addEventListener('click', () => {
    catalogModal.classList.add('active');
});

// Close Catalog
closeCatalogBtn.addEventListener('click', () => {
    catalogModal.classList.remove('active');
});

// Close Catalog if clicked outside
catalogModal.addEventListener('click', (e) => {
    if (e.target === catalogModal) {
        catalogModal.classList.remove('active');
    }
});

// --- Smart Switch: Close Catalog -> Open Booking ---
function switchModal(itemName) {
    // 1. Close the Catalog
    catalogModal.classList.remove('active');
    
    // 2. Open the Booking Modal (after small delay for smooth transition)
    setTimeout(() => {
        const bookingModal = document.getElementById('bookingModal');
        bookingModal.classList.add('active');
        
        // 3. Auto-fill the item name in the select box (Optional fancy touch)
        // This is a simple visual hack to show we selected the item
        const select = document.getElementById('resourceSelect');
        // Create a temporary option if it doesn't exist
        let option = new Option(itemName, itemName);
        select.add(option, undefined);
        select.value = itemName;
        
    }, 300); // 300ms delay matches the CSS transition
}
