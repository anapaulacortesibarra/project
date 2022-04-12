import { useDispatch } from 'react-redux';
import { sortGamesByRating } from '../../redux/actions';
import style from '../FiltersandOrd/FiltersandOrd.module.css'

const OrderingByRating = () => {

  const dispatch = useDispatch()

  const handleOrderingRating = (e) => {
    e.preventDefault();
    dispatch(sortGamesByRating(e.target.value))
  }

  return (
    <select className={style.selectContainer} onChange={(e) => handleOrderingRating(e)}>
      <option value="" hidden>Sort by rating</option>
      <option value="asc" >Low to Higher</option>
      <option value="desc" >Higher to Low </option>
    </select>
  )
}
export default OrderingByRating;