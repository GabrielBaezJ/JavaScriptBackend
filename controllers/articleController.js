const articleModel = require("../models/articleModel");

exports.fetchArticles = async (req, res) => {
    try {
        const searchTerm = req.query.q || 'college';
        const articles = await articleModel.getArticles(searchTerm);
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Error fetching articles" });
    }
};
