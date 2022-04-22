import { Link } from 'react-router-dom'
import style from './Card.module.css'

const Card = ({ name, background_image, genres, id }) => {


  return (
    <div key={id} className={style.card}>
      <img className={style.image} src={background_image} alt='not found' />
      <div className={style.gameInfo}>
        <div className={style.name}><h6>{name}</h6></div>
        <div className={style.genres}><h6>{genres}</h6></div>
        <Link to={`/videogame/${id}`}>
          <button className={style.button}>Read more information</button>
        </Link>
      </div>
    </div>
  )
}

export default Card;