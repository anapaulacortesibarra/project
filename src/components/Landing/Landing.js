import style from './Landing.module.css';
import { Link } from 'react-router-dom'


function Landing() {
  return (
    <div className={style.container}>
      <div>
        <h1 className={style.title_landing}>VIDEOGAMES</h1>
      </div>
      <div>
        <Link className={style.link} to="/videogames">
          EXPLORE
        </Link>
      </div>
    </div>
  )
}
export default Landing;