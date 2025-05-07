const jwt = require('jsonwebtoken');
require('dotenv').config();


const auth = (req, res, next) => {
    const while_lists = ['/','/user','/login'];
    if(while_lists.find(item => '/v1/api' + item === req.originalUrl)){
        next();
    }else {
        if (req?.headers?.authorization?.split(' ')?.[1]){
            const token = req.headers.authorization.split(' ')[1];

            //veryfy
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log('token: ', decoded);
                req.user = {
                    phone: decoded.phone,
                    name: decoded.name
                }

                next();
            } catch (error) {
                return res.status(401).json({
                    mesage: "token bi het han hoac khong hop le"
                })
            }
        }else {
            //return exception
            return res.status(401).json({
                mesage: "Bạn chưa truyền access token ở header/ hoặc token bị hết hạn"
            })
        }
    }
}

module.exports = auth;