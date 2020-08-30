const express = require('express');
const mongoose = require('mongoose');
const fetchData = require('./utils/fetchIMDBData');

const {
    PORT = 5000,
    REQUEST_URL = 'https://www.imdb.com/search/title/?groups=top_1000&sort=user_rating,desc&count=10&ref_=adv_nxt',
    MONGODB_URL = 'mongodb+srv://kaushikmdeo:kaushik123@frontm.zltir.mongodb.net/frontm?retryWrites=true&w=majority',
} = process.env;

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.get('/', async (req, res, next) => {
    await fetchData(REQUEST_URL);
    res.send("response");
});

app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
})
