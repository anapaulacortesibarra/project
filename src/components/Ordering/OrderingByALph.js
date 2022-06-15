import { useDispatch } from "react-redux";
import { sortGamesByAlph } from "../../redux/actions";
import style from '../FiltersandOrd/FiltersandOrd.module.css'


const OrderingByAlph = () => {

  const dispatch = useDispatch()

  const handleOrdering = (e) => {
    e.preventDefault()
    dispatch(sortGamesByAlph(e.target.value))
  }

  return (
    <div className={style.filters}>
      <select onChange={(e) => handleOrdering(e)}>
        <option value="" hidden> Sort by Alph</option>
        <option value="asc">Ordering A-Z</option>
        <option value="desc">Ordering Z-A</option>
      </select>
    </div>
  )
}
export default OrderingByAlph;