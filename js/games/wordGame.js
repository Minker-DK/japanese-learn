// ============================================
// ОСНОВНАЯ ИГРА (СЛОВА)
// ============================================

let currentWord = null;
let currentOptions = [];
let canAnswer = true;
let timeoutId = null;
let currentQuestionAnswered = false;

const japaneseWordElement = document.getElementById('japaneseWord');
const readingElement = document.getElementById('reading');
const optionsContainer = document.getElementById('optionsContainer');

function getRandomWrongMeaning(correctMeaning) {
    let wordsPool = WORDS_DATABASE;
    if (typeof currentWordsPool !== 'undefined' && currentWordsPool && currentWordsPool.length > 0) {
        wordsPool = currentWordsPool;
    }
    
    const wrongMeanings = wordsPool
        .filter(w => w.meaning !== correctMeaning)
        .map(w => w.meaning);
    const uniqueWrong = getUniqueValues(wrongMeanings);
    
    if (uniqueWrong.length === 0) return "Другое значение";
    return uniqueWrong[Math.floor(Math.random() * uniqueWrong.length)];
}

function generateOptions(correctMeaning) {
    const options = [correctMeaning];
    while (options.length < 4) {
        const wrongMeaning = getRandomWrongMeaning(correctMeaning);
        if (!options.includes(wrongMeaning)) options.push(wrongMeaning);
    }
    return shuffleArray(options);
}

function getRandomWordFromDB() {
    if (!WORDS_DATABASE || WORDS_DATABASE.length === 0) {
        return { japanese: "ことば", reading: "kotoba", meaning: "Слово" };
    }
    
    if (typeof getRandomWordByTheme === 'function') {
        const word = getRandomWordByTheme();
        if (word && word.japanese && word.meaning) return word;
    }
    
    const randomIndex = Math.floor(Math.random() * WORDS_DATABASE.length);
    return { ...WORDS_DATABASE[randomIndex] };
}

function hideReading() {
    if (readingElement) {
        readingElement.classList.remove('visible');
        readingElement.textContent = '';
    }
}

function showReading(reading) {
    if (readingElement && reading) {
        readingElement.textContent = reading;
        readingElement.classList.add('visible');
    }
}

function loadNewQuestion() {
    if (timeoutId) clearTimeout(timeoutId);
    canAnswer = true;
    currentQuestionAnswered = false;
    hideReading();
    
    currentWord = getRandomWordFromDB();
    
    if (japaneseWordElement && currentWord && currentWord.japanese) {
        japaneseWordElement.textContent = currentWord.japanese;
        japaneseWordElement.classList.remove('hiragana-mode', 'katakana-mode');
        japaneseWordElement.classList.add(`${getScriptType(currentWord.japanese)}-mode`);
    }
    
    currentOptions = currentWord && currentWord.meaning 
        ? generateOptions(currentWord.meaning)
        : ["Значение 1", "Значение 2", "Значение 3", "Значение 4"];
    
    const buttons = document.querySelectorAll('#optionsContainer .option-btn');
    buttons.forEach((btn, i) => {
        if (i < currentOptions.length) {
            btn.textContent = currentOptions[i];
            btn.classList.remove('correct', 'wrong', 'disabled');
            btn.disabled = false;
        }
    });
}

function checkAnswer(button, selectedMeaning) {
    if (!canAnswer || currentQuestionAnswered) return;
    if (!currentWord || !currentWord.meaning) return;
    
    const isCorrect = selectedMeaning === currentWord.meaning;
    canAnswer = false;
    currentQuestionAnswered = true;
    
    if (currentWord.reading) showReading(currentWord.reading);
    button.classList.add(isCorrect ? 'correct' : 'wrong');
    
    // ИСПРАВЛЕНО: используем глобальную функцию
    if (isCorrect && typeof window.addWordCoinsToCurrentUser === 'function') {
        window.addWordCoinsToCurrentUser(1);
    } else if (isCorrect) {
        console.log("💰 Должно быть начислена 1 монета за слово, но функция не найдена");
    }
    
    if (!isCorrect) {
        document.querySelectorAll('#optionsContainer .option-btn').forEach(btn => {
            if (btn.textContent === currentWord.meaning) btn.classList.add('correct');
        });
    }
    
    document.querySelectorAll('#optionsContainer .option-btn').forEach(btn => {
        btn.classList.add('disabled');
        btn.disabled = true;
    });
    
    timeoutId = setTimeout(loadNewQuestion, 2000);
}

if (optionsContainer) {
    optionsContainer.addEventListener('click', (event) => {
        const btn = event.target.closest('.option-btn');
        if (btn && !btn.disabled && canAnswer) checkAnswer(btn, btn.textContent);
    });
}

console.log("🎮 WordGame загружена");
