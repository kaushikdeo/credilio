## Steps to run

### `git clone https://github.com/kaushikdeo/credilio_react.git`
### `cd credilio_react/`
### `npm i`
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

when you visit the root route nodejs will scrape the imdb url for various movies and their meta
and store it in mongodb replica set

You will have to visit the root route before going to the frontend.
I have kept the front end seperate from the inital fetch of data because this route can be used frequently to fetch more data / edit existing data.

once the data is pushed to db all the search operations happen from the db.
This is done so that we have a backup of the IMDB data and also the requests to IMDB are reduced thus reducing our chances of blacklisting IP ( if at all they have such kind of system in place.)

Please clone the frontend repo after you have finished with the above process.
