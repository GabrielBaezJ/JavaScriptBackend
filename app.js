const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
app.use(cors());

app.use("/api/articles", articleRoutes);

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
