const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const videogames = require("./videogames");
const videogame = require("./videogame");
const genres = require("./genres");
const platforms = require("./platforms")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogames);
router.use("/videogame", videogame);
router.use("/genres", genres);
router.use("/platforms", platforms);
router.delete("/videogame/:id", videogame)

module.exports = router;
