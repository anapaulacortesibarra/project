import style from './Landing.module.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { getVideogames } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { Button } from "react-bootstrap"
import 'animate.css';



function Landing() {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const goBack = () => {
    navigate("/videogames")
  }

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div>
        <h1 className="animate__animated animate__bounce title">VIDEOGAMES</h1>
      </div>
      <div>
        <Button onClick={goBack} variant="dark" size="lg">
          EXPLORE
        </Button>
      </div>
    </div>
  )
}
export default Landing;