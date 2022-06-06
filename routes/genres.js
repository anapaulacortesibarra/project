const { Router } = require("express");
const router = Router();
const { Genre } = require('../db')
const axios = require('axios')

router.get("/", async (req, res) => {
  const check = await Genre.findOne({ where: { id: 4 } });

  if (check === null) {
    const genresAPI = await axios.get(
      `https://api.rawg.io/api/genres?key=3b5f14eb332c46a398d8f5867c3eaef0`
    );
    const genresInDB = genresAPI.data.results.map((g) => {
      return {
        id: g.id,
        name: g.name,
      };
    });
    const genres = await Genre.bulkCreate(genresInDB);
    res.json(genres);
  } else {
    const genres = await Genre.findAll();
    res.json(genres);
  }
});





module.exports = router;