// ============================================
// БАЗА ДАННЫХ КАТАКАНЫ
// ============================================

const KATAKANA_DATABASE = [
    // Базовые знаки (ア行 - a row)
    { id: 1, japanese: "ア", romanji: "a", row: "a", type: "basic", mnemonic: "а" },
    { id: 2, japanese: "イ", romanji: "i", row: "a", type: "basic", mnemonic: "и" },
    { id: 3, japanese: "ウ", romanji: "u", row: "a", type: "basic", mnemonic: "у" },
    { id: 4, japanese: "エ", romanji: "e", row: "a", type: "basic", mnemonic: "э" },
    { id: 5, japanese: "オ", romanji: "o", row: "a", type: "basic", mnemonic: "о" },
    
    // カ行 (ka row)
    { id: 6, japanese: "カ", romanji: "ka", row: "k", type: "basic", mnemonic: "ка" },
    { id: 7, japanese: "キ", romanji: "ki", row: "k", type: "basic", mnemonic: "ки" },
    { id: 8, japanese: "ク", romanji: "ku", row: "k", type: "basic", mnemonic: "ку" },
    { id: 9, japanese: "ケ", romanji: "ke", row: "k", type: "basic", mnemonic: "кэ" },
    { id: 10, japanese: "コ", romanji: "ko", row: "k", type: "basic", mnemonic: "ко" },
    
    // サ行 (sa row)
    { id: 11, japanese: "サ", romanji: "sa", row: "s", type: "basic", mnemonic: "са" },
    { id: 12, japanese: "シ", romanji: "shi", row: "s", type: "basic", mnemonic: "ши" },
    { id: 13, japanese: "ス", romanji: "su", row: "s", type: "basic", mnemonic: "су" },
    { id: 14, japanese: "セ", romanji: "se", row: "s", type: "basic", mnemonic: "сэ" },
    { id: 15, japanese: "ソ", romanji: "so", row: "s", type: "basic", mnemonic: "со" },
    
    // タ行 (ta row)
    { id: 16, japanese: "タ", romanji: "ta", row: "t", type: "basic", mnemonic: "та" },
    { id: 17, japanese: "チ", romanji: "chi", row: "t", type: "basic", mnemonic: "чи" },
    { id: 18, japanese: "ツ", romanji: "tsu", row: "t", type: "basic", mnemonic: "цу" },
    { id: 19, japanese: "テ", romanji: "te", row: "t", type: "basic", mnemonic: "тэ" },
    { id: 20, japanese: "ト", romanji: "to", row: "t", type: "basic", mnemonic: "то" },
    
    // ナ行 (na row)
    { id: 21, japanese: "ナ", romanji: "na", row: "n", type: "basic", mnemonic: "на" },
    { id: 22, japanese: "ニ", romanji: "ni", row: "n", type: "basic", mnemonic: "ни" },
    { id: 23, japanese: "ヌ", romanji: "nu", row: "n", type: "basic", mnemonic: "ну" },
    { id: 24, japanese: "ネ", romanji: "ne", row: "n", type: "basic", mnemonic: "нэ" },
    { id: 25, japanese: "ノ", romanji: "no", row: "n", type: "basic", mnemonic: "но" },
    
    // ハ行 (ha row)
    { id: 26, japanese: "ハ", romanji: "ha", row: "h", type: "basic", mnemonic: "ха" },
    { id: 27, japanese: "ヒ", romanji: "hi", row: "h", type: "basic", mnemonic: "хи" },
    { id: 28, japanese: "フ", romanji: "fu", row: "h", type: "basic", mnemonic: "фу" },
    { id: 29, japanese: "ヘ", romanji: "he", row: "h", type: "basic", mnemonic: "хэ" },
    { id: 30, japanese: "ホ", romanji: "ho", row: "h", type: "basic", mnemonic: "хо" },
    
    // マ行 (ma row)
    { id: 31, japanese: "マ", romanji: "ma", row: "m", type: "basic", mnemonic: "ма" },
    { id: 32, japanese: "ミ", romanji: "mi", row: "m", type: "basic", mnemonic: "ми" },
    { id: 33, japanese: "ム", romanji: "mu", row: "m", type: "basic", mnemonic: "му" },
    { id: 34, japanese: "メ", romanji: "me", row: "m", type: "basic", mnemonic: "мэ" },
    { id: 35, japanese: "モ", romanji: "mo", row: "m", type: "basic", mnemonic: "мо" },
    
    // ヤ行 (ya row)
    { id: 36, japanese: "ヤ", romanji: "ya", row: "y", type: "basic", mnemonic: "я" },
    { id: 37, japanese: "ユ", romanji: "yu", row: "y", type: "basic", mnemonic: "ю" },
    { id: 38, japanese: "ヨ", romanji: "yo", row: "y", type: "basic", mnemonic: "ё" },
    
    // ラ行 (ra row)
    { id: 39, japanese: "ラ", romanji: "ra", row: "r", type: "basic", mnemonic: "ра" },
    { id: 40, japanese: "リ", romanji: "ri", row: "r", type: "basic", mnemonic: "ри" },
    { id: 41, japanese: "ル", romanji: "ru", row: "r", type: "basic", mnemonic: "ру" },
    { id: 42, japanese: "レ", romanji: "re", row: "r", type: "basic", mnemonic: "рэ" },
    { id: 43, japanese: "ロ", romanji: "ro", row: "r", type: "basic", mnemonic: "ро" },
    
    // ワ行 (wa row)
    { id: 44, japanese: "ワ", romanji: "wa", row: "w", type: "basic", mnemonic: "ва" },
    { id: 45, japanese: "ヲ", romanji: "wo", row: "w", type: "basic", mnemonic: "во" },
    { id: 46, japanese: "ン", romanji: "n", row: "w", type: "basic", mnemonic: "н" },
    
    // Звонкие (Дакуон) - ガ行
    { id: 47, japanese: "ガ", romanji: "ga", row: "g", type: "voiced", baseChar: "カ" },
    { id: 48, japanese: "ギ", romanji: "gi", row: "g", type: "voiced", baseChar: "キ" },
    { id: 49, japanese: "グ", romanji: "gu", row: "g", type: "voiced", baseChar: "ク" },
    { id: 50, japanese: "ゲ", romanji: "ge", row: "g", type: "voiced", baseChar: "ケ" },
    { id: 51, japanese: "ゴ", romanji: "go", row: "g", type: "voiced", baseChar: "コ" },
    
    // ザ行
    { id: 52, japanese: "ザ", romanji: "za", row: "z", type: "voiced", baseChar: "サ" },
    { id: 53, japanese: "ジ", romanji: "ji", row: "z", type: "voiced", baseChar: "シ" },
    { id: 54, japanese: "ズ", romanji: "zu", row: "z", type: "voiced", baseChar: "ス" },
    { id: 55, japanese: "ゼ", romanji: "ze", row: "z", type: "voiced", baseChar: "セ" },
    { id: 56, japanese: "ゾ", romanji: "zo", row: "z", type: "voiced", baseChar: "ソ" },
    
    // ダ行
    { id: 57, japanese: "ダ", romanji: "da", row: "d", type: "voiced", baseChar: "タ" },
    { id: 58, japanese: "ヂ", romanji: "ji", row: "d", type: "voiced", baseChar: "チ" },
    { id: 59, japanese: "ヅ", romanji: "zu", row: "d", type: "voiced", baseChar: "ツ" },
    { id: 60, japanese: "デ", romanji: "de", row: "d", type: "voiced", baseChar: "テ" },
    { id: 61, japanese: "ド", romanji: "do", row: "d", type: "voiced", baseChar: "ト" },
    
    // バ行
    { id: 62, japanese: "バ", romanji: "ba", row: "b", type: "voiced", baseChar: "ハ" },
    { id: 63, japanese: "ビ", romanji: "bi", row: "b", type: "voiced", baseChar: "ヒ" },
    { id: 64, japanese: "ブ", romanji: "bu", row: "b", type: "voiced", baseChar: "フ" },
    { id: 65, japanese: "ベ", romanji: "be", row: "b", type: "voiced", baseChar: "ヘ" },
    { id: 66, japanese: "ボ", romanji: "bo", row: "b", type: "voiced", baseChar: "ホ" },
    
    // Полузвонкие (Хандакуон) - パ行
    { id: 67, japanese: "パ", romanji: "pa", row: "p", type: "semi-voiced", baseChar: "ハ" },
    { id: 68, japanese: "ピ", romanji: "pi", row: "p", type: "semi-voiced", baseChar: "ヒ" },
    { id: 69, japanese: "プ", romanji: "pu", row: "p", type: "semi-voiced", baseChar: "フ" },
    { id: 70, japanese: "ペ", romanji: "pe", row: "p", type: "semi-voiced", baseChar: "ヘ" },
    { id: 71, japanese: "ポ", romanji: "po", row: "p", type: "semi-voiced", baseChar: "ホ" }
];

// Функции для работы с катаканой
function getAllKatakana() {
    return KATAKANA_DATABASE;
}

function getKatakanaByRow(row) {
    return KATAKANA_DATABASE.filter(char => char.row === row);
}

function getKatakanaByType(type) {
    return KATAKANA_DATABASE.filter(char => char.type === type);
}