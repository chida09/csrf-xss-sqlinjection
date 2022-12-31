const express = require("express")
const mysql = require("mysql")
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const port = 3200

const sessionOption = {
  secret: 'my secret',    //本番環境ではわかりにくいキーを設定すること
  resave: false,          //trueにするとsessionに変更がなくても強制的に保存 通常false
  saveUninitialized: false, //trueにすると初期はされていなくても保存 通常false
  cookie: { maxAge: 60 * 60 * 1000 } //cookieの寿命 単位はミリ秒
}
app.use(session(sessionOption))
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
  console.log('req.body.name', req.body)
    req.session.login = req.body.name
    res.redirect('/')
    // connect.close()
  // })
})

// ログアウト
app.get('/logout', (req, res) => {
  req.session.login = undefined

  res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
