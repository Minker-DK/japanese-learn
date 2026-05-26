// ============================================
// НАВИГАЦИЯ МЕЖДУ ИГРАМИ
// ============================================

// ----- ОСНОВНАЯ ИГРА (СЛОВА) -----

function showWordThemeMenu() {
    console.log("showWordThemeMenu вызвана");
    
    const wordThemeMenu = document.getElementById('wordThemeMenu');
    const gameContainer = document.getElementById('gameContainer');
    const syllableContainer = document.getElementById('syllableContainer');
    const modeMenu = document.getElementById('modeMenu');
    const buildWordContainer = document.getElementById('buildWordContainer');
    const mainGameBtn = document.getElementById('mainGameBtn');
    const syllableGameBtn = document.getElementById('syllableGameBtn');
    const buildWordGameBtn = document.getElementById('buildWordGameBtn');
    
    if (wordThemeMenu) wordThemeMenu.style.display = 'block';
    if (gameContainer) gameContainer.style.display = 'none';
    if (syllableContainer) syllableContainer.style.display = 'none';
    if (modeMenu) modeMenu.style.display = 'none';
    if (buildWordContainer) buildWordContainer.style.display = 'none';
    if (mainGameBtn) mainGameBtn.classList.add('active');
    if (syllableGameBtn) syllableGameBtn.classList.remove('active');
    if (buildWordGameBtn) buildWordGameBtn.classList.remove('active');
    
    if (typeof renderWordThemesGrid === 'function') renderWordThemesGrid();
}

function startWordGame() {
    console.log("startWordGame вызвана");
    
    const wordThemeMenu = document.getElementById('wordThemeMenu');
    const gameContainer = document.getElementById('gameContainer');
    const mainGameBtn = document.getElementById('mainGameBtn');
    const syllableGameBtn = document.getElementById('syllableGameBtn');
    const buildWordGameBtn = document.getElementById('buildWordGameBtn');
    
    if (wordThemeMenu) wordThemeMenu.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'block';
    if (mainGameBtn) mainGameBtn.classList.add('active');
    if (syllableGameBtn) syllableGameBtn.classList.remove('active');
    if (buildWordGameBtn) buildWordGameBtn.classList.remove('active');
    
    if (typeof updateCurrentThemeDisplay === 'function') updateCurrentThemeDisplay();
    if (typeof loadNewQuestion === 'function') loadNewQuestion();
}

// ----- ИГРА "УГАДАЙ СЛОГ" -----

function showSyllableModeMenu() {
    console.log("showSyllableModeMenu вызвана");
    
    const wordThemeMenu = document.getElementById('wordThemeMenu');
    const gameContainer = document.getElementById('gameContainer');
    const syllableContainer = document.getElementById('syllableContainer');
    const modeMenu = document.getElementById('modeMenu');
    const buildWordContainer = document.getElementById('buildWordContainer');
    const mainGameBtn = document.getElementById('mainGameBtn');
    const syllableGameBtn = document.getElementById('syllableGameBtn');
    const buildWordGameBtn = document.getElementById('buildWordGameBtn');
    
    if (wordThemeMenu) wordThemeMenu.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'none';
    if (syllableContainer) syllableContainer.style.display = 'none';
    if (modeMenu) modeMenu.style.display = 'block';
    if (buildWordContainer) buildWordContainer.style.display = 'none';
    if (mainGameBtn) mainGameBtn.classList.remove('active');
    if (syllableGameBtn) syllableGameBtn.classList.add('active');
    if (buildWordGameBtn) buildWordGameBtn.classList.remove('active');
}

function startSyllableGame(mode) {
    console.log("startSyllableGame вызвана, mode:", mode);
    
    if (typeof setSyllableMode === 'function') {
        if (mode === 'all') setSyllableMode('all');
        else if (mode === 'hiragana') setSyllableMode('hiragana');
        else if (mode === 'katakana') setSyllableMode('katakana');
    }
    
    const modeMenu = document.getElementById('modeMenu');
    const syllableContainer = document.getElementById('syllableContainer');
    const wordThemeMenu = document.getElementById('wordThemeMenu');
    const gameContainer = document.getElementById('gameContainer');
    const buildWordContainer = document.getElementById('buildWordContainer');
    
    if (modeMenu) modeMenu.style.display = 'none';
    if (syllableContainer) syllableContainer.style.display = 'block';
    if (wordThemeMenu) wordThemeMenu.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'none';
    if (buildWordContainer) buildWordContainer.style.display = 'none';
    
    if (typeof loadNewSyllableQuestion === 'function') loadNewSyllableQuestion();
}

function closeModeMenu() {
    const modeMenu = document.getElementById('modeMenu');
    const wordThemeMenu = document.getElementById('wordThemeMenu');
    const mainGameBtn = document.getElementById('mainGameBtn');
    const syllableGameBtn = document.getElementById('syllableGameBtn');
    const buildWordGameBtn = document.getElementById('buildWordGameBtn');
    
    if (modeMenu) modeMenu.style.display = 'none';
    if (wordThemeMenu) wordThemeMenu.style.display = 'block';
    if (mainGameBtn) mainGameBtn.classList.add('active');
    if (syllableGameBtn) syllableGameBtn.classList.remove('active');
    if (buildWordGameBtn) buildWordGameBtn.classList.remove('active');
    
    if (typeof renderWordThemesGrid === 'function') renderWordThemesGrid();
}

// ----- ИНИЦИАЛИЗАЦИЯ -----

function initNavigation() {
    console.log("initNavigation вызвана");
    
    const mainGameBtn = document.getElementById('mainGameBtn');
    const syllableGameBtn = document.getElementById('syllableGameBtn');
    const buildWordGameBtn = document.getElementById('buildWordGameBtn');
    const startWordGameBtn = document.getElementById('startWordGameBtn');
    const modeAllBtn = document.getElementById('modeAllBtn');
    const modeHiraganaBtn = document.getElementById('modeHiraganaBtn');
    const modeKatakanaBtn = document.getElementById('modeKatakanaBtn');
    const closeModeMenuBtn = document.getElementById('closeModeMenu');
    // backToSyllableModeMenu - УДАЛЕН, больше не используем
    
    // Основная игра
    if (mainGameBtn) {
        mainGameBtn.onclick = function(e) {
            e.preventDefault();
            showWordThemeMenu();
        };
    }
    
    // Угадай слог
    if (syllableGameBtn) {
        syllableGameBtn.onclick = function(e) {
            e.preventDefault();
            showSyllableModeMenu();
        };
    }
    
    // Составь слово
    if (buildWordGameBtn) {
        buildWordGameBtn.onclick = function(e) {
            e.preventDefault();
            if (typeof window.showBuildWordContainer === 'function') {
                window.showBuildWordContainer();
            } else {
                console.error("showBuildWordContainer не определена!");
            }
        };
    }
    
    if (startWordGameBtn) {
        startWordGameBtn.onclick = function(e) {
            e.preventDefault();
            startWordGame();
        };
    }
    
    if (modeAllBtn) modeAllBtn.onclick = () => startSyllableGame('all');
    if (modeHiraganaBtn) modeHiraganaBtn.onclick = () => startSyllableGame('hiragana');
    if (modeKatakanaBtn) modeKatakanaBtn.onclick = () => startSyllableGame('katakana');
    if (closeModeMenuBtn) closeModeMenuBtn.onclick = closeModeMenu;
    
    console.log("🧭 Navigation загружена");
}

// Гарантируем глобальность функций
window.showWordThemeMenu = showWordThemeMenu;
window.startWordGame = startWordGame;
window.showSyllableModeMenu = showSyllableModeMenu;
window.startSyllableGame = startSyllableGame;
window.closeModeMenu = closeModeMenu;
window.initNavigation = initNavigation;