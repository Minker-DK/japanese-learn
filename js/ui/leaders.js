// ============================================
// ПАНЕЛЬ ЛИДЕРОВ
// ============================================

let currentLeaderType = 'words'; // words, syllables, buildword

// Получить топ пользователей по типу монет
function getTopUsers(coinType) {
    const users = getAllUsers();
    const userList = [];
    
    for (const username in users) {
        const user = users[username];
        let coins = 0;
        
        if (coinType === 'words') {
            coins = user.wordCoins || 0;
        } else if (coinType === 'syllables') {
            coins = user.syllableCoins || 0;
        } else if (coinType === 'buildword') {
            coins = user.buildWordCoins || 0;
        }
        
        userList.push({
            username: username,
            coins: coins
        });
    }
    
    // Сортировка по убыванию монет
    userList.sort((a, b) => b.coins - a.coins);
    
    // Возвращаем топ-5
    return userList.slice(0, 5);
}

// Получить иконку медали для места
function getMedalIcon(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
}

// Получить класс для места
function getRankClass(rank) {
    if (rank === 1) return 'top-1';
    if (rank === 2) return 'top-2';
    if (rank === 3) return 'top-3';
    return '';
}

// Отрисовать список лидеров
function renderLeaders() {
    const leadersList = document.getElementById('leadersList');
    if (!leadersList) return;
    
    const topUsers = getTopUsers(currentLeaderType);
    
    if (topUsers.length === 0) {
        leadersList.innerHTML = '<div class="empty-leaders">Пока нет лидеров</div>';
        return;
    }
    
    let coinIcon = '';
    if (currentLeaderType === 'words') coinIcon = '📖';
    else if (currentLeaderType === 'syllables') coinIcon = '🔤';
    else coinIcon = '📝';
    
    leadersList.innerHTML = '';
    topUsers.forEach((user, index) => {
        const rank = index + 1;
        const item = document.createElement('div');
        item.className = `leader-item ${getRankClass(rank)}`;
        
        item.innerHTML = `
            <div class="leader-rank">${rank}</div>
            <div class="leader-medal">${getMedalIcon(rank)}</div>
            <div class="leader-name">${user.username}</div>
            <div class="leader-coins">${coinIcon} ${user.coins}</div>
        `;
        
        leadersList.appendChild(item);
    });
}

// Переключить тип лидеров
function setLeaderType(type) {
    currentLeaderType = type;
    
    // Обновляем активную вкладку
    document.querySelectorAll('.leaders-tab').forEach(tab => {
        if (tab.dataset.leader === type) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    renderLeaders();
}

// Инициализация панели лидеров
function initLeaders() {
    const tabs = document.querySelectorAll('.leaders-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const type = tab.dataset.leader;
            if (type === 'words') setLeaderType('words');
            else if (type === 'syllables') setLeaderType('syllables');
            else if (type === 'buildword') setLeaderType('buildword');
        });
    });
    
    renderLeaders();
    console.log("🏆 Leaders панель загружена");
}

// Обновить лидеров (вызывать при изменении монет)
function refreshLeaders() {
    renderLeaders();
}

// Экспорт функций
if (typeof module === 'undefined') {
    window.initLeaders = initLeaders;
    window.refreshLeaders = refreshLeaders;
    window.setLeaderType = setLeaderType;
}