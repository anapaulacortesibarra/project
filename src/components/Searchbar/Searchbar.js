import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../redux/actions";
import { useState } from "react";
import style from './Searchbar.module.css'

const Searchbar = () => {

  const dispatch = useDispatch()
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    if (name) {
      e.preventDefault();
      dispatch(getVideogameByName(name))
      setName('');
    }
  }

  return (
    <form className={style.search} >
      <input
        type="search"
        value={name}
        onChange={(e) => handleInputChange(e)}
        className={style.search_text}
      />
      <button className={style.button} type="submit" onClick={(e) => handleSubmit(e)}> SEARCH</button>
    </form>
  )
}
export default Searchbar;