// ============================================
// БАЗА ДАННЫХ ХИРАГАНЫ
// ============================================

const HIRAGANA_DATABASE = [
    // Базовые знаки (あ行 - a row)
    { id: 1, japanese: "あ", romanji: "a", row: "a", type: "basic", mnemonic: "похожа на 'а'" },
    { id: 2, japanese: "い", romanji: "i", row: "a", type: "basic", mnemonic: "похожа на 'и'" },
    { id: 3, japanese: "う", romanji: "u", row: "a", type: "basic", mnemonic: "звук 'у'" },
    { id: 4, japanese: "え", romanji: "e", row: "a", type: "basic", mnemonic: "звук 'э'" },
    { id: 5, japanese: "お", romanji: "o", row: "a", type: "basic", mnemonic: "звук 'о'" },
    
    // か行 (ka row)
    { id: 6, japanese: "か", romanji: "ka", row: "k", type: "basic", mnemonic: "как 'ка'" },
    { id: 7, japanese: "き", romanji: "ki", row: "k", type: "basic", mnemonic: "как 'ки'" },
    { id: 8, japanese: "く", romanji: "ku", row: "k", type: "basic", mnemonic: "клюв птицы" },
    { id: 9, japanese: "け", romanji: "ke", row: "k", type: "basic", mnemonic: "кекс" },
    { id: 10, japanese: "こ", romanji: "ko", row: "k", type: "basic", mnemonic: "две рыбы" },
    
    // さ行 (sa row)
    { id: 11, japanese: "さ", romanji: "sa", row: "s", type: "basic", mnemonic: "самурай" },
    { id: 12, japanese: "し", romanji: "shi", row: "s", type: "basic", mnemonic: "шип" },
    { id: 13, japanese: "す", romanji: "su", row: "s", type: "basic", mnemonic: "суши" },
    { id: 14, japanese: "せ", romanji: "se", row: "s", type: "basic", mnemonic: "сетка" },
    { id: 15, japanese: "そ", romanji: "so", row: "s", type: "basic", mnemonic: "софа" },
    
    // た行 (ta row)
    { id: 16, japanese: "た", romanji: "ta", row: "t", type: "basic", mnemonic: "танк" },
    { id: 17, japanese: "ち", romanji: "chi", row: "t", type: "basic", mnemonic: "чизкейк" },
    { id: 18, japanese: "つ", romanji: "tsu", row: "t", type: "basic", mnemonic: "цунами" },
    { id: 19, japanese: "て", romanji: "te", row: "t", type: "basic", mnemonic: "телефон" },
    { id: 20, japanese: "と", romanji: "to", row: "t", type: "basic", mnemonic: "томат" },
    
    // な行 (na row)
    { id: 21, japanese: "な", romanji: "na", row: "n", type: "basic", mnemonic: "нана" },
    { id: 22, japanese: "に", romanji: "ni", row: "n", type: "basic", mnemonic: "ниндзя" },
    { id: 23, japanese: "ぬ", romanji: "nu", row: "n", type: "basic", mnemonic: "нутелла" },
    { id: 24, japanese: "ね", romanji: "ne", row: "n", type: "basic", mnemonic: "небо" },
    { id: 25, japanese: "の", romanji: "no", row: "n", type: "basic", mnemonic: "нота" },
    
    // は行 (ha row)
    { id: 26, japanese: "は", romanji: "ha", row: "h", type: "basic", mnemonic: "ха-ха" },
    { id: 27, japanese: "ひ", romanji: "hi", row: "h", type: "basic", mnemonic: "хихи" },
    { id: 28, japanese: "ふ", romanji: "fu", row: "h", type: "basic", mnemonic: "фу-фу" },
    { id: 29, japanese: "へ", romanji: "he", row: "h", type: "basic", mnemonic: "хей" },
    { id: 30, japanese: "ほ", romanji: "ho", row: "h", type: "basic", mnemonic: "хо-хо" },
    
    // ま行 (ma row)
    { id: 31, japanese: "ま", romanji: "ma", row: "m", type: "basic", mnemonic: "мама" },
    { id: 32, japanese: "み", romanji: "mi", row: "m", type: "basic", mnemonic: "мими" },
    { id: 33, japanese: "む", romanji: "mu", row: "m", type: "basic", mnemonic: "му-му" },
    { id: 34, japanese: "め", romanji: "me", row: "m", type: "basic", mnemonic: "медведь" },
    { id: 35, japanese: "も", romanji: "mo", row: "m", type: "basic", mnemonic: "море" },
    
    // や行 (ya row)
    { id: 36, japanese: "や", romanji: "ya", row: "y", type: "basic", mnemonic: "яблоко" },
    { id: 37, japanese: "ゆ", romanji: "yu", row: "y", type: "basic", mnemonic: "юбка" },
    { id: 38, japanese: "よ", romanji: "yo", row: "y", type: "basic", mnemonic: "йогурт" },
    
    // ら行 (ra row)
    { id: 39, japanese: "ら", romanji: "ra", row: "r", type: "basic", mnemonic: "ракета" },
    { id: 40, japanese: "り", romanji: "ri", row: "r", type: "basic", mnemonic: "ринг" },
    { id: 41, japanese: "る", romanji: "ru", row: "r", type: "basic", mnemonic: "рука" },
    { id: 42, japanese: "れ", romanji: "re", row: "r", type: "basic", mnemonic: "река" },
    { id: 43, japanese: "ろ", romanji: "ro", row: "r", type: "basic", mnemonic: "роза" },
    
    // わ行 (wa row)
    { id: 44, japanese: "わ", romanji: "wa", row: "w", type: "basic", mnemonic: "ваза" },
    { id: 45, japanese: "を", romanji: "wo", row: "w", type: "basic", mnemonic: "во" },
    { id: 46, japanese: "ん", romanji: "n", row: "w", type: "basic", mnemonic: "эн" },
    
    // Звонкие (Дакуон) - が行
    { id: 47, japanese: "が", romanji: "ga", row: "g", type: "voiced", baseChar: "か" },
    { id: 48, japanese: "ぎ", romanji: "gi", row: "g", type: "voiced", baseChar: "き" },
    { id: 49, japanese: "ぐ", romanji: "gu", row: "g", type: "voiced", baseChar: "く" },
    { id: 50, japanese: "げ", romanji: "ge", row: "g", type: "voiced", baseChar: "け" },
    { id: 51, japanese: "ご", romanji: "go", row: "g", type: "voiced", baseChar: "こ" },
    
    // ざ行
    { id: 52, japanese: "ざ", romanji: "za", row: "z", type: "voiced", baseChar: "さ" },
    { id: 53, japanese: "じ", romanji: "ji", row: "z", type: "voiced", baseChar: "し" },
    { id: 54, japanese: "ず", romanji: "zu", row: "z", type: "voiced", baseChar: "す" },
    { id: 55, japanese: "ぜ", romanji: "ze", row: "z", type: "voiced", baseChar: "せ" },
    { id: 56, japanese: "ぞ", romanji: "zo", row: "z", type: "voiced", baseChar: "そ" },
    
    // だ行
    { id: 57, japanese: "だ", romanji: "da", row: "d", type: "voiced", baseChar: "た" },
    { id: 58, japanese: "ぢ", romanji: "ji", row: "d", type: "voiced", baseChar: "ち" },
    { id: 59, japanese: "づ", romanji: "zu", row: "d", type: "voiced", baseChar: "つ" },
    { id: 60, japanese: "で", romanji: "de", row: "d", type: "voiced", baseChar: "て" },
    { id: 61, japanese: "ど", romanji: "do", row: "d", type: "voiced", baseChar: "と" },
    
    // ば行
    { id: 62, japanese: "ば", romanji: "ba", row: "b", type: "voiced", baseChar: "は" },
    { id: 63, japanese: "び", romanji: "bi", row: "b", type: "voiced", baseChar: "ひ" },
    { id: 64, japanese: "ぶ", romanji: "bu", row: "b", type: "voiced", baseChar: "ふ" },
    { id: 65, japanese: "べ", romanji: "be", row: "b", type: "voiced", baseChar: "へ" },
    { id: 66, japanese: "ぼ", romanji: "bo", row: "b", type: "voiced", baseChar: "ほ" },
    
    // Полузвонкие (Хандакуон) - ぱ行
    { id: 67, japanese: "ぱ", romanji: "pa", row: "p", type: "semi-voiced", baseChar: "は" },
    { id: 68, japanese: "ぴ", romanji: "pi", row: "p", type: "semi-voiced", baseChar: "ひ" },
    { id: 69, japanese: "ぷ", romanji: "pu", row: "p", type: "semi-voiced", baseChar: "ふ" },
    { id: 70, japanese: "ぺ", romanji: "pe", row: "p", type: "semi-voiced", baseChar: "へ" },
    { id: 71, japanese: "ぽ", romanji: "po", row: "p", type: "semi-voiced", baseChar: "ほ" }
];

// Функции для работы с хираганой
function getAllHiragana() {
    return HIRAGANA_DATABASE;
}

function getHiraganaByRow(row) {
    return HIRAGANA_DATABASE.filter(char => char.row === row);
}

function getHiraganaByType(type) {
    return HIRAGANA_DATABASE.filter(char => char.type === type);
}