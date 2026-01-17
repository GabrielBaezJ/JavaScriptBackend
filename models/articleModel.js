const axios = require("axios");

exports.getArticles = async (searchTerm = 'university') => {
    const url = `https://api.plos.org/search?q=title:(${searchTerm})`;

    const response = await axios.get(url);
    return response.data.response.docs;
};

exports.searchArticles = async (params) => {
    const {
        query = 'science',
        field = 'everything',
        rows = 20,
        start = 0,
        sortBy = 'score',
        order = 'desc'
    } = params;

    // Construir la consulta según el campo especificado
    let searchQuery;
    if (field === 'everything') {
        searchQuery = query;
    } else if (field === 'title') {
        searchQuery = `title:(${query})`;
    } else if (field === 'abstract') {
        searchQuery = `abstract:(${query})`;
    } else if (field === 'author') {
        searchQuery = `author:(${query})`;
    } else if (field === 'subject') {
        searchQuery = `subject:(${query})`;
    } else {
        searchQuery = `${field}:(${query})`;
    }

    // Construir ordenamiento
    const sortParam = order === 'asc' ? sortBy : `${sortBy} desc`;

    const url = `https://api.plos.org/search?q=${encodeURIComponent(searchQuery)}&rows=${rows}&start=${start}&sort=${encodeURIComponent(sortParam)}`;

    try {
        const response = await axios.get(url);
        return {
            articles: response.data.response.docs,
            total: response.data.response.numFound,
            start: start,
            rows: rows
        };
    } catch (error) {
        throw new Error('Error fetching articles from PLOS API');
    }
};
