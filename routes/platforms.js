const { Router } = require('express')
const router = Router()


const platforms = ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series S/X", "Nintendo Switch", "Xbox", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi",
  "macOS", "Linux", "Xbox 360", "PlayStation 3", "PlayStation 2", "PlayStation", "Wii"]

router.get('/', (req, res) => {
  try {
    res.send(platforms)
  } catch (error) {
    res.status(404).send('Ups, something went wrong')
  }
})








module.exports = router;