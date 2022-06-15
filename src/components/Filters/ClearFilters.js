import style from '../FiltersandOrd/FiltersandOrd.module.css'
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions";
import { Button } from 'react-bootstrap';


const ClearFilters = () => {

  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames())
  }


  return (
    <Button variant="dark" className={style.clear} onClick={(e) => handleClick(e)}>Clear Filters</Button>
  )
}
export default ClearFilters;