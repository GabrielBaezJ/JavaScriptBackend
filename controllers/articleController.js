const articleModel = require("../models/articleModel");

exports.fetchArticles = async (req, res) => {
    try {
        const articles = await articleModel.getArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Error fetching articles" });
    }
};
