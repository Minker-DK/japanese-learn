// ============================================
// ИГРА "СОСТАВЛЕНИЕ СЛОВ"
// ============================================

(function() {
    console.log("📝 Загрузка BuildWordGame...");
    
    let currentBuildWord = null;
    let currentBuildSlots = [];
    let currentSlotIndex = 0;
    let buildWordCanPlay = true;
    let buildWordTimeoutId = null;
    
    const BUILD_WORD_REWARD = 1;
    
    function updateBuildWordCoinsDisplay() {
        const currentUser = getCurrentUser();
        const buildWordCoinsAmount = document.getElementById('buildWordCoinsAmount');
        if (currentUser && buildWordCoinsAmount) {
            buildWordCoinsAmount.textContent = getUserBuildWordCoins(currentUser.username);
        } else if (buildWordCoinsAmount) {
            buildWordCoinsAmount.textContent = '0';
        }
    }
    
    function addBuildWordCoinsToCurrentUser(amount) {
        const currentUser = getCurrentUser();
        if (!currentUser) return false;
        
        if (typeof addBuildWordCoins === 'function') {
            const result = addBuildWordCoins(currentUser.username, amount);
            if (result.success) {
                updateBuildWordCoinsDisplay();
                if (typeof updatePanelCoinsDisplay === 'function') updatePanelCoinsDisplay();
                if (typeof refreshLeaders === 'function') refreshLeaders();
                
                const coinsCounter = document.getElementById('buildWordCoinsCounter');
                if (coinsCounter) {
                    coinsCounter.classList.add('coin-gain');
                    setTimeout(() => coinsCounter.classList.remove('coin-gain'), 300);
                }
                return true;
            }
        }
        return false;
    }
    
    function updateBuildWordAuthUI() {
        const currentUser = getCurrentUser();
        const buildWordUserIcon = document.getElementById('buildWordUserIcon');
        const buildWordUserInfo = document.getElementById('buildWordUserInfo');
        const buildWordUsernameDisplay = document.getElementById('buildWordUsernameDisplay');
        
        if (currentUser) {
            if (buildWordUserIcon) buildWordUserIcon.style.display = 'none';
            if (buildWordUserInfo) buildWordUserInfo.style.display = 'flex';
            if (buildWordUsernameDisplay) buildWordUsernameDisplay.textContent = currentUser.username;
        } else {
            if (buildWordUserIcon) buildWordUserIcon.style.display = 'flex';
            if (buildWordUserInfo) buildWordUserInfo.style.display = 'none';
        }
        updateBuildWordCoinsDisplay();
    }
    
    function renderBuildSlots() {
        const buildWordSlots = document.getElementById('buildWordSlots');
        if (!buildWordSlots) return;
        
        buildWordSlots.innerHTML = '';
        for (let i = 0; i < currentBuildWord.syllables.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'buildword-slot';
            if (currentBuildSlots[i]) {
                slot.textContent = currentBuildSlots[i];
                slot.classList.add('filled');
            } else {
                slot.textContent = '?';
                slot.classList.remove('filled');
            }
            if (i === currentSlotIndex && buildWordCanPlay) {
                slot.classList.add('active');
            }
            buildWordSlots.appendChild(slot);
        }
        
        const buildWordProgressCount = document.getElementById('buildWordProgressCount');
        if (buildWordProgressCount) {
            const filledCount = currentBuildSlots.filter(s => s !== '').length;
            buildWordProgressCount.textContent = filledCount;
        }
    }
    
    function generateBuildButtons() {
        const buildWordButtons = document.getElementById('buildWordButtons');
        if (!buildWordButtons) return;
        
        const currentSyllable = currentBuildWord.syllables[currentSlotIndex];
        if (!currentSyllable) return;
        
        const wrongOptions = [];
        if (typeof BUILD_WORDS_DATABASE !== 'undefined') {
            for (const word of BUILD_WORDS_DATABASE) {
                for (const syllable of word.syllables) {
                    if (syllable !== currentSyllable && !wrongOptions.includes(syllable)) {
                        wrongOptions.push(syllable);
                    }
                    if (wrongOptions.length >= 3) break;
                }
                if (wrongOptions.length >= 3) break;
            }
        }
        
        const fallbackOptions = ["あ", "い", "う", "え", "お", "か", "き", "く"];
        while (wrongOptions.length < 3) {
            for (const fb of fallbackOptions) {
                if (fb !== currentSyllable && !wrongOptions.includes(fb)) {
                    wrongOptions.push(fb);
                    if (wrongOptions.length >= 3) break;
                }
            }
        }
        
        const options = [currentSyllable, ...wrongOptions.slice(0, 3)];
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        buildWordButtons.innerHTML = '';
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'buildword-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => checkBuildAnswer(btn, option));
            buildWordButtons.appendChild(btn);
        });
    }
    
    function checkBuildAnswer(button, selectedSyllable) {
        if (!buildWordCanPlay) return;
        
        const correctSyllable = currentBuildWord.syllables[currentSlotIndex];
        const isCorrect = selectedSyllable === correctSyllable;
        
        if (isCorrect) {
            button.classList.add('correct');
            currentBuildSlots[currentSlotIndex] = selectedSyllable;
            currentSlotIndex++;
            renderBuildSlots();
            
            if (currentSlotIndex >= currentBuildWord.syllables.length) {
                buildWordCanPlay = false;
                addBuildWordCoinsToCurrentUser(BUILD_WORD_REWARD);
                
                document.querySelectorAll('.buildword-btn').forEach(btn => {
                    btn.disabled = true;
                    btn.classList.add('disabled');
                });
                
                buildWordTimeoutId = setTimeout(() => {
                    loadNewBuildWord();
                }, 800);
            } else {
                generateBuildButtons();
                setTimeout(() => {
                    document.querySelectorAll('.buildword-btn').forEach(btn => {
                        btn.classList.remove('correct', 'wrong');
                    });
                }, 300);
            }
        } else {
            button.classList.add('wrong');
            buildWordCanPlay = false;
            
            for (let i = currentSlotIndex; i < currentBuildWord.syllables.length; i++) {
                currentBuildSlots[i] = currentBuildWord.syllables[i];
            }
            renderBuildSlots();
            
            document.querySelectorAll('.buildword-btn').forEach(btn => {
                btn.disabled = true;
                btn.classList.add('disabled');
            });
            
            const buildWordButtons = document.getElementById('buildWordButtons');
            const message = document.createElement('div');
            message.className = 'buildword-message error';
            message.textContent = `❌ Неправильно! Правильное слово: ${currentBuildWord.japanese}`;
            buildWordButtons.parentNode.insertBefore(message, buildWordButtons);
            
            buildWordTimeoutId = setTimeout(() => {
                const oldMessage = document.querySelector('.buildword-message');
                if (oldMessage) oldMessage.remove();
                loadNewBuildWord();
            }, 2000);
        }
    }
    
    function loadNewBuildWord() {
        if (buildWordTimeoutId) clearTimeout(buildWordTimeoutId);
        buildWordCanPlay = true;
        
        const oldMessage = document.querySelector('.buildword-message');
        if (oldMessage) oldMessage.remove();
        
        if (typeof BUILD_WORDS_DATABASE === 'undefined' || BUILD_WORDS_DATABASE.length === 0) {
            console.error("BUILD_WORDS_DATABASE не загружен!");
            return;
        }
        
        currentBuildWord = getRandomBuildWord();
        currentBuildSlots = new Array(currentBuildWord.syllables.length).fill('');
        currentSlotIndex = 0;
        
        const buildWordRussian = document.getElementById('buildWordRussian');
        const buildWordTotalCount = document.getElementById('buildWordTotalCount');
        
        if (buildWordRussian) buildWordRussian.textContent = currentBuildWord.russian;
        if (buildWordTotalCount) buildWordTotalCount.textContent = currentBuildWord.syllables.length;
        
        renderBuildSlots();
        generateBuildButtons();
    }
    
    function resetBuildWordGame() {
        if (buildWordTimeoutId) clearTimeout(buildWordTimeoutId);
        loadNewBuildWord();
    }
    
    function showBuildWordContainer() {
        console.log("showBuildWordContainer вызвана");
        
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
        if (modeMenu) modeMenu.style.display = 'none';
        if (buildWordContainer) buildWordContainer.style.display = 'block';
        if (mainGameBtn) mainGameBtn.classList.remove('active');
        if (syllableGameBtn) syllableGameBtn.classList.remove('active');
        if (buildWordGameBtn) buildWordGameBtn.classList.add('active');
        
        updateBuildWordAuthUI();
        loadNewBuildWord();
    }
    
    window.showBuildWordContainer = showBuildWordContainer;
    window.updateBuildWordCoinsDisplay = updateBuildWordCoinsDisplay;
    window.resetBuildWordGame = resetBuildWordGame;
    window.loadNewBuildWord = loadNewBuildWord;
    window.updateBuildWordAuthUI = updateBuildWordAuthUI;
    
    function initBuildWordHandlers() {
        const buildWordUserIcon = document.getElementById('buildWordUserIcon');
        const buildWordAlphabetIcon = document.getElementById('buildWordAlphabetIcon');
        const buildWordLogoutBtn = document.getElementById('buildWordLogoutBtn');
        const resetBtn = document.getElementById('resetBuildWordGame');
        
        if (buildWordUserIcon) {
            buildWordUserIcon.onclick = function(e) {
                e.preventDefault();
                if (typeof openAuthModal === 'function') openAuthModal();
            };
        }
        
        if (buildWordAlphabetIcon) {
            buildWordAlphabetIcon.onclick = function(e) {
                e.preventDefault();
                if (typeof openAlphabetModal === 'function') openAlphabetModal();
            };
        }
        
        if (buildWordLogoutBtn) {
            buildWordLogoutBtn.onclick = function(e) {
                e.preventDefault();
                if (typeof logoutUser === 'function') logoutUser();
                updateBuildWordAuthUI();
            };
        }
        
        if (resetBtn) {
            resetBtn.onclick = resetBuildWordGame;
        }
    }
    
    if (typeof window.updateUIForAuth === 'function') {
        const originalUpdateUIForAuth = window.updateUIForAuth;
        window.updateUIForAuth = function() {
            originalUpdateUIForAuth();
            updateBuildWordAuthUI();
        };
    }
    
    initBuildWordHandlers();
    updateBuildWordAuthUI();
    
    console.log("📝 BuildWordGame загружена, награда: 1 монета");
})();