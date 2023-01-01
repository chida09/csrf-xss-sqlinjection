const express = require("express")
const mysql = require("mysql")
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bcrypt = require("bcryptjs")
const port = 3222

const sessionOption = {
  // 必須項目（署名を行うために使います）
  secret: 'my secret',
  // 推奨項目（セッション内容に変更がない場合にも保存する場合にはtrue）
  resave: false,
  // 推奨項目（新規にセッションを生成して何も代入されていなくても値を入れる場合にはtrue）
  saveUninitialized: true,
  // 生存期間（単位：ミリ秒）
  cookie: {maxAge: 60 * 60 * 1000},
  // クッキー名（デフォルトでは「connect.sid」）
  name: 'my-site-cookie',
  // アクセスの度に、有効期限を伸ばす場合にはtrue
  rolling: true,
}
app.use(session(sessionOption))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'test',
  port: 3308
})

// View - ユーザー一覧
app.get('/', (req, res) => {
  const sql = "select * from users"
  connect.query(sql, function (err, result, fields) {
    if (err) throw err
    res.render('index', {users: result})
  })

})

// View - ユーザー情報
app.get('/member', (req, res) => {
  // const sql = "select * from users where name"
  // connect.query(sql, function (err, result, fields) {
  //   if (err) throw err
  res.render('member', {
    session: req.session.user,
    cookies: req.cookies['my-site-cookie'],
    id: 1
  })
  // })
})

// API - 新規アカウント作成
app.post('/', (req, res) => {
  const sql = "INSERT INTO users (name, password, email, hash_password) VALUES (?,?,?,?)"
  const {name, password, email} = req.body
  connect.query(sql, [name, password, email, createHashPassword(password)], function (err, result, fields) {
    if (err) throw err
    res.redirect('/')
  })

})

// API - ログイン
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?"
  connect.query(sql, req.body.email, function (err, result, fields) {
    if (err) throw err

    // パスワードの検証 本来は403エラーページにとばす
    const isValidate = validatePassword(req.body.password, result[0].hash_password)
    if (!isValidate === false) {
      alert('Error 403')
    }

    // セッションに保存する
    req.session.user = req.cookies['my-site-cookie']
    res.redirect('/member')
  })


})

// API - ユーザー名の変更（id: 1で固定）
app.post('/user', (req, res) => {
  const sql = "UPDATE users SET name = ? WHERE id = ?"
  connect.query(sql, [req.body.name, req.body.id], (err, result, fields) => {
    if (err) throw err
    // req.session.user.name = req.body.name
    res.redirect('/member')
  })

})

// API - ログアウト
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/**
 * パスワードを検証
 * @see https://blog.myntinc.com/2022/01/phppasswordhashpasswordverifynodejs.html
 * @param inputPassword
 * @param savedPassword
 * @returns bool
 */
const validatePassword = (inputPassword, savedPassword) => {
  // const len = 11

  // パスワードをhash化
  // const salt = bcrypt.genSaltSync(len)
  // const hash = bcrypt.hashSync(inputPassword, salt)
  console.log('inputPassword', inputPassword)
  console.log('savedPassword', savedPassword)

  return bcrypt.compareSync(inputPassword, savedPassword)
}

/**
 * ハッシュ化されたパスワードを生成
 * @param pass
 * @returns string
 */
const createHashPassword = (pass) => {
  const len = 11

  // パスワードをhash化
  const salt = bcrypt.genSaltSync(len)
  return bcrypt.hashSync(pass, salt)
}
