// Salomake Unisex Salon & Academy — frontend interactions
// Update WHATSAPP_NUMBER below to the salon's verified WhatsApp number in international format.
// India example: 91 followed by the 10-digit mobile number, with no +, spaces or dashes.
const WHATSAPP_NUMBER = "917307188414";

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const header = document.querySelector(".site-header");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});
navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

function handleHeader() {
  header.classList.toggle("scrolled", window.scrollY > 60);
}
window.addEventListener("scroll", handleHeader, { passive: true });
handleHeader();

// Service filters
const filterButtons = document.querySelectorAll(".filter");
const serviceCards = document.querySelectorAll(".service-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    serviceCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// Set the earliest booking date to today in the visitor's local timezone.
const dateInput = document.getElementById("dateInput");
const today = new Date();
const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
dateInput.min = localToday;

// Prefill the enquiry service when users click a service or academy CTA.
document.querySelectorAll("[data-service], [data-prefill]").forEach(link => {
  link.addEventListener("click", () => {
    const requestedService = link.dataset.service || link.dataset.prefill;
    const select = document.getElementById("serviceSelect");
    const matchingOption = [...select.options].find(option => option.value === requestedService || option.textContent.trim() === requestedService);
    if (matchingOption) select.value = matchingOption.value;
  });
});

// WhatsApp links. This opens a prefilled message; it does not confirm a booking.
function whatsappUrl(message = "Hello Salomake Unisex Salon and Academy! I'd like to enquire about your services.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
["floatingWhatsapp", "contactWhatsapp"].forEach(id => {
  const link = document.getElementById(id);
  link.href = whatsappUrl();
  link.target = "_blank";
  link.rel = "noopener";
});
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    // The service is preselected by the other click handler; form submit creates the message.
  });
});

// Booking enquiry: validate, then open WhatsApp with the form details.
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");
bookingForm.addEventListener("submit", event => {
  event.preventDefault();
  formStatus.textContent = "";
  if (!bookingForm.reportValidity()) return;

  const data = new FormData(bookingForm);
  const phoneDigits = String(data.get("phone")).replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    formStatus.textContent = "Please enter a valid phone number (10–13 digits including country code if used).";
    bookingForm.elements.phone.focus();
    return;
  }
  const message = [
    "Hello Salomake Unisex Salon and Academy! I'd like to send an appointment enquiry.",
    "",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    data.get("email") ? `Email: ${data.get("email")}` : "",
    `Service: ${data.get("service")}`,
    `Preferred date: ${data.get("date")}`,
    `Preferred time: ${data.get("time")}`,
    data.get("message") ? `Message: ${data.get("message")}` : "",
    "",
    "Please let me know availability. I understand this is an enquiry, not a confirmed booking."
  ].filter(Boolean).join("\n");

  formStatus.textContent = "Opening WhatsApp with your enquiry. Please press Send in WhatsApp to contact the salon.";
  window.open(whatsappUrl(message), "_blank", "noopener");
});

// Gallery lightbox with keyboard support.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
let lastGalleryTrigger = null;
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  if (lastGalleryTrigger) lastGalleryTrigger.focus();
}
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lastGalleryTrigger = item;
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.hidden = false;
    lightboxClose.focus();
  });
});
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !lightbox.hidden) closeLightbox(); });

// Scroll reveal animation with a fallback for browsers without IntersectionObserver.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}
document.getElementById("year").textContent = new Date().getFullYear();
