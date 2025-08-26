document.addEventListener("DOMContentLoaded", () => {
  // === GSAP Scroll Animations ===
  gsap.registerPlugin(ScrollTrigger);

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

  // === Registration Modal ===
  const modal = document.getElementById("registration-modal");
  const closeModal = modal.querySelector(".modal-close");
  const form = document.getElementById("registration-form");

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const eventName = formData.get('event-name');
    const participantName = formData.get('participant-name');
    const email = formData.get('email');
    
    // Show success message
    alert(`Registration successful for ${eventName}!\n\nThank you ${participantName}, we'll send confirmation details to ${email}.`);
    
    // Reset form and close modal
    form.reset();
    modal.classList.add("hidden");
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden")) {
      if (e.key === "Escape") {
        modal.classList.add("hidden");
      }
    }
  });
});

// Registration function called by register buttons
function registerEvent(eventName) {
  const modal = document.getElementById("registration-modal");
  const eventNameInput = document.getElementById("event-name");
  
  eventNameInput.value = eventName;
  modal.classList.remove("hidden");
  
  // Focus on first input field
  setTimeout(() => {
    document.getElementById("participant-name").focus();
  }, 100);
}