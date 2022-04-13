import { useState } from 'react'
import { useDispatch } from 'react-redux'
import FormValidation from './FormValidation'
import { createVideogame } from '../../redux/actions'
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

  const handleInputChange = (e) => {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
    setError({
      ...FormValidation({ ...input, [e.target.name]: e.target.value })
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
    <form onSubmit={(e) => handleSubmit(e)}>
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












    </form>
  )
}

export default Form;