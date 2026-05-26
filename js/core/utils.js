// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

// Определение азбуки (хирагана/катакана)
function getScriptType(text) {
    if (!text) return 'hiragana';
    return /[\u30A0-\u30FF]/.test(text) ? 'katakana' : 'hiragana';
}

// Перемешивание массива
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Задержка
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Получить уникальные значения из массива
function getUniqueValues(arr) {
    return [...new Set(arr)];
}

console.log("🛠 Utils загружены");