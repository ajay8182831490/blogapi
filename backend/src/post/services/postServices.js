const path = require('path');
const bcrypt = require('bcrypt')

const usermodel = require("../module/postModel");
const userSchema = require('../../../model/user');


const { verifyPassword, encryptPassword } = require('../../../util/password');

const postModul = require("../module/postModel")

const createPost = async (title, categories, description, images, createdBy) => {

    try {

        const post = new postModul(title, categories, description, images, createdBy);
        return await post.save();


    } catch (ex) {
        throw new Error(ex.message);

    }

}
const updatePost = async (postId, data) => {
    try {





        const find = await postModul.findById(postId);


        if (find) {

            return await postModul.updatePost(postId, data);

        }
        else {
            return false;
        }


    } catch (ex) {
        throw new Error(ex.message);

    }

}
const deletePost = async (postId) => {
    try {
        return await postModul.deletePost(postId);
    } catch (ex) {
        throw new Error(ex.message);

    }
}










module.exports = { createPost, updatePost, deletePost };