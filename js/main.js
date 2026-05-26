// ============================================
// ГЛАВНЫЙ ФАЙЛ ИНИЦИАЛИЗАЦИИ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Запуск приложения...");
    
    // Проверка данных
    if (typeof WORDS_DATABASE !== 'undefined') {
        console.log(`✅ Слова: ${WORDS_DATABASE.length}`);
    }
    if (typeof HIRAGANA_DATABASE !== 'undefined') {
        console.log(`✅ Хирагана: ${HIRAGANA_DATABASE.length}`);
    }
    if (typeof KATAKANA_DATABASE !== 'undefined') {
        console.log(`✅ Катакана: ${KATAKANA_DATABASE.length}`);
    }
    if (typeof BUILD_WORDS_DATABASE !== 'undefined') {
        console.log(`✅ Слова для составления: ${BUILD_WORDS_DATABASE.length}`);
    }
    
    // Инициализация UI
    if (typeof updateUIForAuth === 'function') updateUIForAuth();
    if (typeof updateAllCoinsDisplay === 'function') updateAllCoinsDisplay();
    
    // Инициализация компонентов
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initThemes === 'function') initThemes();
    if (typeof initSyllableGame === 'function') initSyllableGame();
    if (typeof initBuildWordGame === 'function') initBuildWordGame();
    if (typeof initLeaders === 'function') initLeaders();
    if (typeof initUserPanel === 'function') initUserPanel();
    
    // Обработчики модальных окон
    const alphabetIcon = document.getElementById('alphabetIcon');
    const syllableAlphabetIcon = document.getElementById('syllableAlphabetIcon');
    const buildWordAlphabetIcon = document.getElementById('buildWordAlphabetIcon');
    const closeAuth = document.getElementById('closeAuthModal');
    const closeModal = document.getElementById('closeModal');
    
    if (alphabetIcon) alphabetIcon.addEventListener('click', () => openAlphabetModal());
    if (syllableAlphabetIcon) syllableAlphabetIcon.addEventListener('click', () => openAlphabetModal());
    if (buildWordAlphabetIcon) buildWordAlphabetIcon.addEventListener('click', () => openAlphabetModal());
    if (closeAuth) closeAuth.addEventListener('click', () => closeAuthModal());
    if (closeModal) closeModal.addEventListener('click', () => closeAlphabetModal());
    
    // Вкладки авторизации
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchAuthTab(btn.dataset.auth));
    });
    
    // Вкладки алфавита
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab === 'hiragana' ? 'hiraganaTab' : 'katakanaTab';
            switchAlphabetTab(tab);
        });
    });
    
    // Вход (АСИНХРОННЫЙ)
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            const result = await loginUser(username, password);
            const msgDiv = document.getElementById('loginMessage');
            msgDiv.textContent = result.message;
            msgDiv.className = `auth-message ${result.success ? 'success' : 'error'}`;
            if (result.success) {
                saveCurrentUser(result.user);
                setTimeout(() => {
                    closeAuthModal();
                    if (typeof updateUIForAuth === 'function') updateUIForAuth();
                    if (typeof updateAllCoinsDisplay === 'function') updateAllCoinsDisplay();
                    if (typeof updateBuildWordCoinsDisplay === 'function') updateBuildWordCoinsDisplay();
                    if (typeof refreshLeaders === 'function') refreshLeaders();
                    if (typeof updateUserPanel === 'function') updateUserPanel();
                    document.getElementById('loginUsername').value = '';
                    document.getElementById('loginPassword').value = '';
                }, 1500);
            }
        });
    }
    
    // Регистрация (АСИНХРОННАЯ)
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', async () => {
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirmPassword').value;
            
            if (password !== confirm) {
                const msgDiv = document.getElementById('registerMessage');
                msgDiv.textContent = "Пароли не совпадают";
                msgDiv.className = 'auth-message error';
                return;
            }
            
            const result = await registerUser(username, password);
            const msgDiv = document.getElementById('registerMessage');
            msgDiv.textContent = result.message;
            msgDiv.className = `auth-message ${result.success ? 'success' : 'error'}`;
            if (result.success) {
                setTimeout(() => {
                    switchAuthTab('login');
                    document.getElementById('regUsername').value = '';
                    document.getElementById('regPassword').value = '';
                    document.getElementById('regConfirmPassword').value = '';
                    if (typeof refreshLeaders === 'function') refreshLeaders();
                }, 1500);
            }
        });
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', (event) => {
        const authModal = document.getElementById('authModal');
        const alphabetModal = document.getElementById('alphabetModal');
        if (event.target === authModal) closeAuthModal();
        if (event.target === alphabetModal) closeAlphabetModal();
    });
    
    // Запуск по умолчанию - показываем игру "Составь слово"
    if (typeof showBuildWordContainer === 'function') {
        showBuildWordContainer();
    }
    
    console.log('✅ Приложение запущено!');
});
