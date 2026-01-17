const articleModel = require("../models/articleModel");

exports.searchArticles = async (req, res) => {
    try {
        // Get search term from query params
        const searchTerm = req.query.search;

        // Validate input - avoid empty search
        if (!searchTerm || searchTerm.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Search term is required',
                message: 'Please provide a search query using ?search=your_term'
            });
        }

        // Validate search term length
        if (searchTerm.trim().length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Search term too short',
                message: 'Search term must be at least 2 characters long'
            });
        }

        // Call model to search articles
        const result = await articleModel.searchArticles(searchTerm.trim());

        // Return filtered results
        return res.status(200).json(result);

    } catch (error) {
        console.error('Search error:', error.message);
        
        // Handle different types of errors
        if (error.message.includes('timeout')) {
            return res.status(504).json({
                success: false,
                error: 'Gateway Timeout',
                message: 'The search request took too long. Please try again.'
            });
        }

        if (error.message.includes('PLOS API error')) {
            return res.status(502).json({
                success: false,
                error: 'External API Error',
                message: error.message
            });
        }

        // Generic error handler
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: 'An error occurred while searching articles'
        });
    }
};
