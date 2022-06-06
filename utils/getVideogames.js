const { API_KEY } = process.env
require("dotenv").config();
const { Videogame, Genre } = require('../db')
const axios = require('axios')

let getGamesAPI = (url, dataAPI = [], count = 0) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        response.data.results.forEach((element) => {
          dataAPI.push({
            id: element.id,
            name: element.name,
            background_image: element.background_image,
            rating: element.rating,
            released: element.released,
            genres: element.genres.map((g) => g.name).join(", "),
            platforms: element.platforms.map((m) => m.platform.name).join(", "),
          });
        });
        url = response.data.next;
        ++count;
        if (count === 5) resolve(dataAPI);
        else resolve(getGamesAPI(url, dataAPI, count));
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

const getVideogamesDB = async () => {
  let videogames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ['name', 'id'],
      through: {
        attributes: []
      }
    }
  })

  const array = [...videogames]
  const videogamesDB = array.map(element => {
    return {
      id: element.id,
      name: element.name,
      background_image: element.background_image,
      rating: element.rating,
      released: element.released,
      genres: element.genres.map((g) => g.name).join(", "),
      platforms: element.platforms,
      description: element.description_raw,
      createdInDb: element.createdInDb
    }
  })
  return videogamesDB;
}

const allVideogames = async () => {
  const API = await getGamesAPI(`https://api.rawg.io/api/games?key=${API_KEY}`)
  const DB = await getVideogamesDB()
  const allgames = API.concat(DB)
  return allgames
}


module.exports = {
  getGamesAPI,
  getVideogamesDB,
  allVideogames
};
