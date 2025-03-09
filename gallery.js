document.addEventListener("DOMContentLoaded", async function () {
    const imageFolder = "assets/images/";
    try {
        const response = await fetch("image-list.txt");
        if (!response.ok) throw new Error("Failed to fetch image-list.txt");

        const text = await response.text();
        console.log("Loaded image list:", text); // ✅ Debugging step

        const imageFiles = text.trim().split("\n");
        const gallery = document.getElementById("gallery");

        imageFiles.forEach((file) => {
            let slide = document.createElement("div");
            slide.classList.add("swiper-slide");

            let img = document.createElement("img");
            img.setAttribute("data-src", imageFolder + file);
            img.alt = "Memory";
            img.classList.add("swiper-lazy");

            let loader = document.createElement("div");
            loader.classList.add("swiper-lazy-preloader");

            slide.appendChild(img);
            slide.appendChild(loader);
            gallery.appendChild(slide);
        });

        let swiper = new Swiper(".swiper", {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            lazy: true,
        });

    } catch (error) {
        console.error("Error loading images:", error);
    }
});

