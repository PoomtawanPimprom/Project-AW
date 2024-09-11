const jwt = require('jsonwebtoken');
require("dotenv").config()
// const makeHash = async (plainText) => {
//     const result = await bcrypt.hash(plainText, 10);
//     return result;
// };

// const compareHash = async (plaintext, hashtext) => {
//     try {
//         const result = await bcrypt.compare(plaintext, hashtext);
//         return { status: result };
//     } catch (error) {
//         throw new Error("Error bcrypt compare");
//     }
// };

const authorization = ((req, res, next) =>{
    const token = req.headers["authorization"];
    if (token === undefined) {
        return res.status(401).json({
            status: 401,
            "message": "Unauthorized"
        })
    } 
    else {
        jwt.verify(token,process.env.KEY,(err, decode)=>{
            if (err) {
                return res.status(401).json({
                    status: 401,
                    "message": "Unauthorized"
                })
            } else {
                next()
            }
        });    
    }
})

module.exports = authorization