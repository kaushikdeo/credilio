const cheerio = require('cheerio');
const request = require('request-promise');
const Movie = require('../models/movie');

const getJsonFromUrl = (url) => {
    if(!url) url = location.search;
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }

const fetchData = async (REQUEST_URL) => {
    try {
        const response = await request({
            uri: REQUEST_URL,
        });
        const $ = cheerio.load(response);
    
        const title = $('div[class="lister-item-content"] > h3 > a').append("&").text().trim();
        const imdbRating = $('div[class="ratings-bar"] > div > strong').append("&").text().trim();
        const description = $('p[class="text-muted"]').append("&").text().trim();
        const pgRating = $('span[class="certificate"]').append("&").text().trim();
        const genre = $('span[class="genre"]').append("&").text().trim();
        const duration = $('span[class="runtime"]').append("&").text().trim();
        const imageUrl = $('img[class="loadlate"]').append("&").attr('src');
        const allTitles = title.split("&").slice(0,-1);
        const allImdbRating = imdbRating.split("&").slice(0,-1);
        const allDescriptions = description.split("&").slice(0,-1);
        const allPgRating = pgRating.split("&").slice(0,-1);
        const allGenres = genre.split("&").slice(0,-1);
        const allDurations = duration.split("&").slice(0,-1);
        for(let i=0; i < allTitles.length; i++) {
            Movie.create({
                name: allTitles[i],
                pgRating: allPgRating[i],
                imdbRating: allImdbRating[i],
                description: allDescriptions[i],
                duration: Number(allDurations[i].split("min")[0]),
                genre: allGenres[i].split(","),
                poster: 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/large/film-184890147._CB466725069_.png',
            }, {upsert: true});
        }
    
        const queryParamerters = await getJsonFromUrl(REQUEST_URL);
        const start = queryParamerters.start ? Number(queryParamerters.start) : 1;
        const count = Number(queryParamerters.count);
        if (start < 200 ) {
            fetchData(`https://www.imdb.com/search/title/?groups=top_1000&sort=user_rating,desc&count=10&start=${start+count}&ref_=adv_nxt`)
        } else {
            return
        }
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = fetchData;