const express = require("express");
const router = express.Router();

const userRouter = require('./user/user.router');
const blogRouter = require('./blog/blog.router');

router.use('/user',userRouter);
router.use('/blog',blogRouter);

module.exports = router;
