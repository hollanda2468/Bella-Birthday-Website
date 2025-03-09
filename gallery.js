document.addEventListener("DOMContentLoaded", async function () {
    const imageFolder = "assets/images/";
    try {
        const response = await fetch("image-list.txt");
        if (!response.ok) throw new Error("Failed to fetch image-list.txt");

        const text = await response.text();
        console.log("Loaded image list:", text); // ✅ Debugging step

        const imageFiles = text.trim().split("\n");
        const gallery = document.getElementById("gallery");

        // Clear existing content to prevent duplicates
        gallery.innerHTML = "";

        // Populate Swiper with images
        imageFiles.forEach((file) => {
            let slide = document.createElement("div");
            slide.classList.add("swiper-slide");

            let img = document.createElement("img");
            img.src = `${imageFolder}${file.trim()}`;
            img.alt = "Memory";
            img.classList.add("swiper-lazy");
            img.loading = "lazy";

            slide.appendChild(img);
            gallery.appendChild(slide);
        });

        // ✅ Initialize Swiper AFTER images are added
        let swiper = new Swiper(".swiper", {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            lazy: { loadPrevNext: true }, // ✅ Lazy loading enabled
        });

        // ✅ Ensure Swiper.lazy exists before using it
        if (swiper.lazy && typeof swiper.lazy.load === "function") {
            console.log("Swiper Lazy Load initialized successfully.");
            swiper.lazy.load();
        } else {
            console.warn("Swiper Lazy Load not available.");
        }

        // ✅ Fix Play/Pause Button
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

    } catch (error) {
        console.error("Error loading images:", error);
    }
});
