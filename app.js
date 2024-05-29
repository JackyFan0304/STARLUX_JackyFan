const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bcrypt = require('bcrypt');


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;  
  
    // 讀取 JSON 檔案 
    // TODO 連結資料庫...
    const fileContent = fs.readFileSync('passwords.json', 'utf8');
    const passwordsData = JSON.parse(fileContent);

    // 使用 bcrypt 雜湊密碼
    const hashedPassword = bcrypt.hashSync(password, 10); 
  
    
    // TODO 添加進資料庫...
    passwordsData.users.push({
      username: username,
      password: password,
    });
  
    // 將新的用戶資訊添加到 JSON 檔案中
    fs.writeFileSync('passwords.json', JSON.stringify(passwordsData, null, 2));
  
    res.status(201).json({ message: 'User registered successfully' });
});
  

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 讀取 JSON 檔案
    const fileContent = fs.readFileSync('passwords.json', 'utf8');
    const passwordsData = JSON.parse(fileContent);

    // 在 JSON 檔案中查找用戶資訊
    const user = passwordsData.users.find((u) => u.username === username);
    console.log(user);
    // if (user && bcrypt.compareSync(password, user.password)) {
    if (user && password === user.password ){
        // 登入成功,生成 JWT 並返回
        res.json({ token: 'your_generated_jwt_token' });
    } else {        
        res.status(401).json({ message: 'Invalid username or password' });
    }
});
  