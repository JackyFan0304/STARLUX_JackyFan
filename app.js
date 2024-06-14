const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bcrypt = require('bcrypt');
const router = require("./router");
const mysql = require('mysql');

// 設定資料庫連線
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'starlux',
  user: 'root',
  password: 'P@ssw0rd',
});

// 連接資料庫
connection.connect((err) => {
  if (err) {
    console.error('連接資料庫時發生錯誤:', err);
    return;
  }
  console.log('已成功連接資料庫');
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is app.js!');
});

app.use("/router", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 