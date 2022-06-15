import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getVideogames } from "../../redux/actions";
import style from "./NotFound.module.css"

const NotFound = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goBack = () => {
    navigate("/videogames")
    dispatch(getVideogames())

  }

  return (
    <div className={style.container}>
      <div className="row">
        <div className="col-md-12">
          <div className={style.error_template}>
            <h1 className={style.text}>Oops!</h1>
            <h2 className={style.text}>404 Not Found</h2>
            <div className={style.error_details}>
              Sorry, an error has occured, the page is not found!
            </div>
            <div className={style.error_actions}>
              <Button onClick={goBack} variant="dark">
                GO BACK
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;