const { Router } = require("express");
const router = Router();
const { Videogame, Genre } = require('../db')
const axios = require('axios');


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id.length > 10) {
      const videogameDB = await Videogame.findByPk(id, {
        include: Genre,
      });
      const data = {
        id: videogameDB.id,
        name: videogameDB.name,
        background_image: videogameDB.background_image,
        rating: videogameDB.rating,
        released: videogameDB.released,
        genres: videogameDB.genres.map((g) => g.name).join(", "),
        platforms: videogameDB.platforms.join(", "),
        description_raw: videogameDB.description_raw,
        createdInDb: videogameDB.createdInDb
      }
      res.json(data);
    } else {
      const { data } = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=3b5f14eb332c46a398d8f5867c3eaef0`
      );

      const videogamesDetail = {
        name: data.name,
        id: data.id,
        background_image: data.background_image,
        genres: data.genres.map((el) => el.name).join(", "),
        description_raw: data.description_raw,
        released: data.released,
        rating: data.rating,
        platforms: data.platforms.map((el) => el.platform.name).join(", "),
      };

      res.json(videogamesDetail);
    }
  } catch (error) {
    res.status(404).json(error)
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, released, description_raw, genreId, rating, platforms, background_image } = req.body

    const plat = platforms.map(el => el.value)


    if (name && released && description_raw && rating && genreId && plat) {
      let videogame = await Videogame.create({
        name,
        released,
        description_raw,
        platforms: plat,
        rating,
        background_image
      })
        .then(results => {
          return genreId.map(g => results.addGenre(g.value))
        })

      res.status(201).json(videogame)

    }
  } catch (error) {
    res.status(404).send(error, 'Ups, something went wrong')
  }
});

router.delete('/:id', async (req, res) => {

  const { id } = req.params
  const videogames = await Videogame.findAll()
  const checked = videogames.filter(el => el.id === id)

  if (checked.length) {
    return res.json(await Videogame.destroy({ where: { id: id } }))

  } else {
    res.status(404).send('Ups, something went wrong')
  }

})

module.exports = router;