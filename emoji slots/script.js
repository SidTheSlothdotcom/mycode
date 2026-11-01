const emojis = ['🍒', '🍋', '🍇', '💎', '⭐', '🔔'];

let score = 100;
const spinCost = 10;
const jackpotReward = 100;

const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const spinBtn = document.getElementById('spinBtn');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function spinSlots() {
    if (score < spinCost) {
        messageEl.textContent = "Game Over! Not enough points.";
        spinBtn.disabled = true;
        return;
    }

    // Deduct cost and update display immediately
    score -= spinCost;
    scoreEl.textContent = score;

    // Disable button to prevent double-click glitches
    spinBtn.disabled = true;
    messageEl.textContent = "Rolling...";

    // Add rolling blur effect class
    reel1.classList.add('rolling');
    reel2.classList.add('rolling');
    reel3.classList.add('rolling');

    // Start rapid cycling using setInterval
    const intervalTime = 50;
    const rollInterval = setInterval(() => {
        reel1.textContent = getRandomEmoji();
        reel2.textContent = getRandomEmoji();
        reel3.textContent = getRandomEmoji();
    }, intervalTime);

    // Stop rolling after 2 seconds using setTimeout
    setTimeout(() => {
        clearInterval(rollInterval);

        // Land final random emojis
        const final1 = getRandomEmoji();
        const final2 = getRandomEmoji();
        const final3 = getRandomEmoji();

        reel1.textContent = final1;
        reel2.textContent = final2;
        reel3.textContent = final3;

        // Remove rolling blur effect class
        reel1.classList.remove('rolling');
        reel2.classList.remove('rolling');
        reel3.classList.remove('rolling');

        // Evaluate conditional logic for matches
        if (final1 === final2 && final2 === final3) {
            score += jackpotReward;
            messageEl.textContent = `🎉 JACKPOT! +${jackpotReward} Points! 🎉`;
        } else {
            messageEl.textContent = "No match. Try again!";
        }

        scoreEl.textContent = score;

        // Re-enable button if player still has enough points
        if (score >= spinCost) {
            spinBtn.disabled = false;
        } else {
            messageEl.textContent = "Out of points! Game Over.";
            spinBtn.disabled = true;
        }

    }, 2000);
}