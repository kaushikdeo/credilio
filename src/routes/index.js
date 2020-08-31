const router = require('express').Router();
const Movie = require('../models/movie');

router.get('/movies', async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const orderBy = Number(req.query.orderBy) === 1 ? 1 : -1;
    const filterString = req.query.filter ? req.query.filter.toString() : "";
    let filterQuery = {}
    filterQuery = {
        name: new RegExp(filterString, 'i')
    }
    const moviesLength = await Movie.countDocuments(filterQuery);
    const allMovies = await Movie.find(filterQuery).limit(limit).skip(startIndex).sort({imdbRating: -1});
    res.send({
        allMovies,
        totalMovies: moviesLength,
        currentPage: page,
        moviesPerPage: limit,
    });
});

module.exports = router;