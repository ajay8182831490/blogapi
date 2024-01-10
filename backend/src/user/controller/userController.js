const path = require('path');
const { logError, logInfo } = require('../../../util/logger');
const userService = require("../service/userService");


const addUser = async (req, res, next) => {
    logInfo("going to add new user in database", path.basename(__filename), addUser.name);
    const { name, email, password, image, otp } = req.body;



    try {



        let result = await userService.addUser(name, email, password, image, otp);
        if (result == false) {
            res.status(401).json("user already exist in database");
        }
        else if (result == 'otp') {
            res.status(401).json("incorrect otp");
        }
        else {


            res.status(201).json({ msg: "record added sucesfully" });

        }


    } catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(501).json("Internal Server error");

    }



}
const verifyOtp = async (req, res, next) => {
    logInfo("going to verify account", path.basename(__filename), verifyOtp.name);
    try {
        const { otp, email } = req.body;;
        let result = await userService.verifyOtp(otp, email);
        if (!result) {
            res.status(401).json('invalid otp');
        }
        else {
            res.status(200).json("account verified");
        }

    } catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(500).json("internal server error");

    }

}
const userLogin = async (req, res, next) => {
    logInfo("going to login the user by using email", path.basename(__filename), userLogin.name);

    const { email, password } = req.body;
    //  const data = req.body;
    //  console.log(data);

    try {
        let result = await userService.userLogin(email, password);


        if (result == false) {
            res.status(401).json("please enter the correct credentail");
        }
        else {
            res.status(201).json({ token: result });

        }

    } catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(501).json("Internal Server error");
    }
}

const userUpdate = async (req, res, next) => {
    logInfo("going to update  the user information", path.basename(__filename), userUpdate.name);
    const { id } = req.params;;
    const data = req.body;

    try {


        let result = await userService.userUpdate(id, data);
        res.status(200).json("record updated successfully");
    } catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(501).json("Internal Server error");
    }



}
const userUpdatePassword = async (req, res, next) => {

    logInfo("going to update password", path.basename(__filename), userUpdatePassword.name);
    const data = req.body;
    const { id } = req.params;




    try {

        let result = await userService.userUpdatePassword(id, data)



        if (!result) {
            res.status(401).json({ msg: "please enter correct password" });
        }
        else {

            res.status(200).json("password updated successfully");
        }

    } catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(501).json("Internal Server error");
    }
}
const userResetPassword = async (req, res, next) => {

    logInfo("going to send reset password link", path.basename(__filename), userResetPassword.name);
    try {

        const { email } = req.body;
        let result = await userService.userResetPassword(email);

        if (!result) {
            res.status(401).json("Enter a correct email");
        }
        else {
            res.status(200).json("For reset passwod link has been sent on your email");
        }

    }
    catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(501).json("Internal Server error");
    }

}

const resetPassword = async (req, res, next) => {
    logInfo("Going to reset password ", path.basename(__filename), resetPassword.name);
    try {

        const { token } = req.query;
        const { password } = req.body
        let result = await userService.resetPassword(token, password);

        if (!result) {
            res.status(401).json("please check your email or try to reset password again");
        }
        else {
            res.status(201).json({ msg: "password is successfully updated..." });
        }

    } catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(501).json("internal server error");

    }



}
const findUserProfile = async (req, res, next) => {


    logInfo("going to fetch all user information", path.basename(__filename), findUserProfile.name);
    const { id } = req.params;
    try {
        let result = await userService.findUserProfile(id);

        if (!result) {
            res.status(401).json("something error occured,please try again");
        }
        else {

            res.status(200).json(result);
        }

    } catch (ex) {
        logInfo(ex, path.basename(__filename));
        res.status(500).json("internal server error");

    }

}
const findAllPost = async (req, res, next) => {
    logInfo("Going to fetch all post list", path.basename(__filename), findAllPost.name);
    try {

        let result = await userService.findAllPost(req.user.userId);
        if (!result) {
            res.status(400).json('no post found');

        }
        else {
            res.status(200).json(result);
        }

    } catch (ex) {

        res.status(500).json('internal server error');

    }
}




module.exports = { addUser, userLogin, userUpdate, userUpdatePassword, userResetPassword, resetPassword, findUserProfile, findAllPost, verifyOtp };