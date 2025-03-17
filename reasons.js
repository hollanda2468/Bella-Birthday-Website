const reasons = [
    "You’re incredibly smart",
    "You’re humble",
    "You’re drop dead gorgeous",
    "You celebrate the little things with me",
    "The way you look up at me before/after we hug",
    "All my friends love you",
    "My family loves you",
    "How much you care about your family",
    "That you believe in magic ;)",
    "You’re always pushing me to be a better version of myself",
    "You keep me on my toes",
    "When you sit on my lap or curl up in my arms",
    "How knowledgeable you are about music",
    "How you truly listen and take note of the things I say",
    "How much you believe in me",
    "You’re never afraid to speak your mind",
    "You’re an incredible leader",
    "You notice when I’m off and ask what’s wrong",
    "How passionate you are about AFA and Alzheimer’s research",
    "How you listen when I talk about the things I love",
    "That you got me flowers",
    "You’re always game for an adventure",
    "Your love of prosecco",
    "How you can talk to anyone, even if you just met them",
    "Your aspirations for your career",
    "How you have real goals and are taking steps to get to them",
    "You listen to my stories even when they’re long and dumb",
    "Your hair",
    "Your eyes",
    "Your smile",
    "You’re so unapologetically yourself",
    "How good you are at Euchre",
    "How good you are at darts",
    "Your desire to travel",
    "How you ask me about and care about my past",
    "Your love of dogs",
    "When I finish a drink you offer to get me another",
    "You push me to watch new movies",
    "You communicate how you are feeling and let me know when something is off",
    "How good you are at Mario Kart",
    "How you stand up for the people around you",
    "How you stand up for yourself",
    "That you love hearts and pink",
    "You let me treat you like the princess you are",
    "When you run your hands through my hair",
    "When we give each other massages",
    "When we’re sitting by each other and you put your hand on my leg",
    "When we’re sitting by each other and you grab my hand to hold",
    "When you hold my arm",
    "Your parents involve and care about me",
    "Your brothers are super cool",
    "Your good boy Buff",
    "How incredible of a mom I am certain you are going to be",
    "That my dogs love you",
    "We can talk for hours about seemingly nothing",
    "You ask great questions",
    "You’re an incredible kisser",
    "Your love of football",
    "You’re an incredible singer and I love when you sing to me",
    "You are a great dancer",
    "The way you say my name",
    "When you call me ‘baby’",
    "The way just being in your presence calms all the worries of my life",
    "When you run your nails lightly up my arms or my back",
    "When you lay with your legs over me",
    "That you are supportive and understanding when I get really busy",
    "How you can give me genuine unfiltered feedback and advice",
    "Our sex life is phenomenal",
    "You let me pick you up and carry you around",
    "When I’m standing behind you and wrap my arms around you and you look back up at me",
    "You’re an incredible cuddler and fit so perfect in my arms",
    "You’re genuinely really funny",
    "You send me great memes on Instagram",
    "You tolerate my frequent spam of Reels"
];

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("reveal-btn");
    const reasonContainer = document.getElementById("reason-container");
    const reasonText = document.getElementById("reason-text");

    button.addEventListener("click", function () {
        button.disabled = true; // Prevent multiple clicks
        button.textContent = "Finding the perfect reason... 💕";

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * reasons.length);
            reasonText.textContent = reasons[randomIndex];

            // **Reset animation before replaying**
            reasonText.style.animation = "none"; // Reset animation
            void reasonText.offsetWidth; // Force reflow
            reasonText.style.animation = "fadeIn 1s ease-in-out"; // Restart animation

            reasonContainer.classList.remove("hidden");
            button.textContent = "Show Me Another Reason";
            button.disabled = false;
        }, 5000); // 2-second delay before revealing
    });
});
