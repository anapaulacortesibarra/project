import style from '../FiltersandOrd/FiltersandOrd.module.css'
import { getGenres, filterGamesByGenre } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const FilterByGenre = () => {

  let genres = useSelector((state) => state.genres)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  const handleFilterGenre = (e) => {
    e.preventDefault();
    dispatch(filterGamesByGenre(e.target.value))
  }

  return (
    <div className={style.filters}>
      <select onChange={(e) => handleFilterGenre(e)}>
        <option value="" hidden>Filter by Genres</option>
        <option value="all">All</option>
        {
          Object.keys(genres).length && genres.data
            ? genres.data.map(g =>
              <option key={g.id} value={g.name}>{g.name}</option>
            )
            : 'Loading'
        }
      </select>

    </div>
  )
}
export default FilterByGenre;