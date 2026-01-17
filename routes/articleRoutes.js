const express = require("express");
const router = express.Router();
const controller = require("../controllers/articleController");

// Dynamic search endpoint
// Usage: GET /api/articles?search=technology
router.get("/", controller.searchArticles);

module.exports = router;
