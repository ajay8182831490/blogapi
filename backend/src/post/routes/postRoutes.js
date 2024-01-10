const express = require('express');
const router = express.Router();

const paginate = require('../../middleware/paginationMiddleware')
const sort = require('../../middleware/sortingMiddleware');
const search = require('../../middleware/searchingMiddleware');
const upload = require('../../middleware/imageUpload');


const userAuth = require("../../../middleware/userAuth");


// create, update ,delete, uthentication first

const postController = require("../controller/postController");


router.post("/v1/user/post/newPost", userAuth, upload.single('media'), postController.createPost);
router.patch("/v1/user/post/updatePost/:postId", upload.single('media'), userAuth, postController.updatePost);

router.delete("/v1/user/post/deletePost/:postId", userAuth, postController.deletePost);


// we have need userid as well as all information of post






module.exports = router;