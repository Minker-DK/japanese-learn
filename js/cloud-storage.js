// ============================================
// ОБЛАЧНОЕ ХРАНИЛИЩЕ (JSONBin.io)
// ============================================

// ⚠️ ЗАМЕНИТЕ НА СВОИ ДАННЫЕ:
const CLOUD_CONFIG = {
    BIN_ID: "6a162be5f47d5c455c3b0f46",        // ID вашего bin (например: 67b5b1234567890abcdef)
    MASTER_KEY: "$2a$10$88G7mE9AJ5oT.O7nKJJEDO93Vn/YSJX1lPl77reWbyqFHmnHRHDG2",
    ACCESS_KEY: "$2a$10$ntuKPatCiTY8zdBT1WfkZ.JveDujauDS49WMhxzaQbQCVg8eYylgK"  
};

// Базовый URL для API
const API_URL = `https://api.jsonbin.io/v3/b/${CLOUD_CONFIG.BIN_ID}`;

// Флаг для отладки
let isCloudAvailable = true;

// Загрузка всех пользователей из облака
async function loadUsersFromCloud() {
    try {
        const response = await fetch(API_URL + "/latest", {
            headers: {
                "X-Master-Key": CLOUD_CONFIG.MASTER_KEY,
                "X-Access-Key": CLOUD_CONFIG.ACCESS_KEY
            }
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const users = data.record;
        
        console.log("☁️ Пользователи загружены из облака:", Object.keys(users).length);
        return users;
        
    } catch (error) {
        console.error("❌ Ошибка загрузки из облака:", error);
        isCloudAvailable = false;
        return null;
    }
}

// Сохранение всех пользователей в облако
async function saveUsersToCloud(users) {
    if (!isCloudAvailable) return false;
    
    try {
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": CLOUD_CONFIG.MASTER_KEY,
                "X-Access-Key": CLOUD_CONFIG.ACCESS_KEY
            },
            body: JSON.stringify(users)
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        console.log("☁️ Пользователи сохранены в облако");
        return true;
        
    } catch (error) {
        console.error("❌ Ошибка сохранения в облако:", error);
        isCloudAvailable = false;
        return false;
    }
}

// Получение текущего пользователя (из localStorage)
function getCurrentUser() {
    const user = localStorage.getItem('japanese_app_current_user');
    return user ? JSON.parse(user) : null;
}

// Сохранение текущего пользователя (в localStorage)
function saveCurrentUser(user) {
    if (user) {
        localStorage.setItem('japanese_app_current_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('japanese_app_current_user');
    }
}

console.log("☁️ Cloud Storage загружен");