// ============================================
// СИСТЕМА МОНЕТ
// ============================================

const WORD_REWARD = 1;
const SYLLABLE_REWARD = 1;
const BUILD_WORD_REWARD = 1;

function updateWordCoinsDisplay() {
    const currentUser = getCurrentUser();
    const coinsAmountSpan = document.getElementById('coinsAmount');
    if (currentUser && coinsAmountSpan) {
        coinsAmountSpan.textContent = getUserWordCoins(currentUser.username);
    } else if (coinsAmountSpan) {
        coinsAmountSpan.textContent = '0';
    }
}

function updateSyllableCoinsDisplay() {
    const currentUser = getCurrentUser();
    const syllableCoinsAmount = document.getElementById('syllableCoinsAmount');
    if (currentUser && syllableCoinsAmount) {
        syllableCoinsAmount.textContent = getUserSyllableCoins(currentUser.username);
    } else if (syllableCoinsAmount) {
        syllableCoinsAmount.textContent = '0';
    }
}

function updateBuildWordCoinsDisplay() {
    const currentUser = getCurrentUser();
    const buildWordCoinsAmount = document.getElementById('buildWordCoinsAmount');
    if (currentUser && buildWordCoinsAmount) {
        buildWordCoinsAmount.textContent = getUserBuildWordCoins(currentUser.username);
    } else if (buildWordCoinsAmount) {
        buildWordCoinsAmount.textContent = '0';
    }
}

function updateAllCoinsDisplay() {
    updateWordCoinsDisplay();
    updateSyllableCoinsDisplay();
    updateBuildWordCoinsDisplay();
    // Обновляем лидеров после изменения монет
    if (typeof refreshLeaders === 'function') refreshLeaders();
}

function addWordCoinsToCurrentUser(amount) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const result = addWordCoins(currentUser.username, amount);
    if (result.success) {
        updateWordCoinsDisplay();
        const coinsCounter = document.getElementById('coinsCounter');
        if (coinsCounter) {
            coinsCounter.classList.add('coin-gain');
            setTimeout(() => coinsCounter.classList.remove('coin-gain'), 300);
        }
        if (typeof refreshLeaders === 'function') refreshLeaders();
        return true;
    }
    return false;
}

function addSyllableCoinsToCurrentUser(amount) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const result = addSyllableCoins(currentUser.username, amount);
    if (result.success) {
        updateSyllableCoinsDisplay();
        const syllableCoinsCounter = document.getElementById('syllableCoinsCounter');
        if (syllableCoinsCounter) {
            syllableCoinsCounter.classList.add('coin-gain');
            setTimeout(() => syllableCoinsCounter.classList.remove('coin-gain'), 300);
        }
        if (typeof refreshLeaders === 'function') refreshLeaders();
        return true;
    }
    return false;
}

console.log("💰 Coins загружены");