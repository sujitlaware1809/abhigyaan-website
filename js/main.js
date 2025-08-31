// Abhigyan 25 - Main JavaScript File

// Custom Cursor Implementation
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 100);
    });
  }
});

// Navigation Active State
function setActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === 'index.html' && href === 'index.html') ||
        (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Ensure Navigation Visibility
function ensureNavigationVisibility() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.display = 'block';
    navbar.style.visibility = 'visible';
    navbar.style.opacity = '1';
    navbar.style.position = 'fixed';
    navbar.style.zIndex = '1000';
    console.log('Navigation visibility ensured');
  }
}

// 3D Background Setup
function init3DBackground() {
  try {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded, skipping 3D background');
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    const bgContainer = document.getElementById('three-bg');
    if (bgContainer) {
      bgContainer.appendChild(renderer.domElement);
    }

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < 2000; i++) {
      vertices.push((Math.random() - 0.5) * 2000);
      vertices.push((Math.random() - 0.5) * 2000);
      vertices.push((Math.random() - 0.5) * 2000);

      colors.push(Math.random());
      colors.push(Math.random() * 0.5 + 0.5);
      colors.push(1);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 500;

    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  } catch (error) {
    console.error('Error initializing 3D background:', error);
  }
}

// Floating Elements Animation
function createFloatingElements() {
  try {
    const container = document.getElementById('floating-elements');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.style.left = Math.random() * 100 + '%';
      element.style.animationDelay = Math.random() * 20 + 's';
      element.style.animationDuration = (Math.random() * 10 + 10) + 's';
      container.appendChild(element);
    }
  } catch (error) {
    console.error('Error creating floating elements:', error);
  }
}

// GSAP Animations
function initGSAPAnimations() {
  try {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded, skipping animations');
      return;
    }

    // Fade in animations for sections
    gsap.from('.section', {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // Navigation animation - ensure it stays visible
    gsap.fromTo('.navbar', 
      {
        y: -50,
        opacity: 0
      },
      {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        onComplete: function() {
          // Ensure navigation stays visible after animation
          const navbar = document.querySelector('.navbar');
          if (navbar) {
            navbar.style.opacity = '1';
            navbar.style.visibility = 'visible';
            navbar.style.display = 'block';
          }
        }
      }
    );

  } catch (error) {
    console.error('Error initializing GSAP animations:', error);
  }
}

// Countdown Timer
function initCountdown() {
  const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  // Check if countdown elements exist
  const hasCountdownElements = Object.values(countdownElements).some(el => el !== null);
  if (!hasCountdownElements) return;

  const eventDate = new Date('September 11, 2025 00:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (countdownElements.days) countdownElements.days.textContent = days.toString().padStart(2, '0');
      if (countdownElements.hours) countdownElements.hours.textContent = hours.toString().padStart(2, '0');
      if (countdownElements.minutes) countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
      if (countdownElements.seconds) countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');
    } else {
      Object.values(countdownElements).forEach(el => {
        if (el) el.textContent = '00';
      });
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Image Loading Optimization
function initImageOptimization() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Abhigyan 25 - Initializing...');
  
  // Ensure navigation is visible first
  ensureNavigationVisibility();
  
  setActiveNavigation();
  init3DBackground();
  createFloatingElements();
  initGSAPAnimations();
  initCountdown();
  initImageOptimization();
  
  // Double-check navigation visibility after animations
  setTimeout(function() {
    ensureNavigationVisibility();
  }, 2000);
  
  console.log('Abhigyan 25 - Initialized successfully');
});

// Additional safety checks for navigation visibility
window.addEventListener('load', function() {
  setTimeout(function() {
    ensureNavigationVisibility();
  }, 1000);
});

// Periodic check to ensure navigation stays visible
setInterval(function() {
  ensureNavigationVisibility();
}, 5000);

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

// Export functions for use in other scripts
window.AbhigyanUtils = {
  setActiveNavigation,
  init3DBackground,
  createFloatingElements,
  initGSAPAnimations,
  initCountdown,
  initImageOptimization
};