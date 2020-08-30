const express = require('express');

const {
    PORT = 5000,
} = process.env;

const app = express();

app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
})
