// Scroll-spy: highlight the nav link for the section currently in view
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

const closeMenu = () => {
  sidebar.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

// Cursor glow: soft light that follows the pointer
const cursorGlow = document.getElementById("cursorGlow");

if (cursorGlow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  const render = () => {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      rafId = requestAnimationFrame(render);
    } else {
      rafId = null;
    }
  };

  const startRender = () => {
    if (rafId === null) {
      rafId = requestAnimationFrame(render);
    }
  };

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    cursorGlow.classList.add("active");
    startRender();
  });

  document.addEventListener("mouseleave", () => {
    cursorGlow.classList.remove("active");
  });
}
