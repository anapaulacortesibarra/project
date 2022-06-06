require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { allVideogames, getGamesAPI, getVideogamesDB } = require('../utils/getVideogames')

router.get("/", async (req, res) => {

  const { name } = req.query;
  const videogames = await allVideogames()

  if (!name) {
    res.status(200).send(videogames)
  } else {

    let videogame = videogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))

    if (videogame.length >= 1) {
      videogame.slice(0, 16);
      return res.json(videogame);
    } else {
      res.status(404).json({ msg: "The game does not exist" });
    }
  }

});

router.get('/origen', async (req, res) => {
  const { origen } = req.query

  if (origen === 'db') {
    try {
      let data = await getVideogamesDB()
      res.send(data)
    } catch (error) {
      res.status(404).send(error)
    }
  } else if (origen === 'all') {
    try {
      let allData = await allVideogames()
      res.send(allData)
    } catch (error) {
      res.status(404).send(error)
    }
  } else {
    try {
      let APIGames = await getGamesAPI(`https://api.rawg.io/api/games?key=3b5f14eb332c46a398d8f5867c3eaef0`)
      res.send(APIGames)
    } catch (error) {
      res.status(404).send(error)
    }
  }
})



module.exports = router;

