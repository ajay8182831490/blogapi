require('dotenv').config({ path: './config/global.env' });
const path = require('path');
const getPool = require("../backend/util/db.js");


const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const log = require('node-file-logger');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const fileName = path.basename(__filename);
const { logError, logDebug, logInfo, logWarn } = require('./util/logger.js');
const nodemailer = require('nodemailer');
app = express();
app.use(cors())
app.use(express.json());
app.use(fileUpload());


app.use(express.static('./public'));


app.use('/uploads', express.static('uploads'));
app.use(require('../backend/src/user/routes/userRoutes.js'))
app.use(require('../backend/src/post/routes/postRoutes.js'));
app.use(require('../backend/src/comment/routes/commentRoutes.js'));























app.listen(3000, () => {
  console.log('app is running on port 3000');
})
