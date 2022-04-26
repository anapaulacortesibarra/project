import { useDispatch } from "react-redux";
import style from '../FiltersandOrd/FiltersandOrd.module.css'
import { filterByOrigin } from "../../redux/actions";



const FilterByOrigin = () => {

  const dispatch = useDispatch()

  const handleFilterByOrigin = (e) => {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value))
  }

  return (
    <select className={style.selectContainer} onChange={(e) => handleFilterByOrigin(e)}>
      <option value="" hidden>Filter by Origin</option>
      <option value="all">All</option>
      <option value="API">API</option>
      <option value="db">DATABASE</option>
    </select>
  )

}

export default FilterByOrigin;