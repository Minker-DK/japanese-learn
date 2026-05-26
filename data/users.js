// ============================================
// БАЗА ДАННЫХ ПОЛЬЗОВАТЕЛЕЙ (ОБЛАЧНАЯ)
// ============================================

let CLOUD_USERS_CACHE = null;

// Инициализация базы (загружаем из облака)
async function initUsersDatabase() {
    console.log("🔄 Инициализация облачной базы пользователей...");
    
    const cloudUsers = await loadUsersFromCloud();
    
    if (cloudUsers && Object.keys(cloudUsers).length > 0) {
        CLOUD_USERS_CACHE = cloudUsers;
        console.log("✅ Загружено пользователей из облака:", Object.keys(CLOUD_USERS_CACHE).length);
        console.log("👥 Список пользователей:", Object.keys(CLOUD_USERS_CACHE));
        return CLOUD_USERS_CACHE;
    }
    
    // Если облако не доступно, используем локальные данные
    const localUsers = localStorage.getItem('japanese_users_local_backup');
    if (localUsers) {
        CLOUD_USERS_CACHE = JSON.parse(localUsers);
        console.log("⚠️ Используем локальный бэкап");
        return CLOUD_USERS_CACHE;
    }
    
    // Если ничего нет, создаём начальных пользователей
    console.log("🆕 Создаём начальных пользователей");
    CLOUD_USERS_CACHE = {
        "Minker": {
            username: "Minker",
            password: "minker123",
            wordCoins: 150,
            syllableCoins: 80,
            buildWordCoins: 45,
            createdAt: new Date().toISOString(),
            role: "user"
        },
        "Tori": {
            username: "Tori",
            password: "tori123",
            wordCoins: 200,
            syllableCoins: 120,
            buildWordCoins: 60,
            createdAt: new Date().toISOString(),
            role: "user"
        }
    };
    
    await saveUsersToCloud(CLOUD_USERS_CACHE);
    return CLOUD_USERS_CACHE;
}

function getAllUsers() {
    return CLOUD_USERS_CACHE || {};
}

async function saveAllUsers(users) {
    console.log("💾 Сохранение пользователей в облако...");
    CLOUD_USERS_CACHE = users;
    const result = await saveUsersToCloud(users);
    if (result) {
        console.log("✅ Пользователи сохранены в облако");
        // Сохраняем локальный бэкап
        localStorage.setItem('japanese_users_local_backup', JSON.stringify(users));
    } else {
        console.error("❌ Ошибка сохранения в облако");
    }
}

function getUser(username) {
    const users = getAllUsers();
    return users[username] || null;
}

function getUserWordCoins(username) {
    const user = getUser(username);
    return user ? user.wordCoins : 0;
}

function getUserSyllableCoins(username) {
    const user = getUser(username);
    return user ? user.syllableCoins : 0;
}

function getUserBuildWordCoins(username) {
    const user = getUser(username);
    return user ? user.buildWordCoins : 0;
}

async function addWordCoins(username, amount) {
    const users = getAllUsers();
    if (!users[username]) return { success: false, message: "Пользователь не найден" };
    users[username].wordCoins = (users[username].wordCoins || 0) + amount;
    await saveAllUsers(users);
    return { success: true, newCoins: users[username].wordCoins };
}

async function addSyllableCoins(username, amount) {
    const users = getAllUsers();
    if (!users[username]) return { success: false, message: "Пользователь не найден" };
    users[username].syllableCoins = (users[username].syllableCoins || 0) + amount;
    await saveAllUsers(users);
    return { success: true, newCoins: users[username].syllableCoins };
}

async function addBuildWordCoins(username, amount) {
    const users = getAllUsers();
    if (!users[username]) return { success: false, message: "Пользователь не найден" };
    users[username].buildWordCoins = (users[username].buildWordCoins || 0) + amount;
    await saveAllUsers(users);
    return { success: true, newCoins: users[username].buildWordCoins };
}

async function createUser(username, password, email = "") {
    console.log("🆕 Создание пользователя:", username);
    
    let users = getAllUsers();
    
    if (users[username]) {
        return { success: false, message: "Пользователь уже существует" };
    }
    
    if (!username || username.length < 3) {
        return { success: false, message: "Логин должен быть минимум 3 символа" };
    }
    if (!password || password.length < 4) {
        return { success: false, message: "Пароль должен быть минимум 4 символа" };
    }
    
    users[username] = {
        username: username,
        password: password,
        wordCoins: 0,
        syllableCoins: 0,
        buildWordCoins: 0,
        createdAt: new Date().toISOString(),
        role: "user"
    };
    
    await saveAllUsers(users);
    console.log("✅ Пользователь создан:", username);
    return { success: true, message: "Пользователь создан", user: users[username] };
}

async function authenticateUser(username, password) {
    const user = getUser(username);
    if (!user) {
        return { success: false, message: "Пользователь не найден" };
    }
    if (user.password !== password) {
        return { success: false, message: "Неверный пароль" };
    }
    
    return { 
        success: true, 
        message: "Вход выполнен", 
        user: {
            username: user.username,
            wordCoins: user.wordCoins,
            syllableCoins: user.syllableCoins,
            buildWordCoins: user.buildWordCoins,
            role: user.role
        }
    };
}

// Запускаем инициализацию
initUsersDatabase().then(() => {
    console.log("📚 Облачная база данных пользователей загружена");
    console.log("👥 Пользователей в системе:", Object.keys(getAllUsers()).length);
});

// Экспорт для глобального доступа
window.getAllUsers = getAllUsers;
window.getUser = getUser;
window.getUserWordCoins = getUserWordCoins;
window.getUserSyllableCoins = getUserSyllableCoins;
window.getUserBuildWordCoins = getUserBuildWordCoins;
window.addWordCoins = addWordCoins;
window.addSyllableCoins = addSyllableCoins;
window.addBuildWordCoins = addBuildWordCoins;
window.createUser = createUser;
window.authenticateUser = authenticateUser;
