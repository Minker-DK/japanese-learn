// ============================================
// ТЕМЫ СЛОВ
// ============================================

const THEMES = {
    all: { name: "Все слова", icon: "🎲", filter: () => true },
    greeting: { name: "Приветствия", icon: "👋", filter: (w) => w.category === "greeting" },
    basic: { name: "Базовые слова", icon: "📖", filter: (w) => w.category === "basic" || w.category === "pronoun" || w.category === "question" },
    verb: { name: "Глаголы", icon: "🏃", filter: (w) => w.category === "verb" },
    adjective: { name: "Прилагательные", icon: "🎨", filter: (w) => w.category === "adjective" },
    color: { name: "Цвета", icon: "🌈", filter: (w) => w.category === "color" },
    animal: { name: "Животные", icon: "🐕", filter: (w) => w.category === "animal" },
    nature: { name: "Природа", icon: "🌿", filter: (w) => w.category === "nature" },
    food: { name: "Еда", icon: "🍣", filter: (w) => w.category === "food" || w.category === "drink" },
    place: { name: "Места", icon: "🏠", filter: (w) => w.category === "place" },
    transport: { name: "Транспорт", icon: "🚗", filter: (w) => w.category === "transport" },
    technology: { name: "Технологии", icon: "💻", filter: (w) => w.category === "technology" },
    clothes: { name: "Одежда", icon: "👕", filter: (w) => w.category === "clothes" },
    family: { name: "Семья", icon: "👨‍👩‍👧", filter: (w) => w.category === "family" },
    time: { name: "Время", icon: "⏰", filter: (w) => w.category === "time" },
    body: { name: "Тело", icon: "🦵", filter: (w) => w.category === "body" },
    adverb: { name: "Наречия", icon: "🎯", filter: (w) => w.category === "adverb" }
};

let currentTheme = "all";
let currentWordsPool = [];

function getWordsByCurrentTheme() {
    const theme = THEMES[currentTheme];
    if (!theme) return [...WORDS_DATABASE];
    const filtered = WORDS_DATABASE.filter(theme.filter);
    return filtered.length > 0 ? filtered : [...WORDS_DATABASE];
}

function updateWordsPool() {
    currentWordsPool = getWordsByCurrentTheme();
    console.log(`📚 Тема "${THEMES[currentTheme].name}": ${currentWordsPool.length} слов`);
    return currentWordsPool;
}

function getRandomWordByTheme() {
    if (!currentWordsPool || currentWordsPool.length === 0) updateWordsPool();
    if (currentWordsPool.length === 0) currentWordsPool = [...WORDS_DATABASE];
    const randomIndex = Math.floor(Math.random() * currentWordsPool.length);
    return { ...currentWordsPool[randomIndex] };
}

function setTheme(themeId) {
    if (THEMES[themeId]) {
        currentTheme = themeId;
        updateWordsPool();
        updateCurrentThemeDisplay();
        renderWordThemesGrid();
        return true;
    }
    return false;
}

function getThemeWordCount(themeId) {
    const theme = THEMES[themeId];
    if (!theme) return 0;
    return WORDS_DATABASE.filter(theme.filter).length;
}

function updateCurrentThemeDisplay() {
    const themeElement = document.getElementById('currentTheme');
    const selectedThemeName = document.getElementById('selectedThemeName');
    if (themeElement && THEMES[currentTheme]) {
        themeElement.textContent = `${THEMES[currentTheme].icon} ${THEMES[currentTheme].name}`;
    }
    if (selectedThemeName && THEMES[currentTheme]) {
        selectedThemeName.textContent = THEMES[currentTheme].name;
    }
}

function renderWordThemesGrid() {
    const grid = document.getElementById('wordThemesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    for (const [id, theme] of Object.entries(THEMES)) {
        const count = getThemeWordCount(id);
        const card = document.createElement('div');
        card.className = 'theme-card';
        if (currentTheme === id) card.classList.add('selected');
        card.innerHTML = `
            <div class="theme-icon">${theme.icon}</div>
            <div class="theme-name">${theme.name}</div>
            <div class="theme-count">${count} слов</div>
        `;
        card.addEventListener('click', () => {
            setTheme(id);
        });
        grid.appendChild(card);
    }
}

function initThemes() {
    updateWordsPool();
    updateCurrentThemeDisplay();
    renderWordThemesGrid();
}

console.log("📚 Themes загружены");