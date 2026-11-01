const quotes = [
    "The future belongs to those who believe in the beauty of their dreams and work diligently every single day to bring them into reality.",
    "DOM manipulation is the bridge between static markup and dynamic, interactive web experiences that engage users across the globe.",
    "Simplicity is prerequisite for reliability, and writing clean, maintainable code is the hallmark of a thoughtful software developer."
];

// DOM Elements
const quoteContainer = document.getElementById('quote-container');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const mistakesDisplay = document.getElementById('mistakes');
const restartBtn = document.getElementById('restart-btn');

// State Variables
const MAX_TIME = 60;
let timeLeft = MAX_TIME;
let timer = null;
let isPlaying = false;
let charIndex = 0;
let mistakes = 0;
let totalTyped = 0;
let charSpans = [];

// Initialize Quote in DOM
function loadQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteContainer.innerHTML = '';
    
    // Split quote into characters and wrap in spans
    charSpans = randomQuote.split('').char = randomQuote.split('').map(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteContainer.appendChild(span);
        return span;
    });

    // Set initial active cursor state
    if (charSpans.length > 0) {
        charSpans[0].classList.add('active');
    }
}

// Start Timer
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.innerText = `${timeLeft}s`;
            calculateTelemetry();
        } else {
            clearInterval(timer);
            isPlaying = false;
        }
    }, 1000);
}

// Handle Keydown Event
function handleKeydown(e) {
    // Focus quote container if not focused
    if (document.activeElement !== quoteContainer) return;

    // Ignore special modifier keys
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'CapsLock') {
        return;
    }

    // Handle Backspace
    if (e.key === 'Backspace') {
        if (charIndex > 0) {
            charIndex--;
            totalTyped++;
            
            // Remove active class from current, reset previous span
            charSpans[charIndex + 1].classList.remove('active');
            charSpans[charIndex].classList.remove('correct', 'incorrect');
            charSpans[charIndex].classList.add('active');
        }
        return;
    }

    // Stop typing if test time is up or quote is completed
    if (timeLeft === 0 || charIndex >= charSpans.length) return;

    // Start timer on the very first keystroke
    if (!isPlaying) {
        isPlaying = true;
        startTimer();
    }

    const expectedChar = charSpans[charIndex].innerText;
    totalTyped++;

    // Remove current active indicator
    charSpans[charIndex].classList.remove('active');

    if (e.key === expectedChar) {
        charSpans[charIndex].classList.add('correct');
    } else {
        charSpans[charIndex].classList.add('incorrect');
        mistakes++;
    }

    charIndex++;

    // Advance active state or finish test
    if (charIndex < charSpans.length) {
        charSpans[charIndex].classList.add('active');
    } else {
        // Test completed early
        clearInterval(timer);
        isPlaying = false;
    }

    calculateTelemetry();
}

// Calculate Metrics (WPM & Accuracy)
function calculateTelemetry() {
    const timeElapsedMinutes = (MAX_TIME - timeLeft) / 60;
    
    // Count current correct characters
    let correctChars = 0;
    charSpans.forEach(span => {
        if (span.classList.contains('correct')) correctChars++;
    });

    // Net WPM Formula: (Correct Characters / 5) / Time in Minutes
    let wpm = 0;
    if (timeElapsedMinutes > 0) {
        wpm = Math.round((correctChars / 5) / timeElapsedMinutes);
    }

    // Accuracy Formula: (Correct Characters / Total Keystrokes) * 100
    let accuracy = 100;
    if (totalTyped > 0) {
        accuracy = Math.max(0, Math.round((correctChars / totalTyped) * 100));
    }

    // Update UI
    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = `${accuracy}%`;
    mistakesDisplay.innerText = mistakes;
}

// Reset / Restart Test
function resetTest() {
    clearInterval(timer); // Crucial: clear existing interval to prevent runaway intervals!
    timer = null;
    isPlaying = false;
    timeLeft = MAX_TIME;
    charIndex = 0;
    mistakes = 0;
    totalTyped = 0;

    timerDisplay.innerText = `${MAX_TIME}s`;
    wpmDisplay.innerText = '0';
    accuracyDisplay.innerText = '100%';
    mistakesDisplay.innerText = '0';

    loadQuote();
    quoteContainer.focus();
}

// Event Listeners
window.addEventListener('load', () => {
    loadQuote();
    quoteContainer.focus();
});

quoteContainer.addEventListener('click', () => {
    quoteContainer.focus();
});

document.addEventListener('keydown', handleKeydown);
restartBtn.addEventListener('click', resetTest);