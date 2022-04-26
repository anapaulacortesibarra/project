import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { cleanDetail, getVideogameDetail } from '../../redux/actions';
import Navbar from '../Navbar/Navbar';
import style from './Detail.module.css'
import { Link } from 'react-router-dom';

const Detail = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const game = useSelector(state => state.detail)
  let gameId = params.id;

  useEffect(() => {
    dispatch(getVideogameDetail(gameId))
    return () => { dispatch(cleanDetail()) }
  }, [gameId]);


  return (
    <div>
      <Navbar />
      <div className={style.container}>
        {
          Object.keys(game).length ?
            <div className={style.detailContainer}>
              <img className={style.image} src={game.data.background_image} alt={'img'} />
              <div className={style.data}>
                <h3 >{game.data.name}</h3>
                <h6>Genres: {game.data.genres}</h6>
                <h6>Released: {game.data.released}</h6>
                <h6>Description: {game.data.description_raw}</h6>
                <h6>Platforms: {game.data.platforms}</h6>
                <h6>Rating: {game.data.rating}</h6>
                <div className={style.button}>
                  <Link className={style.link} to="/videogames">
                    GO BACK
                  </Link>
                </div>



              </div>
            </div>
            : <h1>loading</h1>
        }
      </div>
    </div>
  )
}
export default Detail;

