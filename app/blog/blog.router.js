const express = require("express");
const router = express.Router();
const blogController = require('./blog.controller');
const authController = require('../auth.controller');

router.route("/create").post([authController.auth,blogController.createBlog]);
router.route("/update").put([authController.auth,blogController.updateBlog]);
router.route("").get([authController.auth,blogController.get]);
router.route("/list").post([authController.auth,blogController.list]);
module.exports = router;

