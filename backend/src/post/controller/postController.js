const path = require('path');
const { logError, logInfo } = require('../../../util/logger');
const mongoose = require('mongoose')
const postSchema = require("../../../model/post");
const getPool = require('../../../util/db')
const { Types } = require('mongoose');

// createpost,deletepost,updatePost

const postService = require("../services/postServices");



const createPost = async (req, res, next) => {
    logInfo("going to create a new post", path.basename(__filename), createPost.name);

    try {

        const { title, categories, description, images } = req.body;


        const createdBy = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(createdBy)) {
            return res.status(400).json({ message: 'Bad Request - Invalid createdBy value' });
        }



        let result = await postService.createPost(title, categories, description, images, createdBy);
        res.status(200).json(result);

    } catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(500).json("internal server error");

    }
}
const updatePost = async (req, res, next) => {
    logInfo("going to update post", path.basename(__filename), updatePost.name);

    try {


        const { postId } = req.params;

        try {

            const conn = await getPool();
            const userSame = await postSchema.find({ $and: [{ _id: postId }, { createdBy: Types.ObjectId(req.user.userId) }] });

            if (userSame) {

                let result = await postService.updatePost(postId, req.body);

                if (!result) {
                    res.status(401).json("somehing error occured");
                }
                else {

                    res.status(200).json({ msg: "record updated" });
                }
            }
            else {
                res.status(401).json({ msg: "you cannot edit the post" });
            }


        } catch (ex) {
            logError(ex, path.basename(__filename));
            throw new Error(ex.message);

        }


    } catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(500).json("internal server error");

    }

}

const deletePost = async (req, res, next) => {
    logInfo("going to update post", path.basename(__filename), deletePost.name);

    try {


        const { postId } = req.params;

        try {

            const conn = await getPool();
            const userSame = await postSchema.find({ $and: [{ _id: postId }, { createdBy: Types.ObjectId(req.user.userId) }] });

            if (userSame) {

                let result = await postService.deletePost(postId);

                if (!result) {
                    res.status(401).json("somehing error occured");
                }
                else {

                    res.status(200).json({ msg: "record deleted from system" });
                }
            }
            else {
                res.status(401).json({ msg: "you cannot edit the post" });
            }


        } catch (ex) {
            logError(ex, path.basename(__filename));
            throw new Error(ex.message);

        }


    } catch (ex) {
        logError(ex, path.basename(__filename));
        res.status(500).json("internal server error");

    }

}
module.exports = { createPost, updatePost, deletePost };