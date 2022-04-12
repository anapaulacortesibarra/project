import { useDispatch } from "react-redux";
import style from '../FiltersandOrd/FiltersandOrd.module.css'
import { filterGamesCreated } from "../../redux/actions";



const FilterByOrigin = () => {

  const dispatch = useDispatch()

  const handleFilterByOrigin = (e) => {
    e.preventDefault();
    dispatch(filterGamesCreated(e.target.value))
  }

  return (
    <select className={style.selectContainer} onChange={(e) => handleFilterByOrigin(e)}>
      <option value="" hidden>Filter by Origin</option>
      <option value="all">All</option>
      <option value="existed">API</option>
      <option value="created">DATABASE</option>
    </select>
  )

}

export default FilterByOrigin;