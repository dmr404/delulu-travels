/* ============================================================
   Only job right now: open/close the mobile nav menu.
   ============================================================ */

// Grab the hamburger button and the nav links list
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// When the hamburger icon is clicked, toggle the "active" class.
// The "active" class is what makes the mobile menu slide open (see styles.css).
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close the mobile menu automatically after a link is clicked.
// This makes navigation feel smoother on small screens.
const allNavItems = document.querySelectorAll(".nav-item");

allNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
