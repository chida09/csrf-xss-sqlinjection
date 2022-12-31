const express = require("express")
const mysql = require("mysql")
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const port = 3200

const sessionOption = {
  // 必須項目（署名を行うために使います）
  secret: 'my secret',
  // 推奨項目（セッション内容に変更がない場合にも保存する場合にはtrue）
  resave: false,
  // 推奨項目（新規にセッションを生成して何も代入されていなくても値を入れる場合にはtrue）
  saveUninitialized: true,
  // 生存期間（単位：ミリ秒）
  cookie: { maxAge: 60 * 60 * 1000 },
  // クッキー名（デフォルトでは「connect.sid」）
  name : 'my-site-cookie',
  // アクセスの度に、有効期限を伸ばす場合にはtrue
  rolling : true,
}
app.use(session(sessionOption))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'test',
  port: 3308
})

// ユーザー一覧表示
app.get('/', (req, res) => {
  const sql = "select * from users"
  connect.query(sql, function (err, result, fields) {
    if (err) throw err
    res.render('index',{users : result})
  })
})

app.get('/member', (req, res) => {
  res.render('member', {
    session: req.session.user.name,
    cookies: req.cookies['my-site-cookie']
  })
})

// 新規アカウント作成
app.post('/', (req, res) => {
  const sql = "INSERT INTO users SET ?"
  connect.query(sql,req.body,function(err, result, fields){
    if (err) throw err
    res.redirect('/')
  })
})

// ログイン
app.post('/login', (req, res) => {
  // const sql = "SELECT * FROM users WHERE name = ? AND password = ?"
  // connect.query(sql,req.body.name, req.body.password,function(err, result, fields){
  //   if (err) throw err

  // セッションに保存する
  req.session.user = req.session.user || { name: req.body.name }
  res.redirect('/member')
  // })
})

// ログアウト
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
  console.log('req.session', req.session)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
