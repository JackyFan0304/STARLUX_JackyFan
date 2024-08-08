const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY; // 從環境變數中獲取密鑰

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // 獲取 token

    if (!token) {
        return res.sendStatus(401); // 如果沒有提供 token，返回 401 未授權
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // 如果 token 無效，返回 403 禁止訪問
        }
        console.log(user);
        req.user = user; // 將用戶信息附加到請求中
        next(); // 繼續處理請求
    });
};

module.exports = authenticateJWT; // 將中介軟體導出