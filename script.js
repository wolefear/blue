// ========================================
// LYRICS CONFIGURATION
// ========================================
const lyrics = [
    { time: 19.14, text: "✨ Your morning eyes, I could stare like watching stars ⭐" },
    { time: 26.34, text: "🚶 I could walk you by, and I'll tell without a thought 💭" },
    { time: 32.90, text: "💖 You'd be mine 💖" },
    { time: 34.99, text: "🤝 Would you mind if i took your hand tonight 🌙" },
    { time: 40.36, text: "💫 Know you're all that I want this life 🌟" },
    { time: 48.15, text: "💕 I'll imagine we fell in love 💘" },
    { time: 50.72, text: "😴 I'll nap under moonlight skies with you 🌙✨" },
    { time: 54.64, text: "🎨 I think I'll picture us, you with the waves 🌊" },
    { time: 58.27, text: "🌊 The oceans colors on your face 🎨" },
    { time: 62.16, text: "❤️ I'll leave my heart with your air 💨" },
    { time: 66.26, text: "🦋 So let me fly with you ✈️" },
    { time: 69.51, text: "♾️ Will you be forever with me 💑" },
    { time: 106.86, text: "💗 My love will always stay by you 🫶" },
    { time: 112.50, text: "🔒 I'll keep it safe so don't you worry a thing, I'll tell you i love you more 💝" },
    { time: 121.40, text: "🤞 It's stuck with you forever so promise you won't let it go 💎" },
    { time: 128.17, text: "🌌 I'll trust the universe will always bring me to you ✨" },
    { time: 136.69, text: "💕 I'll imagine we fell in love 💘" },
    { time: 139.27, text: "😴 I'll nap under moonlight skies with you 🌙✨" },
    { time: 143.12, text: "🎨 I think I'll picture us, you with the waves 🌊" },
    { time: 146.73, text: "🌊 The oceans colors on your face 🎨" },
    { time: 150.37, text: "❤️ I'll leave my heart with your air 💨" },
    { time: 154.76, text: "🦋 So let me fly with you ✈️" },
    { time: 158.14, text: "♾️ Will you be forever with me 💑" },
];

// ========================================
// AUDIO CONTROL AND LYRICS SYNCHRONIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const playButton = document.getElementById('playButton');
    const currentLyricElement = document.getElementById('currentLyric');
    const finalMessage = document.getElementById('finalMessage');
    const starsContainer = document.getElementById('stars');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    let isPlaying = false;
    let lastLyricIndex = -1;
    let timeoutId = null;

    // Play/Pause button functionality
    playButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playButton.classList.remove('playing');
            isPlaying = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            currentLyricElement.classList.remove('show');
            currentLyricElement.classList.add('hide');
        } else {
            audio.play();
            playButton.classList.add('playing');
            isPlaying = true;
        }
    });

    // Lyrics synchronization with fade in/out
    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;

        let currentLyric = null;
        let currentIndex = -1;
        let nextLyricTime = Infinity;
        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime >= lyrics[i].time) {
                currentLyric = lyrics[i];
                currentIndex = i;
                nextLyricTime = i < lyrics.length - 1 ? lyrics[i + 1].time : audio.duration || Infinity;
            } else {
                break;
            }
        }

        if (currentLyric && currentIndex !== lastLyricIndex) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }

            // Set lyric text and fade in
            currentLyricElement.textContent = currentLyric.text;
            currentLyricElement.classList.remove('hide');
            currentLyricElement.classList.add('show');

            // Calculate duration for the current lyric
            const lyricDuration = (nextLyricTime - currentTime) * 1000;
            const fadeOutDelay = lyricDuration - 500; // Start fade-out 500ms before next lyric

            // Schedule fade-out
            if (fadeOutDelay > 0) {
                timeoutId = setTimeout(() => {
                    currentLyricElement.classList.remove('show');
                    currentLyricElement.classList.add('hide');
                    timeoutId = null;
                }, fadeOutDelay);
            }

            lastLyricIndex = currentIndex;
        }

        // Clear lyrics after the last one
        if (currentTime >= lyrics[lyrics.length - 1].time && currentTime >= nextLyricTime) {
            currentLyricElement.textContent = '';
            currentLyricElement.classList.remove('show');
            currentLyricElement.classList.add('hide');
            lastLyricIndex = -1;
        }
    });

    // Reset on play
    audio.addEventListener('play', () => {
        lastLyricIndex = -1;
        currentLyricElement.textContent = '';
        currentLyricElement.classList.remove('show', 'hide');
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    });

    // Reset on audio end
    audio.addEventListener('ended', () => {
        playButton.classList.remove('playing');
        isPlaying = false;
        currentLyricElement.textContent = '';
        currentLyricElement.classList.remove('show', 'hide');
        lastLyricIndex = -1;
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    });

    // Initialize final message
    if (finalMessage) {
        finalMessage.style.opacity = '1';
        finalMessage.classList.remove('show');
    }

    // ========================================
    // STARS BACKGROUND
    // ========================================
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }

    // ========================================
    // FLOATING BUTTERFLIES WITH RANDOM MOVEMENT
    // ========================================
    function createButterfly() {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        butterfly.textContent = '🦋';
        butterfly.style.left = `${Math.random() * 100}vw`;
        butterfly.style.top = `${Math.random() * 100}vh`;
        const duration = Math.random() * 20 + 15;
        butterfly.style.animation = `float ${duration}s ease-in-out infinite`;
        butterfly.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(butterfly);
    }

    // Create 8 butterflies
    for (let i = 0; i < 8; i++) {
        createButterfly();
    }

    // ========================================
    // FLOATING HEARTS
    // ========================================
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        const duration = Math.random() * 10 + 10;
        heart.style.animation = `heartFloat ${duration}s linear`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }

    // Generate hearts continuously
    setInterval(createHeart, 1500);

    // Initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }

    // ========================================
    // BEAT REACTION EFFECT
    // ========================================
    function startBeatEffect() {
        setInterval(() => {
            if (isPlaying) {
                document.querySelectorAll('.butterfly').forEach(butterfly => {
                    butterfly.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        butterfly.style.transform = 'scale(1)';
                    }, 200);
                });
            }
        }, 2000);
    }

    setTimeout(startBeatEffect, 3000);
});