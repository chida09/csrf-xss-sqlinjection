/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require("express")
const app = express()

/* 2. listen()メソッドを実行して3200番ポートで待ち受け。*/
const server = app.listen(3200, () => {
  console.log("Node.js is listening to PORT:" + server.address().port)
})

/* 3. 以後、アプリケーション固有の処理 */

// 写真のサンプルデータ
const photoList = [
  {
    id: "001",
    name: "photo001.jpg",
    type: "jpg",
    dataUrl: "http://localhost:3000/data/photo001.jpg"
  },{
    id: "002",
    name: "photo002.jpg",
    type: "jpg",
    dataUrl: "http://localhost:3000/data/photo002.jpg"
  }
]

// 写真リストを取得するAPI
app.get("/api/photo/list", (req, res) => {
  res.json(photoList)
})

// View EngineにEJSを指定。
app.set('view engine', 'ejs');

// "/"へのGETリクエストでindex.ejsを表示する。拡張子（.ejs）は省略されていることに注意。
app.get("/", function(req, res, next){
  res.render("index", {});
});
