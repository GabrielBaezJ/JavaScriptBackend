const express = require("express");
const router = express.Router();
const controller = require("../controllers/articleController");

router.get("/", controller.fetchArticles);
router.get("/search", controller.searchArticles);

module.exports = router;
