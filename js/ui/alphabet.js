// ============================================
// АЛФАВИТ (ОТОБРАЖЕНИЕ)
// ============================================

function renderAlphabet(gridId, database) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = '';
    database.forEach(item => {
        const card = document.createElement('div');
        card.className = 'alphabet-card';
        if (item.type === 'voiced') card.classList.add('voiced');
        if (item.type === 'semi-voiced') card.classList.add('semi-voiced');
        card.innerHTML = `
            <div class="alphabet-japanese">${item.japanese}</div>
            <div class="alphabet-romanji">${item.romanji}</div>
        `;
        grid.appendChild(card);
    });
}

console.log("📖 Alphabet загружен");