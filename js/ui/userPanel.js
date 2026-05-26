// ============================================
// ПАНЕЛЬ ПОЛЬЗОВАТЕЛЯ (СЛЕВА СВЕРХУ)
// ============================================

function updateUserPanel() {
    const currentUser = getCurrentUser();
    const notLoggedDiv = document.getElementById('userPanelNotLogged');
    const loggedDiv = document.getElementById('userPanelLogged');
    const panelUsername = document.getElementById('panelUsername');
    const panelWordCoins = document.getElementById('panelWordCoins');
    const panelSyllableCoins = document.getElementById('panelSyllableCoins');
    const panelBuildCoins = document.getElementById('panelBuildCoins');
    
    if (currentUser) {
        if (notLoggedDiv) notLoggedDiv.style.display = 'none';
        if (loggedDiv) loggedDiv.style.display = 'block';
        if (panelUsername) panelUsername.textContent = currentUser.username;
        if (panelWordCoins) panelWordCoins.textContent = getUserWordCoins(currentUser.username);
        if (panelSyllableCoins) panelSyllableCoins.textContent = getUserSyllableCoins(currentUser.username);
        if (panelBuildCoins) panelBuildCoins.textContent = getUserBuildWordCoins(currentUser.username);
    } else {
        if (notLoggedDiv) notLoggedDiv.style.display = 'block';
        if (loggedDiv) loggedDiv.style.display = 'none';
    }
}

// Обновить только монеты в панели (без перерисовки всего)
function updatePanelCoinsOnly() {
    const currentUser = getCurrentUser();
    const panelWordCoins = document.getElementById('panelWordCoins');
    const panelSyllableCoins = document.getElementById('panelSyllableCoins');
    const panelBuildCoins = document.getElementById('panelBuildCoins');
    
    if (currentUser) {
        if (panelWordCoins) panelWordCoins.textContent = getUserWordCoins(currentUser.username);
        if (panelSyllableCoins) panelSyllableCoins.textContent = getUserSyllableCoins(currentUser.username);
        if (panelBuildCoins) panelBuildCoins.textContent = getUserBuildWordCoins(currentUser.username);
    }
}

function initUserPanel() {
    const panelLoginBtn = document.getElementById('panelLoginBtn');
    const panelLogoutBtn = document.getElementById('panelLogoutBtn');
    
    if (panelLoginBtn) {
        panelLoginBtn.onclick = (e) => {
            e.preventDefault();
            openAuthModal();
        };
    }
    
    if (panelLogoutBtn) {
        panelLogoutBtn.onclick = (e) => {
            e.preventDefault();
            logoutUser();
            updateUserPanel();
            if (typeof updateAllCoinsDisplay === 'function') updateAllCoinsDisplay();
            if (typeof refreshLeaders === 'function') refreshLeaders();
        };
    }
    
    updateUserPanel();
    console.log("👤 UserPanel загружена");
}

// Переопределяем updateUIForAuth для синхронизации
if (typeof window.updateUIForAuth === 'function') {
    const originalUpdateUIForAuth = window.updateUIForAuth;
    window.updateUIForAuth = function() {
        originalUpdateUIForAuth();
        updateUserPanel();
    };
}

// Экспорт
if (typeof module === 'undefined') {
    window.updateUserPanel = updateUserPanel;
    window.initUserPanel = initUserPanel;
    window.updatePanelCoinsOnly = updatePanelCoinsOnly;
}