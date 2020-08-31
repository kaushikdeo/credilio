const router = require('express').Router();
const Movie = require('../models/movie');

router.get('/movies', async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const orderBy = Number(req.query.orderBy) === 1 ? 1 : -1;
    const filterString = req.query.filter ? req.query.filter.toString() : "";
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'imdbRating' ;
    console.log('req.query.filterByDescription', req.query.filterByDescription);
    const filterByDescription = Number(req.query.filterByDescription) === 0 ? false : true;
    console.log('filterByDescription', filterByDescription);
    let filterQuery = {
        name: new RegExp(filterString, 'i'),
    };
    if (filterByDescription) {
        console.log('I am in');
        filterQuery = {
            $or: [{ description: new RegExp(filterString, 'i') }, { name: new RegExp(filterString, 'i'), }]
        };
    };
    const sortQuery = {
        [sortBy]: orderBy,
    };
    const moviesLength = await Movie.countDocuments(filterQuery);
    console.log('filterQuery', filterQuery);
    const allMovies = await Movie.find(filterQuery).limit(limit).skip(startIndex).sort(sortQuery);
    res.send({
        allMovies,
        totalMovies: moviesLength,
        currentPage: page,
        moviesPerPage: limit,
    });
});

module.exports = router;