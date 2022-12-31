/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require("express")
const mysql = require("mysql")
const app = express()
const bodyParser = require('body-parser')
const port = 3200

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'test',
  port: 3308
})

app.get('/', (req, res) => {
  const sql = "select * from users";
  con.query(sql, function (err, result, fields) {
    if (err) throw err
    res.render('index',{users : result})
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
