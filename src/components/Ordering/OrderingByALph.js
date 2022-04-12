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
    <select className={style.selectContainer} onChange={(e) => handleOrdering(e)}>
      <option value="" hidden> Sort by Alph</option>
      <option value="asc">Ordering A-Z</option>
      <option value="desc">Ordering Z-A</option>
    </select>
  )
}
export default OrderingByAlph;