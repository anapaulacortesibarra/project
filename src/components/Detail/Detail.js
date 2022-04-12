import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideogameDetail } from '../../redux/actions';
import Navbar from '../Navbar/Navbar';
import style from './Detail.module.css'

const Detail = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const game = useSelector(state => state.detail)
  let gameId = params.id;

  useEffect(() => {
    dispatch(getVideogameDetail(gameId))
  }, [dispatch, gameId, game]);

  return (
    <div>
      <Navbar />
      <div className={style.container}>
        {
          Object.keys(game).length ?
            <div className={style.detailContainer}>
              <img className={style.image} src={game.data.background_image} />
              <div className={style.data}>
                <h3 >{game.data.name}</h3>
                <h6>Genres: {game.data.genres}</h6>
                <h6>Released: {game.data.released}</h6>
                <h6>Description: {game.data.description_raw}</h6>
                <h6>Platforms: {game.data.platforms}</h6>
                <h6>Rating: {game.data.rating}</h6>
              </div>
            </div>
            : <h1>loading</h1>
        }
      </div>
    </div>
  )
}
export default Detail;

