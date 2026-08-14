const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const endings = [
    'ありません。', '適用されます。', 'ご案内します。', '学習環境です。', '学べます。', 
    '整理された。', '感じた。', '見えてきた。', '必要だからです。', 'ことにあります。', 
    '変わっていく。', '選べます。', 'ライブラリーです。', '学びます。', '身につけます。', 
    '場所です。', '価値があります。', '承っておりません。', '決済されます。', 'ご確認ください。', 
    '可能です。', '発生します。', '可能性があります。', '高めます。', 'つなげてください。', 
    '確認します。', '終わる場合', '学ぶ場合', '場合があります。'
];

for (const ending of endings) {
    // Escape regex characters
    const escaped = ending.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    // Using positive lookahead to avoid wrapping inside </span> but JS doesn't support negative lookbehind for all versions.
    // We can just use split and join if we're careful.
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
