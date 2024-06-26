const { User } = require('../models');
const sequelize = require('../config/database');

// User.sync();
const results = [];

const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
    // 1. 從請求中取得使用者的註冊資訊
    const { user, password, email } = req.body;

    // 2. 使用 bcrypt 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 建立新使用者
    const newUser = await User.create({
        user,
        password: hashedPassword,
        email
    });

    // 4. 回傳新建立的使用者資訊
    res.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
};

const login = async (req, res) => {
    try {
        // 1. 從請求中取得使用者的登入資訊
        const { user, password } = req.body;

        // 2. 在資料庫中查詢使用者
        const foundUser = await User.findOne({
        where: {
            user: user
        }
        });

        // 3. 如果找不到使用者,回傳錯誤
        if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password' });
        }

        // 4. 比較使用者輸入的密碼與資料庫中儲存的密碼
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        // 5. 如果密碼不正確,回傳錯誤
        if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
        }

        // 6. 如果使用者和密碼都正確,回傳使用者資訊
        res.status(200).json({ message: 'Login successful', user: foundUser });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
};

module.exports = {
    register,
    login,
};