import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

endings = [
    'ありません。', '適用されます。', 'ご案内します。', '学習環境です。', '学べます。', 
    '整理された。', '感じた。', '見えてきた。', '必要だからです。', 'ことにあります。', 
    '変わっていく。', '選べます。', 'ライブラリーです。', '学びます。', '身につけます。', 
    '場所です。', '価値があります。', '承っておりません。', '決済されます。', 'ご確認ください。', 
    '可能です。', '発生します。', '可能性があります。', '高めます。', 'つなげてください。', 
    '確認します。', '終わる場合', '学ぶ場合', '場合があります。'
]

for ending in endings:
    html = re.sub(r'(?<!<span class="ib">)(' + re.escape(ending) + r')(?!(?:</span>))', r'<span class="ib">\1</span>', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
