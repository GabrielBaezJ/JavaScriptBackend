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

exports.searchArticles = async (req, res) => {
    try {
        const params = {
            query: req.query.q || req.query.query || 'science',
            field: req.query.field || 'everything',
            rows: parseInt(req.query.rows || req.query.limit || 20),
            start: parseInt(req.query.start || req.query.offset || 0),
            sortBy: req.query.sortBy || req.query.sort || 'score',
            order: req.query.order || 'desc'
        };

        const result = await articleModel.searchArticles(params);
        res.json(result);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            error: "Error searching articles",
            message: error.message 
        });
    }
};
