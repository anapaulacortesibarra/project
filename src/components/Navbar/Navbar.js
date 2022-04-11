import { Link } from 'react-router-dom';
import style from './Navbar.module.css';


const Navbar = () => {


  return (
    <header className={style.Navbar}>
      <Link to="/" className={style.text}>
        <p>VIDEOGAMES</p>
      </Link>
      <ul className={style.navLinks}>
        <div className={style.menu}>
          <div>
            <Link to='/videogames' className={style.textlink}>Videogames</Link>
          </div>
          <div>
            <Link to='/videogame' className={style.textlink}>Create Videogame</Link>
          </div>

          <div className={style.toggle}>
            <label htmlFor="toggle"> &#9776;</label>
            <input type="checkbox" id="toggle" />
          </div>
        </div>

      </ul>
    </header >
  )
}

export default Navbar;