import { useEffect, useState } from 'react'
import style from './Form.module.css'
import NavBar from '../Navbar/Navbar'
import FormValidation from './FormValidation'
import { createVideogame, getGenres, getPlatforms } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const Form = () => {

  const initialValues = {
    name: '',
    description_raw: '',
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
    e.preventDefault();
    setInput({
      ...input, genreId: [...new Set([...input.genreId, e.target.value])]
    })
    console.log(input, 'aqui')
    setError(FormValidation({ ...input, genreId: [...input.genreId, e.target.value] }))
  }

  const handleSelectPlatforms = (e) => {
    e.preventDefault();
    setInput({
      ...input, platformsId: [...new Set([...input.platformsId, e.target.value])]
    })
    setError(FormValidation({ ...input, platformsId: [...input.platformsId, e.target.value] }))
  }

  const deleteSelectGenre = (genre) => {
    setInput({ ...input, genreId: input.genreId.filter(el => el !== genre) })

  }

  const deleteSelectPlatforms = (el) => {
    setInput({ ...input, platformsId: input.platformsId.filter(p => p !== el) })
  }


  const handleSubmit = (e) => {
    if (input.name && input.description && input.released && input.rating && input.genreId.length > 0 && input.platformsId.length > 0) {
      e.preventDefault();
      dispatch(createVideogame(input));
      alert("The game was succesfully Created!");

      setInput({
        name: '',
        description_raw: '',
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
          <input className={style.input} name="description_raw" value={input.description_raw} onChange={(e) => handleInputChange(e)} />
          {error.description_raw && (<p className={style.error}>{error.description_raw}</p>)}

          <label className={style.text}> Released: </label>
          <input className={style.input} name="released" value={input.released} onChange={(e) => handleInputChange(e)} />
          {error.released && (<p className={style.error}>{error.released}</p>)}

          <label className={style.text}> Rating: </label>
          <input className={style.input} name="rating" value={input.rating} onChange={(e) => handleInputChange(e)} />
          {error.rating && (<p className={style.error}>{error.rating}</p>)}

          <div>
            <label className={style.text}> Genre: </label>
            <select className={style.search} name="genreId" value={input.genreId} multiple={true} onChange={(e) => handleSelectGenre(e)}>
              {
                genres.data?.map(el =>
                  <option value={el.name} key={el.id}>{el.name}</option>)
              }
            </select>
          </div>

          <div>
            <h4 className={style.text}> Genres selected:</h4>
            {
              input.genreId.length > 0 ?
                input.genreId?.map(genre => (
                  <div key={genre}>
                    <div className={style.selected}>{genre}</div>
                    <button className={style.deleteBtn} onClick={() => deleteSelectGenre(genre)}>X</button>
                  </div>
                ))
                : ""
            }
          </div>
          {error.genreId && (<p className={style.error}>{error.genreId}</p>)}

          <label className={style.text}> Platforms: </label>
          <select className={style.search} name="platformsId" value={input.platformsId} multiple={true} onChange={(e) => handleSelectPlatforms(e)}  >
            {
              platforms.data?.map(platform =>
                <option key={platform}>{platform}</option>
              )
            }
          </select>

          <div>
            <h4 className={style.text}> Platforms selected:</h4>
            {
              input.platformsId?.map(el => (
                <div key={el}>
                  <div className={style.selected} > {el}</div>
                  <button className={style.deleteBtn} onClick={() => deleteSelectPlatforms(el)} > X </button>
                </div>
              ))
            }
            {error.platformsId && (<p className={style.error}>{error.platformsId}</p>)}
          </div>

          <button className={style.btn} type="submit" onClick={(e) => handleSubmit(e)} >Create videogame</button>
        </form >
      </div>
    </div>
  )
}
export default Form;





