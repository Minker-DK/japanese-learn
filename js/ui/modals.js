// ============================================
// МОДАЛЬНЫЕ ОКНА
// ============================================

function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function openAlphabetModal() {
    const modal = document.getElementById('alphabetModal');
    if (modal) {
        if (typeof renderAlphabet === 'function') {
            renderAlphabet('hiraganaGrid', HIRAGANA_DATABASE);
            renderAlphabet('katakanaGrid', KATAKANA_DATABASE);
        }
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeAlphabetModal() {
    const modal = document.getElementById('alphabetModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.querySelector('.auth-tab-btn[data-auth="login"]');
    const registerTab = document.querySelector('.auth-tab-btn[data-auth="register"]');
    const authTitle = document.getElementById('authTitle');
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        if (loginTab) loginTab.classList.add('active');
        if (registerTab) registerTab.classList.remove('active');
        if (authTitle) authTitle.textContent = 'Вход в аккаунт';
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        if (loginTab) loginTab.classList.remove('active');
        if (registerTab) registerTab.classList.add('active');
        if (authTitle) authTitle.textContent = 'Регистрация';
    }
}

function switchAlphabetTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.add('active');
    const tabName = tabId === 'hiraganaTab' ? 'hiragana' : 'katakana';
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

console.log("📱 Modals загружены");