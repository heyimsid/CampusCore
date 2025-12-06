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

// --- 5. "View Catalog" Smooth Scroll ---
// --- 5. "View Catalog" Toggle Logic ---
const viewCatalogBtn = document.querySelector('.btn-secondary');
const catalogSection = document.getElementById('catalog-gallery');

viewCatalogBtn.addEventListener('click', () => {
    // Toggle the 'open' class
    catalogSection.classList.toggle('open');
    
    // Change Button Text based on state
    if (catalogSection.classList.contains('open')) {
        viewCatalogBtn.textContent = "Close Catalog";
        viewCatalogBtn.style.background = "rgba(255,255,255,0.1)";
        
        // Slight delay to allow animation to start before scrolling
        setTimeout(() => {
            catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        viewCatalogBtn.textContent = "View Catalog";
        viewCatalogBtn.style.background = "transparent";
    }
});

// Add functionality to the new "Reserve" buttons in the catalog
document.querySelectorAll('.btn-mini').forEach(btn => {
    btn.addEventListener('click', function() {
        if(!this.classList.contains('disabled')) {
            // reuse the modal logic!
            document.getElementById('bookingModal').classList.add('active');
        }
    });
});
