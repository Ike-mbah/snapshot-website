// 1. FOR SMOOTH PAGE SCROLLING WHEN NAV LINKS ARE CLICKED

document.querySelector(".nav-links").addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// 2.FOR STICKY NAV BAR

const header = document.querySelector(".header");
const navBar = document.querySelector(".nav-bar");
const navHeight = navBar.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) navBar.classList.add("sticky");
  else {
    navBar.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// 3. Reveal Sections

const allEffect = document.querySelectorAll(".effect");
const revealEffect = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("effect--hidden");
  observer.unobserve(entry.target);
};

const effectObserver = new IntersectionObserver(revealEffect, {
  root: null,
  threshold: 0.15,
});

allEffect.forEach((effect) => {
  effectObserver.observe(effect);
  effect.classList.add("effect--hidden");
});

// SLIDER CAROUSEL EFFECT

// const carouselDots = document.querySelectorAll(".carousel-dot");
// const allSlides = document.querySelectorAll(".slide");

// carouselDots.forEach((dot) => {
//   dot.addEventListener("click", () => {
//     const targetIndex = dot.getAttribute("data-index");

//     // 1. Update active dot styling
//     carouselDots.forEach((d) => d.classList.remove("active"));
//     dot.classList.add("active");

//     // 2. Show/Hide rows based on the index
//     // index 0 = first-row, index 1 = second-row, index 2 = third-row
//     allSlides.forEach((slide) => {
//       if (targetIndex === "0" && slide.classList.contains("first-row")) {
//         slide.style.display = "block";
//       } else if (
//         targetIndex === "1" &&
//         slide.classList.contains("second-row")
//       ) {
//         slide.style.display = "block";
//       } else if (targetIndex === "2" && slide.classList.contains("third-row")) {
//         slide.style.display = "block";
//       } else {
//         slide.style.display = "none";
//       }
//     });
//   });
// });

// REFACTORED CAROUSEL LOGIC TO BE MORE DYNAMIC AND ALSO WORK ON MOBILE

const track = document.querySelector(".team-track");
const allSlides = document.querySelectorAll(".slide");
const dotContainer = document.getElementById("dot-container");

// Map your row classes to indexes
const rowMap = {
  0: "first-row",
  1: "second-row",
  2: "third-row",
};

function initDots() {
  // Clear existing
  dotContainer.innerHTML = "";

  // Decide how many dots based on screen
  const isMobile = window.innerWidth < 767;
  const totalDots = isMobile ? allSlides.length : 3;

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");
    dot.classList.add("carousel-dot");
    dot.dataset.index = i;
    if (i === 0) dot.classList.add("active");
    dotContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      handleDotClick(i, isMobile);
    });
  }
}

function handleDotClick(targetIndex, isMobile) {
  // Update UI dots
  document
    .querySelectorAll(".carousel-dot")
    .forEach((d) => d.classList.remove("active"));
  document
    .querySelectorAll(".carousel-dot")
    [targetIndex].classList.add("active");

  // Apply your Original Logic for desktop, or simplified logic for mobile
  allSlides.forEach((slide) => {
    if (isMobile) {
      // Mobile: Show only the slide that matches the current dot index
      slide.style.display =
        Array.from(allSlides).indexOf(slide) === targetIndex ? "block" : "none";
    } else {
      // Desktop: Keep your row-based logic
      const rowClass = rowMap[targetIndex];
      slide.style.display = slide.classList.contains(rowClass)
        ? "block"
        : "none";
    }
  });
}

// Initialize and Listen for resize
initDots();
window.addEventListener("resize", initDots);

// Select elements
const hamburger = document.getElementById("hamburger");
const closeBtn = document.querySelector(".close-sidebar");
const navLinks = document.querySelector(".nav-links");
const overlay = document.getElementById("overlay");
const links = document.querySelectorAll(".nav-link");

// Function to open menu
const openMenu = () => {
  navLinks.classList.add("active");
  overlay.classList.add("active");
  // document.body.style.overflow = "hidden"; // Prevents background scrolling
};

// Function to close menu
const closeMenu = () => {
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
  // document.body.style.overflow = "auto"; // Re-enables background scrolling
};

// Event Listeners
hamburger.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu); // Close if user clicks outside

// Close menu when a link is clicked (optional but recommended)
links.forEach((link) => {
  link.addEventListener("click", closeMenu);
});
