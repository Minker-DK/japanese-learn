// ============================================
// СИСТЕМА АВТОРИЗАЦИИ
// ============================================

const CURRENT_USER_KEY = 'japanese_app_current_user';

function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

function saveCurrentUser(user) {
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
}

// Функции обёртки для асинхронных вызовов
async function loginUser(username, password) {
    const result = await authenticateUser(username, password);
    return result;
}

async function registerUser(username, password, email = "") {
    const result = await createUser(username, password, email);
    return result;
}

function logoutUser() {
    saveCurrentUser(null);
    if (typeof updateUIForAuth === 'function') updateUIForAuth();
    if (typeof updateAllCoinsDisplay === 'function') updateAllCoinsDisplay();
}

function updateUIForAuth() {
    const currentUser = getCurrentUser();
    
    // Основной контейнер
    const userIcon = document.getElementById('userIcon');
    const userInfo = document.getElementById('userInfo');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    if (currentUser) {
        if (userIcon) userIcon.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        if (usernameDisplay) usernameDisplay.textContent = currentUser.username;
    } else {
        if (userIcon) userIcon.style.display = 'flex';
        if (userInfo) userInfo.style.display = 'none';
    }
    
    // Контейнер слогов
    const syllableUserIcon = document.getElementById('syllableUserIcon');
    const syllableUserInfo = document.getElementById('syllableUserInfo');
    const syllableUsernameDisplay = document.getElementById('syllableUsernameDisplay');
    
    if (currentUser) {
        if (syllableUserIcon) syllableUserIcon.style.display = 'none';
        if (syllableUserInfo) syllableUserInfo.style.display = 'flex';
        if (syllableUsernameDisplay) syllableUsernameDisplay.textContent = currentUser.username;
    } else {
        if (syllableUserIcon) syllableUserIcon.style.display = 'flex';
        if (syllableUserInfo) syllableUserInfo.style.display = 'none';
    }
}

console.log("🔐 Auth загружен");
