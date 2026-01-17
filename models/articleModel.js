const axios = require("axios");

exports.getArticles = async () => {
    const url = "https://api.plos.org/search?q=title:university";

    const response = await axios.get(url);
    return response.data.response.docs;
};
