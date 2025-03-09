document.addEventListener("DOMContentLoaded", async function () {
    const imageFolder = "assets/images/";
    const response = await fetch(imageFolder + "image-list.txt");
    const imageFiles = (await response.text()).trim().split("\n");

    const flipbook = document.getElementById("flipbook");

    imageFiles.forEach((file, index) => {
        let img = document.createElement("img");
        img.src = imageFolder + file;
        img.classList.add("flip-img");
        img.alt = `Memory ${index + 1}`;
        img.style.opacity = "0";
        flipbook.appendChild(img);
    });

    let images = document.querySelectorAll(".flip-img");
    let index = 0;

    function flipImages() {
        if (index > 0) {
            images[index - 1].style.opacity = "0";
        }
        images[index].style.opacity = "1";

        index++;

        if (index < images.length) {
            setTimeout(flipImages, 300);
        } else {
            setTimeout(() => {
                document.getElementById("flipbook-container").style.display = "none";
                document.getElementById("main-content").classList.remove("hidden");
            }, 500);
        }
    }

    setTimeout(flipImages, 500);
});
