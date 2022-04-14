import { useEffect, useState } from 'react'
import style from './Form.module.css'
import NavBar from '../Navbar/Navbar'
import FormValidation from './FormValidation'
import { createVideogame, getGenres } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'



const Form = () => {

  const initialValues = {
    name: '',
    description: '',
    released: '',
    rating: ''
  }

  const dispatch = useDispatch()
  const genres = useSelector(state => state.genres)

  // console.log(genres.data.map(el => el.name), 'aqui')

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  console.log(genres)

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
        genreId: []

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

          <select name="genreId" value={input.genreId}>
            {
              genres.data?.map(el =>
                <option key={el.id} name="genre" value={el.id}>{el.name}</option>)

            }
          </select>



          <button className={style.btn} onClick={(e) => handleSubmit(e)} >create</button>

        </form >
      </div>
    </div>
  )
}

export default Form;


// console.log(genres)
// {data: Array(19), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}




// console.log(genres.data.map(el => el.name), 'aqui')
// 0: "Action"
// 1: "Indie"
// 2: "Adventure"
// 3: "RPG"
// 4: "Strategy"
// 5: "Shooter"
// 6: "Casual"
// 7: "Simulation