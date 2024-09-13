const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorization = (req, res, next) => {
    // ดึง Token จาก Header และแยก Bearer ออก
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // ใช้ Bearer <token>

    if (token === undefined) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized"
        });
    }

    jwt.verify(token, process.env.KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
        } else {
            req.user = decode;
            next();
        }
    });
};

module.exports = authorization;