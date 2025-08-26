document.addEventListener("DOMContentLoaded", () => {
  // Initialize only necessary functions
  initPageTransitions();
  initRegistrationModal();
  
  // === Poster Modal with Slideshow and Controls ===
  const modal = document.getElementById("poster-modal");
  const modalImg = modal.querySelector(".modal-img");
  const caption = document.getElementById("modal-caption");
  const closeModal = modal.querySelector(".modal-close");
  const pauseBtn = document.getElementById("pause-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const posterThumbs = Array.from(document.querySelectorAll(".poster-thumb"));
  let currentIndex = 0;
  let isPlaying = true;
  let slideshowInterval = null;

  function showImage(index, direction = "right") {
    const img = posterThumbs[index];
    if (!img) return;

    const slideClass = direction === "left" ? "slide-left" : "slide-right";

    modalImg.classList.add(slideClass);
    setTimeout(() => {
      modalImg.src = img.src;
      caption.textContent = img.alt || "Event Poster";
      modalImg.classList.remove(slideClass);
      currentIndex = index;
    }, 300);
  }

  function nextImage() {
    const nextIndex = (currentIndex + 1) % posterThumbs.length;
    showImage(nextIndex, "right");
  }

  function prevImage() {
    const prevIndex = (currentIndex - 1 + posterThumbs.length) % posterThumbs.length;
    showImage(prevIndex, "left");
  }

  function startSlideshow() {
    stopSlideshow();
    slideshowInterval = setInterval(nextImage, 4000);
    pauseBtn.classList.remove("paused");
    pauseBtn.classList.add("playing");
    pauseBtn.setAttribute("aria-label", "Pause Slideshow");
    pauseBtn.innerHTML = `<img src="https://www.svgrepo.com/show/176023/music-pause-button-pair-of-lines.svg" alt="Pause" style="width:24px;height:24px;display:block;margin:auto;">`;
    isPlaying = true;
  }

  function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    pauseBtn.classList.remove("playing");
    pauseBtn.classList.add("paused");
    pauseBtn.setAttribute("aria-label", "Play Slideshow");
    pauseBtn.innerHTML = `<img src="https://www.svgrepo.com/show/526106/play.svg" alt="Play" style="width:24px;height:24px;display:block;margin:auto;">`;
    isPlaying = false;
  }

  function toggleSlideshow() {
    isPlaying ? stopSlideshow() : startSlideshow();
  }

  posterThumbs.forEach((img, index) => {
    img.addEventListener("click", () => {
      showImage(index, false);
      modal.classList.remove("hidden");
      startSlideshow();
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    stopSlideshow();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      stopSlideshow();
    }
  });

  pauseBtn.addEventListener("click", toggleSlideshow);
  nextBtn.addEventListener("click", () => {
    nextImage();
    if (isPlaying) stopSlideshow();
  });
  prevBtn.addEventListener("click", () => {
    prevImage();
    if (isPlaying) stopSlideshow();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden")) {
      if (e.key === "ArrowRight") {
        nextImage();
        if (isPlaying) stopSlideshow();
      } else if (e.key === "ArrowLeft") {
        prevImage();
        if (isPlaying) stopSlideshow();
      } else if (e.key === " ") {
        e.preventDefault();
        toggleSlideshow();
      } else if (e.key === "Escape") {
        modal.classList.add("hidden");
        stopSlideshow();
      }
    }

    if (e.key === "ArrowUp") {
      window.scrollBy({ top: -100, behavior: "smooth" });
    } else if (e.key === "ArrowDown") {
      window.scrollBy({ top: 100, behavior: "smooth" });
    }
  });

  // === GSAP Scroll Animations ===
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".grow-on-scroll").forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // === Scroll Reveal ===
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-down').forEach(section => {
    observer.observe(section);
  });

  // === Back to Top Button ===
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// === Countdown Timer ===
const targetDate = new Date("2025-09-09T09:30:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = "<div class='event-started'><span>Event Started!</span><div>Join Now!</div></div>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  
  // Add animation for seconds
  const secondsEl = document.getElementById('seconds');
  secondsEl.classList.add('pulse');
  setTimeout(() => {
    secondsEl.classList.remove('pulse');
  }, 500);
}

setInterval(updateCountdown, 1000);
updateCountdown();

// === Apply Satisfaction Font to Abhigyan'25 text ===
function applyAbhigyanFont() {
  // Use a more comprehensive text node walker to find all text instances
  function walkTextNodes(node, func) {
    if (node.nodeType === 3) { // Text node
      func(node);
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        walkTextNodes(node.childNodes[i], func);
      }
    }
  }
  
  // Process all text nodes in the document
  walkTextNodes(document.body, function(textNode) {
    const text = textNode.nodeValue;
    
    // Check if text contains "Abhigyan'25"
    if (text && text.includes("Abhigyan'25")) {
      // Create a wrapper span
      const span = document.createElement('span');
      
      // Replace Abhigyan'25 with styled span
      span.innerHTML = text.replace(/(Abhigyan'25)/g, '<span class="abhigyan25">$1</span>');
      
      // Replace the original text node with our new node
      textNode.parentNode.replaceChild(span, textNode);
    }
  });
  
  // Also check for elements that might have it as innerHTML
  const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, span, div');
  allElements.forEach(el => {
    if (el.innerHTML && el.innerHTML.includes("Abhigyan'25") && !el.innerHTML.includes("abhigyan25")) {
      el.innerHTML = el.innerHTML.replace(/(Abhigyan'25)/g, '<span class="abhigyan25">$1</span>');
    }
  });
}

// === Background Effects ===
function initBackgroundEffects() {
  // Create leaves background if it doesn't exist
  if (!document.querySelector('.leaves-background')) {
    const leavesBackground = document.createElement('div');
    leavesBackground.className = 'leaves-background';
    
    // Create 10 leaves with different speeds
    for (let i = 1; i <= 10; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.style.setProperty('--i', i);
      
      // SVG leaf shape
      leaf.innerHTML = `<svg viewBox="0 0 24 24" fill="${i % 2 === 0 ? '#66ff99' : '#00cc66'}" opacity="0.7">
          <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20,4,4,0,0,0,12,16a4,4,0,0,0-4-4,4,4,0,0,0-1.33.24l1.56-3.55A10.35,10.35,0,0,1,17,8Z"/>
      </svg>`;
      
      leavesBackground.appendChild(leaf);
    }
    
    document.body.appendChild(leavesBackground);
  }
}

// === Hero Particles Animation ===
function initHeroParticles() {
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    const energyParticles = document.createElement('div');
    energyParticles.className = 'energy-particles';
    
    // Create 30 particles with random positions and sizes
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 5 + 2;
      
      // Random animation duration
      const duration = Math.random() * 10 + 10;
      
      // Random horizontal movement
      const xMove = (Math.random() - 0.5) * 100;
      
      // Style the particle
      particle.style.left = `${posX}%`;
      particle.style.bottom = `${posY}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      
      // Set custom animation properties
      particle.style.animationDuration = `${duration}s`;
      particle.style.setProperty('--x', `${xMove}px`);
      
      // Delay start
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      energyParticles.appendChild(particle);
    }
    
    heroSection.appendChild(energyParticles);
  }
}

// Add smooth page transitions and animations
function initPageTransitions() {
  // Add class to body when page is fully loaded
  window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
  });
  
  // Animate elements on page load
  const animateElements = document.querySelectorAll('.about-card, .timeline-item, .team-member, .event-card');
  animateElements.forEach((el, index) => {
    el.style.setProperty('--i', index);
    el.classList.add('animate-on-scroll');
  });
  
  // Add animation to Abhigyan text
  const abhigyanElements = document.querySelectorAll('h1, h2, h3, p, div, span');
  abhigyanElements.forEach(el => {
    // Apply specific class for "Abhigyan'25"
    if (el.textContent.includes("Abhigyan'25")) {
      el.innerHTML = el.innerHTML.replace(/(Abhigyan'25)/g, '<span class="abhigyan25">$1</span>');
    }
    // Apply general class for just "Abhigyan"
    else if (el.textContent.includes('Abhigyan')) {
      el.innerHTML = el.innerHTML.replace(/(Abhigyan)(?!'25)/g, '<span class="abhigyan">$1</span>');
    }
  });
  
  // Initialize intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all animate-on-scroll elements
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
  
  // Add parallax effect to backgrounds
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    document.querySelectorAll('.page-header').forEach(header => {
      header.style.backgroundPosition = `50% ${scrolled * 0.4}px`;
    });
  });
}

// Create background particles for energy effect
function initHeroParticles() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  
  const energyParticles = document.createElement('div');
  energyParticles.className = 'energy-particles';
  
  // Create 30 particles with random positions and sizes
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 5 + 2;
    
    // Random animation duration
    const duration = Math.random() * 10 + 10;
    
    // Random horizontal movement
    const xMove = (Math.random() - 0.5) * 100;
    
    // Style the particle
    particle.style.left = `${posX}%`;
    particle.style.bottom = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    
    // Set custom animation properties
    particle.style.animationDuration = `${duration}s`;
    particle.style.setProperty('--x', `${xMove}px`);
    
    // Delay start
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    energyParticles.appendChild(particle);
  }
  
  heroSection.appendChild(energyParticles);
}

// Initialize background effects
function initBackgroundEffects() {
  // Create leaves background if it doesn't exist
  if (!document.querySelector('.leaves-background')) {
    const leavesBackground = document.createElement('div');
    leavesBackground.className = 'leaves-background';
    
    // Create 10 leaves with different speeds
    for (let i = 1; i <= 10; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.style.setProperty('--i', i);
      
      // SVG leaf shape
      leaf.innerHTML = `<svg viewBox="0 0 24 24" fill="${i % 2 === 0 ? '#66ff99' : '#00cc66'}" opacity="0.7">
          <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20,4,4,0,0,0,12,16a4,4,0,0,0-4-4,4,4,0,0,0-1.33.24l1.56-3.55A10.35,10.35,0,0,1,17,8Z"/>
      </svg>`;
      
      leavesBackground.appendChild(leaf);
    }
    
    document.body.appendChild(leavesBackground);
  }
}

// Create bubbles effect for hero section
function createHeroBubbles() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  
  // Create only 6 bubbles with different sizes and positions (reduced from 15)
  for (let i = 0; i < 6; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Random size between 10px and 40px (reduced size)
    const size = Math.random() * 30 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Position bubbles around the edges, not in the center
    let posX, posY;
    if (Math.random() > 0.5) {
      // Position on sides
      posX = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
      posY = Math.random() * 100;
    } else {
      // Position on top/bottom
      posX = Math.random() * 100;
      posY = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
    }
    
    bubble.style.left = `${posX}%`;
    bubble.style.top = `${posY}%`;
    
    // Lower opacity
    bubble.style.opacity = Math.random() * 0.3 + 0.1;
    
    // Animation
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    
    bubble.style.animation = `float ${duration}s ease-in-out infinite alternate`;
    bubble.style.animationDelay = `${delay}s`;
    
    // Add a golden glow to some bubbles
    if (Math.random() > 0.7) {
      bubble.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(255, 215, 0, 0.2)`;
      bubble.style.background = 'rgba(255, 215, 0, 0.1)';
    }
    
    heroSection.appendChild(bubble);
  }
  
  // Add float animation to CSS if it doesn't exist
  if (!document.querySelector('style#bubble-animations')) {
    const style = document.createElement('style');
    style.id = 'bubble-animations';
    style.innerHTML = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0) scale(1) rotate(0deg);
        }
        33% {
          transform: translateY(-${Math.random() * 30 + 10}px) translateX(${Math.random() * 20 - 10}px) scale(1.1) rotate(${Math.random() * 360}deg);
        }
        66% {
          transform: translateY(${Math.random() * 30 + 10}px) translateX(${Math.random() * 20 - 10}px) scale(0.9) rotate(${Math.random() * 360}deg);
        }
        100% {
          transform: translateY(0) translateX(0) scale(1) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Registration Modal Functionality
function initRegistrationModal() {
  const modal = document.getElementById("registration-modal");
  if (!modal) return;
  
  const closeBtn = modal.querySelector(".modal-close");
  const form = document.getElementById("registration-form");
  const eventNameInput = document.getElementById("event-name");

  // Close modal when clicking on X or outside the modal
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Form submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const eventName = formData.get("event-name");
      
      // Simple validation
      const name = formData.get("participant-name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      
      if (!name || !email || !phone) {
        alert("Please fill in all required fields");
        return;
      }
      
      // Here you would typically send the data to a server
      // For demo purposes, we'll just show a confirmation
      alert(`Thank you for registering for ${eventName}! We'll contact you soon with more details.`);
      modal.classList.add("hidden");
      form.reset();
    });
  }
}

// Function to open registration modal
window.registerEvent = function(eventName) {
  const modal = document.getElementById("registration-modal");
  const eventNameInput = document.getElementById("event-name");
  
  if (modal && eventNameInput) {
    eventNameInput.value = eventName;
    modal.classList.remove("hidden");
  }
};
