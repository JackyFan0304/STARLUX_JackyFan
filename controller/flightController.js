const express = require("express");
const router = express.Router();
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
  
const checkflights = async (req, res) => {
    try {
        const { departure_city, destination_city, departure_date, arrival_date, departure_time, arrival_time, cabin_class } = req.body;
        const results = await connection.query(
          `SELECT f.departure_city,f.destination_city,f.departure_date,f.arrival_date,f.departure_time,f.arrival_time,f.cabin_class 
           FROM flight f
           WHERE f.departure_city = ?
             AND f.destination_city = ?
             AND f.departure_date = ?
             AND f.arrival_date = ?
             AND f.departure_time = ?
             AND f.arrival_time = ?
             AND f.cabin_class = ?`,
        [departure_city, destination_city, departure_date, arrival_date, departure_time, arrival_time, cabin_class]
      );
      res.json(JSON.stringify(results, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          return JSON.stringify(value);
        }
        return value;
      }, 2));
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to retrieve flights');
    }
};


module.exports = {
    checkflights,
};