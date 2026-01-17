const axios = require("axios");

exports.getArticles = async (searchTerm = 'college') => {
    const url = `https://api.plos.org/search?q=title:${searchTerm}`;

    const response = await axios.get(url);
    return response.data.response.docs;
};
