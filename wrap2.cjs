const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const endings = [
    'ありましたか？',
    '変えていく。',
    'まで続ける。',
    '生まれる。',
    '始められます。',
    '感じた方へ。',
    'ために。',
    'ご確認ください', // For the h2 without punctuation
    '説明できる',
    '組み立てる',
    '応用できる',
    '判断できる',
    '別に探す',
    '別に学ぶ',
    '悩みから探す',
    '使いたい',
    '深めたい',
    '増やしたい',
    '深く学びたい',
];

for (const ending of endings) {
    const parts = html.split(ending);
    for (let i = 0; i < parts.length - 1; i++) {
        if (!parts[i].endsWith('<span class="ib">')) {
            parts[i] = parts[i] + '<span class="ib">' + ending + '</span>';
        } else {
            parts[i] = parts[i] + ending;
        }
    }
    html = parts.join('');
}

fs.writeFileSync('index.html', html, 'utf8');
