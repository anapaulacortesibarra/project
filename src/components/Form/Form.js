import { useEffect, useState } from 'react'
import style from './Form.module.css'
import NavBar from '../Navbar/Navbar'
import FormValidation from './FormValidation'
import { createVideogame, getGenres, getPlatforms } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import SelectGenres from './SelectGenres'
import SelectPlatforms from './SelectPlatforms'
import Swal from 'sweetalert2'



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

  const handleSelectMultiChange = (value, meta) => {
    setInput({
      ...input,
      [meta.name]: value,
    });
    console.log(value, 'value')
    setError(
      FormValidation({ ...input, [meta.name]: value.value })
    );
  };



  const handleSubmit = async (e) => {
    if (input.name && input.description_raw && input.released && input.rating) {
      e.preventDefault();
      await dispatch(createVideogame(input));
      console.log(input, 'input')
      Swal.fire({
        icon: 'success',
        text: 'Your game has been created!',
      })

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
      Swal.fire({
        title: 'Error!',
        text: 'You must complete every field!',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }



  return (
    <div className={style.backgroundContainer}>
      <NavBar />
      <div className={style.container}>
        <h3 className={style.titleText}>CREATE VIDEOGAME</h3>
        <form >
          <label className={style.text}> Image </label>
          <input className={style.input} name="background_image" value={input.background_image} onChange={(e) => handleInputChange(e)} />
          {error.background_image && (<p className={style.error}>{error.background_image}</p>)}

          <label className={style.text}> Name </label>
          <input className={style.input} name="name" value={input.name} onChange={(e) => handleInputChange(e)} />
          {error.name && (<p className={style.error}>{error.name}</p>)}

          <label className={style.text}> Description </label>
          <input className={style.input} name="description_raw" value={input.description_raw} onChange={(e) => handleInputChange(e)} />
          {error.description_raw && (<p className={style.error}>{error.description_raw}</p>)}

          <label className={style.text}> Released </label>
          <input className={style.input} name="released" value={input.released} placeholder="Ex: 1994-07-21" onChange={(e) => handleInputChange(e)} />
          {error.released && (<p className={style.error}>{error.released}</p>)}

          <label className={style.text}> Rating </label>
          <input className={style.input} name="rating" value={input.rating} placeholder="Ex: 5 or 4.5" onChange={(e) => handleInputChange(e)} />
          {error.rating && (<p className={style.error}>{error.rating}</p>)}

          <div>
            <label className={style.text1}> Genre </label>
            <SelectGenres handleSelectMultiChange={handleSelectMultiChange} />
          </div>

          {error.genreId && (<p className={style.error}>{error.genreId}</p>)}

          <label className={style.text1}> Platforms </label>
          <SelectPlatforms handleSelectMultiChange={handleSelectMultiChange} />

          <div>
            {error.platforms && (<p className={style.error}>{error.platforms}</p>)}
          </div>

          <button className={style.btn} type="submit" onClick={(e) => handleSubmit(e)} >Create videogame</button>
        </form >
      </div>

    </div>
  )
}
export default Form;





