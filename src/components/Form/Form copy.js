import { useState } from 'react'
import style from './Form.module.css'
import NavBar from '../Navbar/Navbar'
import FormValidation from './FormValidation'
import { createVideogame } from '../../redux/actions'
import { useDispatch } from 'react-redux'



const Form = () => {

  const initialValues = {
    name: '',
    description: '',
    released: '',
    rating: ''
  }

  const dispatch = useDispatch()

  const [input, setInput] = useState(initialValues);
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
    console.log(input)
    setError(
      FormValidation({ ...input, [e.target.name]: e.target.value }))

  }

  const handleSubmit = (e) => {
    if (input.name && input.description && input.released && input.rating) {
      e.preventDefault();
      dispatch(createVideogame(input));
      alert("The game was succesfully Created!");

      setInput({
        name: '',
        description: '',
        released: '',
        rating: '',

      });

    } else {
      e.preventDefault();
      alert("You must complete every field!");
    }
  }



  return (
    <div className={style.backgroundContainer}>
      <NavBar />
      <div className={style.container}>
        <h3 className={style.titleText}>CREATE VIDEOGAME</h3>
        <form >
          <label className={style.text}> Name: </label>
          <input className={style.input} name="name" value={input.name} onChange={(e) => handleInputChange(e)} />
          {error.name && (<p className={style.error}>{error.name}</p>)}


          <label className={style.text}> Description: </label>
          <input className={style.input} name="description" value={input.description} onChange={(e) => handleInputChange(e)} />

          <label className={style.text}> Released: </label>
          <input className={style.input} name="released" value={input.released} onChange={(e) => handleInputChange(e)} />
          {error.released && (<p className={style.error}>{error.released}</p>)}


          <label className={style.text}> Rating: </label>
          <input className={style.input} name="rating" value={input.rating} onChange={(e) => handleInputChange(e)} />
          {error.rating && (<p className={style.error}>{error.rating}</p>)}





          <button className={style.btn} onClick={(e) => handleSubmit(e)} >create</button>

        </form >
      </div>
    </div>
  )
}

export default Form;


// {
//   Object.keys(genres).length
//     ? genres.data.map(genre =>
//       <option key={genre.id} name="genre" value={genre.id}>{genre.name}</option>
//     )
//     : 'Loading'
// }