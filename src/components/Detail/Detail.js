import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { cleanDetail, getVideogameDetail } from '../../redux/actions';
import Navbar from '../Navbar/Navbar';
import style from './Detail.module.css'
import Loader from '../Spinner/Spinner';
import { Button } from "react-bootstrap"

const Detail = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const params = useParams();
  const game = useSelector(state => state.detail)
  let gameId = params.id;

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    dispatch(getVideogameDetail(gameId))
    return () => { dispatch(cleanDetail()) }
  }, [gameId]);

  const goBack = () => {
    navigate("/videogames")
  }


  return (
    <div>
      <Navbar />
      <div className={style.container}>
        {
          Object.keys(game).length && loading === false
            ?
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
                  <Button onClick={goBack} variant="dark">
                    GO BACK
                  </Button>
                </div>

              </div>
            </div>


            : <Loader animation="border" />
        }
      </div>
    </div>
  )
}
export default Detail;

