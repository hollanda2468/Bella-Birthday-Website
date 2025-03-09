document.addEventListener("DOMContentLoaded", async function () {
    const imageFolder = "assets/images/";
    const response = await fetch(imageFolder + "image-list.txt");
    const imageFiles = (await response.text()).trim().split("\n");

    const gallery = document.getElementById("gallery");

    // Populate the Swiper slider with images
    imageFiles.forEach((file) => {
        let slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        let img = document.createElement("img");
        img.setAttribute("data-src", imageFolder + file); // Lazy load using data-src
        img.alt = "Memory";
        img.classList.add("swiper-lazy");

        let loader = document.createElement("div");
        loader.classList.add("swiper-lazy-preloader");

        slide.appendChild(img);
        slide.appendChild(loader);
        gallery.appendChild(slide);
    });

    // Initialize Swiper.js with Lazy Loading
    let swiper = new Swiper(".swiper", {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        lazy: true, // Enables lazy loading
    });

    // Play/Pause Button Logic
    const playPauseBtn = document.getElementById("playPauseBtn");
    playPauseBtn.addEventListener("click", function () {
        if (swiper.autoplay.running) {
            swiper.autoplay.stop();
            playPauseBtn.textContent = "▶ Play";
        } else {
            swiper.autoplay.start();
            playPauseBtn.textContent = "⏸ Pause";
        }
    });
});

function toggleMenu() {
    document.querySelector(".mobile-menu").classList.toggle("show");
}