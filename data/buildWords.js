// ============================================
// СЛОВА ДЛЯ ИГРЫ "СОСТАВЛЕНИЕ СЛОВ"
// ============================================

const BUILD_WORDS_DATABASE = [
    { russian: "Здравствуйте", japanese: "こんにちは", syllables: ["こ","ん","に","ち","は"] },
    { russian: "Спасибо", japanese: "ありがとう", syllables: ["あ","り","が","と","う"] },
    { russian: "До свидания", japanese: "さようなら", syllables: ["さ","よ","う","な","ら"] },
    { russian: "Извините", japanese: "すみません", syllables: ["す","み","ま","せ","ん"] },
    { russian: "Доброе утро", japanese: "おはよう", syllables: ["お","は","よ","う"] },
    { russian: "Добрый вечер", japanese: "こんばんは", syllables: ["こ","ん","ば","ん","は"] },
    { russian: "Спокойной ночи", japanese: "おやすみ", syllables: ["お","や","す","み"] },
    { russian: "Я", japanese: "わたし", syllables: ["わ","た","し"] },
    { russian: "Ты", japanese: "あなた", syllables: ["あ","な","た"] },
    { russian: "Он", japanese: "かれ", syllables: ["か","れ"] },
    { russian: "Она", japanese: "かのじょ", syllables: ["か","の","じ","ょ"] },
    { russian: "Это", japanese: "これ", syllables: ["こ","れ"] },
    { russian: "То", japanese: "それ", syllables: ["そ","れ"] },
    { russian: "Что", japanese: "なに", syllables: ["な","に"] },
    { russian: "Где", japanese: "どこ", syllables: ["ど","こ"] },
    { russian: "Кто", japanese: "だれ", syllables: ["だ","れ"] },
    { russian: "Есть", japanese: "たべる", syllables: ["た","べ","る"] },
    { russian: "Пить", japanese: "のむ", syllables: ["の","む"] },
    { russian: "Идти", japanese: "いく", syllables: ["い","く"] },
    { russian: "Смотреть", japanese: "みる", syllables: ["み","る"] },
    { russian: "Большой", japanese: "おおきい", syllables: ["お","お","き","い"] },
    { russian: "Маленький", japanese: "ちいさい", syllables: ["ち","い","さ","い"] },
    { russian: "Красный", japanese: "あかい", syllables: ["あ","か","い"] },
    { russian: "Синий", japanese: "あおい", syllables: ["あ","お","い"] },
    { russian: "Собака", japanese: "いぬ", syllables: ["い","ぬ"] },
    { russian: "Кошка", japanese: "ねこ", syllables: ["ね","こ"] },
    { russian: "Кофе", japanese: "コーヒー", syllables: ["コ","ー","ヒ","ー"] },
    { russian: "Хлеб", japanese: "パン", syllables: ["パ","ン"] },
    { russian: "Вода", japanese: "みず", syllables: ["み","ず"] }
];

function getRandomBuildWord() {
    const randomIndex = Math.floor(Math.random() * BUILD_WORDS_DATABASE.length);
    return { ...BUILD_WORDS_DATABASE[randomIndex] };
}

console.log(`📚 Загружено слов для составления: ${BUILD_WORDS_DATABASE.length}`);