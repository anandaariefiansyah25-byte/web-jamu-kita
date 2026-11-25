const filterButtons = document.querySelectorAll(".filter-chip");
const productCards = document.querySelectorAll(".product-card");
const emptyState = document.querySelector(".empty-state");
const cartCount = document.querySelector(".cart-count");
const toast = document.querySelector(".toast");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
let cartItems = 0;
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("selected", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });

    productCards.forEach((card) => {
      const visible = category === "semua" || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    emptyState.hidden = visibleCount > 0;
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    showToast(`${button.dataset.name} ditambahkan ke keranjang`);
  });
});

document.querySelectorAll(".favorite-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isFavorite = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(isFavorite));
    button.textContent = isFavorite ? "♥" : "♡";
    showToast(isFavorite ? "Ditambahkan ke racikan favorit" : "Dihapus dari racikan favorit");
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  mainNav.classList.toggle("open", isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector(".login-card").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".form-message").textContent =
    "Tampilan demo: fitur masuk akan aktif setelah layanan akun tersedia.";
});
