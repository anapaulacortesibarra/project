import style from '../FiltersandOrd/FiltersandOrd.module.css'
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions";


const ClearFilters = () => {

  const dispatch = useDispatch()
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames())
  }

  return (
    <button className={style.btn} onClick={(e) => handleClick(e)}>Clear Filters</button>
  )
}

export default ClearFilters;