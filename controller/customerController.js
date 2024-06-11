const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, '..', 'passwords.json');

const register = (req, res) => {
    
    const { username, password, email } = req.body;  
  
    // 讀取 JSON 檔案 
    // TODO 連結資料庫...
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const passwordsData = JSON.parse(fileContent);

    // 使用 bcrypt 雜湊密碼
    // const hashedPassword = bcrypt.hashSync(password, 10);   
    
    // TODO 添加進資料庫...   
    const existingUser = passwordsData.users.find((user) => user.user === username);
    if (existingUser) {
        res.status(400).json({ message: '用戶 ID 已經被使用' });
    } else {
        passwordsData.users.push({
            user: username,
            password: password,
        });
        // 將新的用戶資訊添加到 JSON 檔案中
        fs.writeFile(filePath, JSON.stringify(passwordsData, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: '儲存用戶資料時發生錯誤' });
            } else {
                res.status(201).json({ message: '用戶註冊成功' });
            }
        });
    }
}

const login = (req, res) => {    
    const { username, password } = req.body;

    // 讀取 JSON 檔案
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const passwordsData = JSON.parse(fileContent);

    // 在 JSON 檔案中查找用戶資訊
    const users = passwordsData.users.filter((u) => {
        // console.log(u);
        console.log(u.user);
        console.log(username); 
        return u.user === username;
    });
        
    // console.log(`user: ${JSON.stringify(user)}`);
    // console.log(`username: ${username}`);    
    // console.log(`passwordsData: ${JSON.stringify(passwordsData, null, 2)}`);
    // if (user && bcrypt.compareSync(password, user.password)) {
    if (users.length > 0) {
        console.log(users);
        const user = users[0];
        // 檢查密碼是否正確
        if (password === user.password) {
            // 登入成功,生成 JWT 並返回                 
            // const token = generateJWT(username);
            // res.json({ token: token });
            console.log(password); 
            console.log(user.password); 
            res.status(200).json({ message: 'successful login' });        
        } else {
            // 密碼不正確,返回錯誤訊息
            console.log(password); 
            console.log(user.password); 
            res.status(401).json({ message: 'Invalid password' });
        }
    } else {
        // 用戶不存在,返回錯誤訊息
        res.status(404).json({ message: 'User not found' });
    }
}

module.exports = {
    register,
    login,
};