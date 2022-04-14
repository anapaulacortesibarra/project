import { useEffect, useState } from 'react'
import style from './Form.module.css'
import NavBar from '../Navbar/Navbar'
import FormValidation from './FormValidation'
import { createVideogame, getGenres, getPlatforms } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'



const Form = () => {

  const initialValues = {
    name: '',
    description: '',
    released: '',
    rating: '',
    genreId: [],
    platformsId: []
  }

  const dispatch = useDispatch()
  const genres = useSelector(state => state.genres)
  const platforms = useSelector(state => state.platforms)


  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPlatforms())
  }, [dispatch])


  const [input, setInput] = useState(initialValues);
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
    setError(FormValidation({ ...input, [e.target.name]: e.target.value }))

  }

  const handleSelectGenre = (e) => {
    setInput({
      ...input, genreId: [...new Set([...input.genreId, e.target.value])]
    })
    setError(FormValidation({ ...input, genreId: [...input.genreId, e.target.value] }))
  }

  const handleSelectPlatforms = (e) => {
    setInput({
      ...input, platformsId: [...new Set([...input.platformsId, e.target.value])]
    })
    setError(FormValidation({ ...input, platformsId: [...input.platformsId, e.target.value] }))
  }

  const handleSubmit = (e) => {
    if (input.name && input.description && input.released && input.rating && input.genreId) {
      e.preventDefault();
      dispatch(createVideogame(input));
      alert("The game was succesfully Created!");

      setInput({
        name: '',
        description: '',
        released: '',
        rating: '',
        genreId: [],
        platformsId: []

      });

    } else {
      e.preventDefault();
      alert("You must complete every field!");
    }
  }

  console.log(input.platformsId, 'aqui')

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

          <div>
            <label className={style.text}> Genre: </label>
            <select className={style.search} name="genreId" value={input.genreId} multiple={true} onChange={(e) => handleSelectGenre(e)}>
              <option value="" hidden>Select a genre</option>
              {
                genres.data?.map(el =>
                  <option key={el.id}>{el.name}</option>)
              }
            </select>
          </div>

          <div>
            <h4 className={style.text}> Genres selected:</h4>
            {
              input.genreId?.map(genre => (
                <div className={style.selected}>{genre}</div>
              ))
            }
          </div>
          {error.genreId && (<p className={style.error}>{error.genreId}</p>)}

          <label className={style.text}> Platforms: </label>
          <select className={style.search} name="platformsId" value={input.platformsId} multiple={true} onChange={(e) => handleSelectPlatforms(e)}  >
            {
              platforms.data?.map(platform =>
                <option>{platform}</option>
              )
            }
          </select>

          <div>
            <h4 className={style.text}> Platforms selected:</h4>
            {
              input.platformsId?.map(el => (
                <div className={style.selected}> {el}</div>
              ))
            }
            {error.platformsId && (<p className={style.error}>{error.platformsId}</p>)}
          </div>

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






