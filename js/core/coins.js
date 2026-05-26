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

function updatePanelCoinsDisplay() {
    const currentUser = getCurrentUser();
    const panelWordCoins = document.getElementById('panelWordCoins');
    const panelSyllableCoins = document.getElementById('panelSyllableCoins');
    const panelBuildCoins = document.getElementById('panelBuildCoins');
    
    if (currentUser) {
        if (panelWordCoins) panelWordCoins.textContent = getUserWordCoins(currentUser.username);
        if (panelSyllableCoins) panelSyllableCoins.textContent = getUserSyllableCoins(currentUser.username);
        if (panelBuildCoins) panelBuildCoins.textContent = getUserBuildWordCoins(currentUser.username);
        console.log("💰 Панель монет обновлена");
    }
}

function updateAllCoinsDisplay() {
    updateWordCoinsDisplay();
    updateSyllableCoinsDisplay();
    updateBuildWordCoinsDisplay();
    updatePanelCoinsDisplay();
    if (typeof refreshLeaders === 'function') refreshLeaders();
}

function addWordCoinsToCurrentUser(amount) {
    console.log("💰 addWordCoinsToCurrentUser вызвана, amount:", amount);
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.log("Пользователь не авторизован");
        return false;
    }
    
    const result = addWordCoins(currentUser.username, amount);
    if (result.success) {
        updateWordCoinsDisplay();
        updatePanelCoinsDisplay();
        const coinsCounter = document.getElementById('coinsCounter');
        if (coinsCounter) {
            coinsCounter.classList.add('coin-gain');
            setTimeout(() => coinsCounter.classList.remove('coin-gain'), 300);
        }
        if (typeof refreshLeaders === 'function') refreshLeaders();
        console.log(`✅ Начислено ${amount} монет за слово. Всего: ${result.newCoins}`);
        return true;
    }
    return false;
}

function addSyllableCoinsToCurrentUser(amount) {
    console.log("💰 addSyllableCoinsToCurrentUser вызвана, amount:", amount);
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.log("Пользователь не авторизован");
        return false;
    }
    
    const result = addSyllableCoins(currentUser.username, amount);
    if (result.success) {
        updateSyllableCoinsDisplay();
        updatePanelCoinsDisplay();
        const syllableCoinsCounter = document.getElementById('syllableCoinsCounter');
        if (syllableCoinsCounter) {
            syllableCoinsCounter.classList.add('coin-gain');
            setTimeout(() => syllableCoinsCounter.classList.remove('coin-gain'), 300);
        }
        if (typeof refreshLeaders === 'function') refreshLeaders();
        console.log(`✅ Начислено ${amount} монет за слог. Всего: ${result.newCoins}`);
        return true;
    }
    return false;
}

function addBuildWordCoinsToCurrentUser(amount) {
    console.log("💰 addBuildWordCoinsToCurrentUser вызвана, amount:", amount);
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.log("Пользователь не авторизован");
        return false;
    }
    
    const result = addBuildWordCoins(currentUser.username, amount);
    if (result.success) {
        updateBuildWordCoinsDisplay();
        updatePanelCoinsDisplay();
        const buildWordCoinsCounter = document.getElementById('buildWordCoinsCounter');
        if (buildWordCoinsCounter) {
            buildWordCoinsCounter.classList.add('coin-gain');
            setTimeout(() => buildWordCoinsCounter.classList.remove('coin-gain'), 300);
        }
        if (typeof refreshLeaders === 'function') refreshLeaders();
        console.log(`✅ Начислено ${amount} монет за составление слова. Всего: ${result.newCoins}`);
        return true;
    }
    return false;
}

// Глобальный экспорт
window.addWordCoinsToCurrentUser = addWordCoinsToCurrentUser;
window.addSyllableCoinsToCurrentUser = addSyllableCoinsToCurrentUser;
window.addBuildWordCoinsToCurrentUser = addBuildWordCoinsToCurrentUser;
window.updatePanelCoinsDisplay = updatePanelCoinsDisplay;
window.updateAllCoinsDisplay = updateAllCoinsDisplay;

console.log("💰 Coins загружены, функции добавлены в window");
