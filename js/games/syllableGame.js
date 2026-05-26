// ============================================
// ИГРА "УГАДАЙ СЛОГ"
// ============================================

let currentSyllable = null;
let currentSyllableOptions = [];
let syllableCanAnswer = true;
let syllableTimeoutId = null;
let currentSyllableMode = 'all';

const syllableCharElement = document.getElementById('syllableChar');
const syllableOptionsContainer = document.getElementById('syllableOptionsContainer');

function getCurrentSyllableDatabase() {
    if (currentSyllableMode === 'hiragana') return HIRAGANA_DATABASE;
    if (currentSyllableMode === 'katakana') return KATAKANA_DATABASE;
    return [...HIRAGANA_DATABASE, ...KATAKANA_DATABASE];
}

function getRandomSyllable() {
    const database = getCurrentSyllableDatabase();
    if (!database || database.length === 0) return { japanese: "あ", romanji: "a" };
    const randomIndex = Math.floor(Math.random() * database.length);
    return { ...database[randomIndex] };
}

function getRandomWrongRomanji(correctRomanji) {
    const database = getCurrentSyllableDatabase();
    const wrongRomanji = database
        .filter(s => s.romanji !== correctRomanji)
        .map(s => s.romanji);
    const uniqueWrong = getUniqueValues(wrongRomanji);
    if (uniqueWrong.length === 0) return "a";
    return uniqueWrong[Math.floor(Math.random() * uniqueWrong.length)];
}

function generateSyllableOptions(correctRomanji) {
    const options = [correctRomanji];
    while (options.length < 4) {
        const wrongRomanji = getRandomWrongRomanji(correctRomanji);
        if (!options.includes(wrongRomanji)) options.push(wrongRomanji);
    }
    return shuffleArray(options);
}

function loadNewSyllableQuestion() {
    if (syllableTimeoutId) clearTimeout(syllableTimeoutId);
    syllableCanAnswer = true;
    
    currentSyllable = getRandomSyllable();
    
    if (syllableCharElement && currentSyllable) {
        syllableCharElement.textContent = currentSyllable.japanese;
    }
    
    currentSyllableOptions = currentSyllable && currentSyllable.romanji
        ? generateSyllableOptions(currentSyllable.romanji)
        : ["a", "i", "u", "e"];
    
    const buttons = document.querySelectorAll('#syllableOptionsContainer .option-btn');
    buttons.forEach((btn, i) => {
        if (i < currentSyllableOptions.length) {
            btn.textContent = currentSyllableOptions[i];
            btn.classList.remove('correct', 'wrong', 'disabled');
            btn.disabled = false;
        }
    });
}

function checkSyllableAnswer(button, selectedRomanji) {
    if (!syllableCanAnswer) return;
    if (!currentSyllable || !currentSyllable.romanji) return;
    
    const isCorrect = selectedRomanji === currentSyllable.romanji;
    syllableCanAnswer = false;
    button.classList.add(isCorrect ? 'correct' : 'wrong');
    
    // ИСПРАВЛЕНО: используем глобальную функцию
    if (isCorrect && typeof window.addSyllableCoinsToCurrentUser === 'function') {
        window.addSyllableCoinsToCurrentUser(1);
    } else if (isCorrect) {
        console.log("💰 Должно быть начислена 1 монета за слог, но функция не найдена");
    }
    
    if (!isCorrect) {
        document.querySelectorAll('#syllableOptionsContainer .option-btn').forEach(btn => {
            if (btn.textContent === currentSyllable.romanji) btn.classList.add('correct');
        });
    }
    
    document.querySelectorAll('#syllableOptionsContainer .option-btn').forEach(btn => {
        btn.classList.add('disabled');
        btn.disabled = true;
    });
    
    syllableTimeoutId = setTimeout(loadNewSyllableQuestion, 1000);
}

function setSyllableMode(mode) {
    currentSyllableMode = mode;
    
    const modeDisplay = document.getElementById('syllableModeDisplay');
    if (mode === 'all') {
        if (modeDisplay) modeDisplay.textContent = 'Все слоги';
    } else if (mode === 'hiragana') {
        if (modeDisplay) modeDisplay.textContent = 'ひらがな';
    } else if (mode === 'katakana') {
        if (modeDisplay) modeDisplay.textContent = 'カタカナ';
    }
}

function initSyllableGame() {
    // Обработчики для иконок в контейнере слогов
    const syllableUserIcon = document.getElementById('syllableUserIcon');
    const syllableAlphabetIcon = document.getElementById('syllableAlphabetIcon');
    const syllableLogoutBtn = document.getElementById('syllableLogoutBtn');
    
    if (syllableUserIcon) {
        syllableUserIcon.onclick = () => openAuthModal();
    }
    if (syllableAlphabetIcon) {
        syllableAlphabetIcon.onclick = () => openAlphabetModal();
    }
    if (syllableLogoutBtn) {
        syllableLogoutBtn.onclick = () => {
            logoutUser();
        };
    }
    
    // Обработчик кликов по кнопкам вариантов
    if (syllableOptionsContainer) {
        syllableOptionsContainer.addEventListener('click', (event) => {
            const btn = event.target.closest('.option-btn');
            if (btn && !btn.disabled && syllableCanAnswer) {
                checkSyllableAnswer(btn, btn.textContent);
            }
        });
    }
    
    console.log("🔤 SyllableGame загружена");
}

if (typeof module === 'undefined') {
    window.setSyllableMode = setSyllableMode;
    window.initSyllableGame = initSyllableGame;
    window.loadNewSyllableQuestion = loadNewSyllableQuestion;
}