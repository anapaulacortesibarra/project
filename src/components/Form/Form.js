import { useEffect, useState } from 'react'
import style from './Form.module.css'
import NavBar from '../Navbar/Navbar'
import FormValidation from './FormValidation'
import { createVideogame, getGenres, getPlatforms } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Form = () => {

  const initialValues = {
    background_image: '',
    name: '',
    description_raw: '',
    released: '',
    rating: '',
    genreId: [],
    platforms: []
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    setError(FormValidation({ ...input, genreId: [...input.genreId, e.target.value] }))
  }

  const handleSelectPlatforms = (e) => {
    e.preventDefault();
    setInput({
      ...input, platforms: [...new Set([...input.platforms, e.target.value])]
    })
    setError(FormValidation({ ...input, platforms: [...input.platforms, e.target.value] }))
  }

  const deleteSelectGenre = (item) => {
    setInput({ ...input, genreId: input.genreId.filter(el => el !== item) })

  }

  const deleteSelectPlatforms = (el) => {
    setInput({ ...input, platforms: input.platforms.filter(p => p !== el) })
  }

  const handleSubmit = (e) => {
    if (input.name && input.description_raw && input.released && input.rating && input.genreId.length > 0 && input.platforms.length > 0) {
      e.preventDefault();
      dispatch(createVideogame(input));
      alert("The game was succesfully Created!");

      setInput({
        background_image: '',
        name: '',
        description_raw: '',
        released: '',
        rating: '',
        genreId: [],
        platforms: []
      });

      navigate("/videogames");
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
          <label className={style.text}> Image: </label>
          <input className={style.input} name="background_image" value={input.background_image} onChange={(e) => handleInputChange(e)} />
          {error.background_image && (<p className={style.error}>{error.background_image}</p>)}

          <label className={style.text}> Name: </label>
          <input className={style.input} name="name" value={input.name} onChange={(e) => handleInputChange(e)} />
          {error.name && (<p className={style.error}>{error.name}</p>)}

          <label className={style.text}> Description: </label>
          <input className={style.input} name="description_raw" value={input.description_raw} onChange={(e) => handleInputChange(e)} />
          {error.description_raw && (<p className={style.error}>{error.description_raw}</p>)}

          <label className={style.text}> Released: </label>
          <input className={style.input} name="released" value={input.released} placeholder="Ex: 1994-07-21" onChange={(e) => handleInputChange(e)} />
          {error.released && (<p className={style.error}>{error.released}</p>)}

          <label className={style.text}> Rating: </label>
          <input className={style.input} name="rating" value={input.rating} placeholder="Ex: 5 or 4.5" onChange={(e) => handleInputChange(e)} />
          {error.rating && (<p className={style.error}>{error.rating}</p>)}

          <div>
            <label className={style.text}> Genre: </label>
            <select className={style.search} name="genreId" value={input.genreId} onChange={(e) => handleSelectGenre(e)}>
              {
                genres.data?.map(el =>
                  <option name={el.name} value={el.id} key={el.id}>{el.name}</option>)
              }
            </select>
          </div>

          <div>
            <h4 className={style.text}> Genres selected:</h4>
            {
              input.genreId.length > 0 ?
                input.genreId?.map(item => {
                  let genre = genres.data.find(el => el.id == item)
                  return (
                    <div key={genre.id}>
                      <div className={style.selected}>{genre.name}</div>
                      <button className={style.deleteBtn} onClick={() => deleteSelectGenre(item)}>X</button>
                    </div>
                  )
                })
                : ""
            }
          </div>
          {error.genreId && (<p className={style.error}>{error.genreId}</p>)}

          <label className={style.text}> Platforms: </label>
          <select className={style.search} name="platforms" value={input.platforms} onChange={(e) => handleSelectPlatforms(e)}  >
            {
              platforms.data?.map(platform =>
                <option key={platform}>{platform}</option>
              )
            }
          </select>

          <div>
            <h4 className={style.text}> Platforms selected:</h4>
            {
              input.platforms?.map(el => (
                <div key={el}>
                  <div className={style.selected} > {el}</div>
                  <button className={style.deleteBtn} onClick={() => deleteSelectPlatforms(el)} > X </button>
                </div>
              ))
            }
            {error.platforms && (<p className={style.error}>{error.platforms}</p>)}
          </div>

          <button className={style.btn} type="submit" onClick={(e) => handleSubmit(e)} >Create videogame</button>
        </form >
      </div>

    </div>
  )
}
export default Form;





