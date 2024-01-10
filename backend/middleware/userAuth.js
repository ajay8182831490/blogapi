const jwt = require('jsonwebtoken');
const getPool = require('../util/db');
const userSchema = require("../../backend/model/user");


const userAuth = async (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        res.status(401).send({ error: "please authentication using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);





        req.user = {
            userId: data.user,
            // Add other user-related information if needed
        };
        let conn = await getPool();

        let userinfo = await userSchema.findById(data.user.id);
        if (userinfo.isVerified) {
            next();
        }
        else {
            res.status(401).json("please verify the account");
        }





    } catch (ex) {

        res.status(401).send({ error: "please authentication using a valid token" });

    }

}





module.exports = userAuth;