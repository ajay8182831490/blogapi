const express = require('express');
const router = express.Router();

const paginate = require('../../middleware/paginationMiddleware')
const sort = require('../../middleware/sortingMiddleware');
const search = require('../../middleware/searchingMiddleware');
const upload = require('../../middleware/imageUpload');


const userAuth = require("../../../middleware/userAuth");


const userController = require("../controller/userController");

router.post("/v1/signup", upload.single('media'), userController.addUser);
router.post("/v1/verify", userController.verifyOtp);

router.post("/v1/login/", userController.userLogin);

router.get("/v1/userProfile/:id", userAuth, userController.findUserProfile)

router.patch("/v1/user/update/:id", userAuth, upload.single('media'), userController.userUpdate);
router.patch("/v1/user/updatePassword/:id", userAuth, userController.userUpdatePassword);
router.get("/v1/user/post", userAuth, userController.findAllPost);

router.patch("/v1/user/resetUserPassword", userController.userResetPassword);

router.patch("/v1/user/resetPassword/", userController.resetPassword);





module.exports = router;