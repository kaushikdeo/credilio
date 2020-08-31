const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const moviesRoute = require('./routes');
const fetchData = require('./utils/fetchIMDBData');

const {
    PORT = 5000,
    REQUEST_URL = 'https://www.imdb.com/search/title/?groups=top_1000&sort=user_rating,desc&count=10&ref_=adv_nxt',
    MONGODB_URL = 'mongodb+srv://kaushikmdeo:kaushik123@frontm.zltir.mongodb.net/frontm?retryWrites=true&w=majority',
} = process.env;

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', async (req, res, next) => {
    try {
        if (await Movie.countDocuments().exec() <= 0){
            await fetchData(REQUEST_URL);
        }
    } catch (error) {
        console.log(error);
    }
    res.send("Welcome to web scraper");
});

app.use('/api', moviesRoute);

app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
})
