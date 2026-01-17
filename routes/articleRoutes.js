const express = require("express");
const router = express.Router();
const controller = require("../controllers/articleController");

router.get("/", controller.fetchArticles);

module.exports = router;
