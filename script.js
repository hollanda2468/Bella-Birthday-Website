function toggleMenu() {
    document.querySelector(".mobile-menu").classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop(); // Get current filename
    const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active"); // Apply active class to matching link
        }
    });
});
