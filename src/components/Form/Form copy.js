import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormValidation from './FormValidation'
import { getGenres, createVideogame } from '../../redux/actions'
import style from './Form.module.css'


const Form = () => {

  const initialValues = {
    name: '',
    description: '',
    released: '',
    rating: '',
    genreId: [],
    platforms: []

  }

  const [input, setInput] = useState(initialValues);
  const [error, setError] = useState();

  const dispatch = useDispatch()
  let genres = useSelector((state) => state.genres)

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])


  const handleInputChange = (e) => {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
    setError({
      ...FormValidation({ ...input, [e.target.name]: e.target.value })
    })
  }

  const handleGenreSelection = (e) => {
    setInput({
      ...input, genreId: [...input.genreId, e.target.value]
    })
    setError({
      ...FormValidation({ ...input, genreId: [...input.genreId, e.target.value] })
    })
  }


  const handleSubmit = (e) => {
    if (input.name && input.description && input.released && input.rating && input.genreId && input.platforms) {
      e.preventDefault();
      dispatch(createVideogame(input));
      alert("The game was succesfully Created!");

      setInput({
        name: '',
        description: '',
        released: '',
        rating: '',
        genreId: [],
        platforms: []
      });

    } else {
      e.preventDefault();
      alert("You must complete every field!");
    }
  }


  return (
    <form onClick={(e) => handleSubmit(e)}>
      <label> Name: </label>
      <input name="name" value={input.name} onChange={(e) => handleInputChange(e)} />
      {error.name && (<p className={style.error}>{error.name}</p>)}

      <label> Description:: </label>
      <input name="description" value={input.description} onChange={(e) => handleInputChange(e)} />
      {error.description && (<p className={style.error}>{error.description}</p>)}

      <label> Released: </label>
      <input name="released" value={input.released} onChange={(e) => handleInputChange(e)} />
      {error.released && (<p className={style.error}>{error.released}</p>)}


      <label> Rating: </label>
      <input name="rating" value={input.rating} onChange={(e) => handleInputChange(e)} />
      {error.rating && (<p className={style.error}>{error.rating}</p>)}

      <label> Genres: </label>
      <select name="genreId" value={input.genreId} multiple={true} onChange={(e) => handleGenreSelection(e)}>
        <option value="" hidden>Select a genre</option>

        {
          Object.keys(genres).length
            ? genres.map(genre =>
              <option key={genre.id} name="genre" value={genre.id}>{genre.name}</option>
            )
            : 'Loading'
        }
      </select>

      {error.genreId && (<p>{error.genreId}</p>)}

      {/* <label> Platforms: </label>
      <select >


      </select> */}
    </form>
  )
}

export default Form;