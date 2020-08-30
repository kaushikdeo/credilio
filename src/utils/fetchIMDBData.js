const cheerio = require('cheerio');
const request = require('request-promise');

const fetchData = async (REQUEST_URL) => {
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
    const allTitles = title.split("&").slice(0,-1);
    const allImdbRating = imdbRating.split("&").slice(0,-1);
    const allDescriptions = description.split("&").slice(0,-1);
    const allPgRating = pgRating.split("&").slice(0,-1);
    const allGenres = genre.split("&").slice(0,-1);
    const allDurations = duration.split("&").slice(0,-1);
}

module.exports = fetchData;