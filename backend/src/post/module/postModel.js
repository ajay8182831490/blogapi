
const { logError } = require('../../../util/logger');
const { getPaginatedData } = require("../../../util/db");
const path = require('path');
const userSchema = require('../../../model/user');
const getPool = require("../../../util/db");
const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');

const { encryptPassword, getPasswordInfo, verifyPassword } = require("../../../util/password");
const { getToken } = require('../../../util/util');
const postSchema = require('../../../model/post');


const { sendEmail } = require('../../../util/util');


class Post {

    constructor(title, categories, description, images, createdBy) {
        this.title = title,
            this.categories = categories,
            this.description = description,
            this.createdBy = createdBy
        this.images = images ? images : ""


    }

    async save() {

        try {


            const conn = await getPool();


            let result = await postSchema.create({
                title: this.title, categories: this.categories, description:
                    this.description, createdBy: Types.ObjectId(this.createdBy), images: this.images
            });


            let user = await userSchema.findById(Types.ObjectId(this.createdBy));

            user.postIds.push((Types.ObjectId(result._id)));
            await user.save();







            return result;
        } catch (ex) {
            logError(ex, path.basename(__filename));
            throw new Error(ex.message);
        }
    }
    static async findById(id) {
        try {
            const conn = await getPool();
            return await postSchema.findById(id);
        }
        catch (ex) {
            logError(ex, path.basename(__filename));
            throw new Error(ex.message);

        }
    }
    static async updatePost(id, data) {
        try {
            const conn = await getPool();
            return await postSchema.findByIdAndUpdate(id, data, { new: true });
        } catch (ex) {
            logError(ex, path.basename(__filename));
            throw new Error(ex.message);
        }
    }
    static async deletePost(id) {
        try {
            const conn = await getPool();
            return await postSchema.findByIdAndDelete(id);

        } catch (error) {

        }
    }



}




module.exports = Post;