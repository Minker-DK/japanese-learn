// ============================================
// БАЗА ДАННЫХ ПОЛЬЗОВАТЕЛЕЙ
// ============================================

const DEFAULT_USERS = {
    "Minker": {
        username: "Minker",
        password: "minker123",
        wordCoins: 336,
        syllableCoins: 83,
        buildWordCoins: 4,
        createdAt: "2024-01-15T10:30:00.000Z",
        role: "user"
    },
    "Tori": {
        username: "Tori",
        password: "tori123",
        wordCoins: 2,
        syllableCoins: 4,
        buildWordCoins: 0,
        createdAt: "2024-01-20T00:00:00.000Z",
        role: "user"
    }
};

const USERS_STORAGE_KEY = 'japanese_app_users';

function initUsersDatabase() {
    const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!existingUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
        console.log("✅ База данных пользователей инициализирована");
        return DEFAULT_USERS;
    }
    const users = JSON.parse(existingUsers);
    let updated = false;
    
    // Проверяем и обновляем структуру существующих пользователей
    for (const key in users) {
        if (users[key].wordCoins === undefined) {
            users[key].wordCoins = users[key].coins || 0;
            updated = true;
        }
        if (users[key].syllableCoins === undefined) {
            users[key].syllableCoins = 0;
            updated = true;
        }
        if (users[key].buildWordCoins === undefined) {
            users[key].buildWordCoins = 0;
            updated = true;
        }
        if (users[key].coins !== undefined) {
            delete users[key].coins;
            updated = true;
        }
    }
    
    if (updated) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        console.log("✅ База данных пользователей обновлена");
    }
    return users;
}

// Функция для сброса базы данных к DEFAULT_USERS (для отладки)
function resetUsersToDefault() {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    console.log("🔄 База данных пользователей сброшена к значениям по умолчанию");
    return DEFAULT_USERS;
}

function getAllUsers() {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : initUsersDatabase();
}

function saveAllUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
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

function addWordCoins(username, amount) {
    const users = getAllUsers();
    if (!users[username]) return { success: false, message: "Пользователь не найден" };
    users[username].wordCoins = (users[username].wordCoins || 0) + amount;
    saveAllUsers(users);
    return { success: true, newCoins: users[username].wordCoins };
}

function addSyllableCoins(username, amount) {
    const users = getAllUsers();
    if (!users[username]) return { success: false, message: "Пользователь не найден" };
    users[username].syllableCoins = (users[username].syllableCoins || 0) + amount;
    saveAllUsers(users);
    return { success: true, newCoins: users[username].syllableCoins };
}

function addBuildWordCoins(username, amount) {
    const users = getAllUsers();
    if (!users[username]) return { success: false, message: "Пользователь не найден" };
    users[username].buildWordCoins = (users[username].buildWordCoins || 0) + amount;
    saveAllUsers(users);
    return { success: true, newCoins: users[username].buildWordCoins };
}

function createUser(username, password, email = "") {
    const users = getAllUsers();
    
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
    
    saveAllUsers(users);
    return { success: true, message: "Пользователь создан", user: users[username] };
}

function authenticateUser(username, password) {
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

// Инициализируем базу
initUsersDatabase();

console.log("📚 База данных пользователей загружена");
console.log("👥 Доступные пользователи: Minker, Tori");