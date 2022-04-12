// import style from '../FiltersandOrd/FiltersandOrd.module.css'
import { getGenres, filterGamesByGenre } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const FilterByGenre = () => {

  let genres = useSelector((state) => state.genres)
  const dispatch = useDispatch()
  let array = []
  array.push(genres)

  console.log(genres, 'aqui')
  console.log(array, 'array')
  console.log(array.map(el => el.data.map(g => g.name)))

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  const handleFilterGenre = (e) => {
    e.preventDefault();
    dispatch(filterGamesByGenre(e.target.value))
    console.log(genres, 'aqui 2')
  }
  //object.keys(genres) como en detail

  return (
    <div>
      <h1>nollega</h1>
      <select onChange={(e) => handleFilterGenre(e)}>
        <option value="" hidden>Filter by Genres</option>
        {
          array.length > 1
            ? array.map(el => el.data?.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            )))
            : 'Loading'

        }
      </select>
    </div>
  )

}
export default FilterByGenre;

// array.length && array.map(el => el.data?.map(g => (
//   <option key={g.id} value={g.id}>{g.name}</option>

// )))