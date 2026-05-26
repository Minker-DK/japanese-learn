// ============================================
// ОБЛАЧНОЕ ХРАНИЛИЩЕ (JSONBin.io)
// ============================================

const CLOUD_CONFIG = {
    BIN_ID: "6a162be5f47d5c455c3b0f46",
    MASTER_KEY: "$2a$10$88G7mE9AJ5oT.O7nKJJEDO93Vn/YSJX1lPl77reWbyqFHmnHRHDG2",
    ACCESS_KEY: "$2a$10$ntuKPatCiTY8zdBT1WfkZ.JveDujauDS49WMhxzaQbQCVg8eYylgK"
};

const API_URL = `https://api.jsonbin.io/v3/b/${CLOUD_CONFIG.BIN_ID}`;

let isCloudAvailable = true;

async function loadUsersFromCloud() {
    console.log("☁️ Загрузка из облака...");
    
    try {
        const response = await fetch(API_URL + "/latest", {
            headers: {
                "X-Master-Key": CLOUD_CONFIG.MASTER_KEY,
                "X-Access-Key": CLOUD_CONFIG.ACCESS_KEY
            }
        });
        
        console.log("Статус ответа:", response.status);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const users = data.record;
        
        console.log("☁️ Пользователи загружены:", users ? Object.keys(users).length : 0);
        return users;
        
    } catch (error) {
        console.error("❌ Ошибка загрузки:", error);
        isCloudAvailable = false;
        return null;
    }
}

async function saveUsersToCloud(users) {
    console.log("☁️ Сохранение в облако...");
    
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
        
        console.log("Статус сохранения:", response.status);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        console.log("☁️ Сохранено успешно");
        return true;
        
    } catch (error) {
        console.error("❌ Ошибка сохранения:", error);
        isCloudAvailable = false;
        return false;
    }
}

function getCurrentUser() {
    const user = localStorage.getItem('japanese_app_current_user');
    return user ? JSON.parse(user) : null;
}

function saveCurrentUser(user) {
    if (user) {
        localStorage.setItem('japanese_app_current_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('japanese_app_current_user');
    }
}

console.log("☁️ Cloud Storage загружен");
