document.addEventListener("DOMContentLoaded", async function () {
    const imageFolder = "assets/images/";
    const response = await fetch(imageFolder + "image-list.txt");
    const imageFiles = (await response.text()).trim().split("\n");

    const flipbook = document.getElementById("flipbook");
    let images = [];

    // Preload images
    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => reject(`Failed to load: ${src}`);
        });
    }

    // Load all images before starting animation
    Promise.all(imageFiles.map(file => preloadImage(imageFolder + file)))
        .then(loadedImages => {
            loadedImages.forEach((img, index) => {
                img.classList.add("flip-img");
                img.alt = `Memory ${index + 1}`;
                img.style.opacity = "0"; // Start hidden
                flipbook.appendChild(img);
                images.push(img);
            });

            startFlipAnimation(images);
        })
        .catch(error => console.error(error));

    function startFlipAnimation(images) {
        let index = 0;

        function flipImages() {
            if (index > 0) {
                images[index - 1].style.opacity = "0";
            }
            images[index].style.opacity = "1";

            index++;

            if (index < images.length) {
                setTimeout(flipImages, 500); // Adjust speed of flipping
            } else {
                setTimeout(() => {
                    document.getElementById("flipbook-container").style.display = "none";
                    document.getElementById("main-content").classList.remove("hidden");
                }, 500);
            }
        }

        setTimeout(flipImages, 500);
    }
});
