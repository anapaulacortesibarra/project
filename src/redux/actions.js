import axios from 'axios';
import Swal from 'sweetalert2'


export const getVideogames = () => {
  return function (dispatch) {
    axios.get(`http://localhost:3001/videogames`)
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: "GET_VIDEOGAMES",
          payload: data
        })
      }).catch(error => console.log(error))
  }
}

export const getVideogameByName = (payload) => {
  return function (dispatch) {
    axios.get(`http://localhost:3001/videogames?name=${payload}`)
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: "GET_VIDEOGAME_BY_NAME",
          payload: data
        })
      }).catch(error => Swal.fire({
        error,
        title: 'Ups!',
        text: 'That videogame does not exist',
        icon: 'error',
        confirmButtonText: 'Close'
      }))
  }
}

export const getVideogameDetail = (payload) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/videogame/${payload}`)
      return dispatch({
        type: "VIDEOGAME_DETAIL",
        payload: response
      })
    } catch (err) {
      alert(err, 'The videogame does not exist')

    }
  }
}

export const getGenres = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/genres`)
      return dispatch({
        type: "GET_GENRES",
        payload: response
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getPlatforms = () => {
  return async function (dispatch) {
    try {
      let data = await axios.get(`http://localhost:3001/platforms`)
      return dispatch({
        type: "GET_PLATFORMS",
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const createVideogame = (payload) => {
  return function (dispatch) {
    axios.post(`http://localhost:3001/videogame`, payload)
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: "CREATE_VIDEOGAME",
          payload: data
        })
      }).catch(error => console.log(error))
  }
}

export const filterGamesByGenre = (payload) => {
  return {
    type: "FILTER_GAMES_BY_GENRE",
    payload: payload
  }
}

export const filterByOrigin = (payload) => {
  return function (dispatch) {
    axios.get(`http://localhost:3001/videogames/origen?origen=${payload}`)
      .then(results => results.data)
      .then(data => {
        dispatch({
          type: "FILTER_BY_ORIGIN",
          payload: data
        })
      })
  }
}


export const sortGamesByAlph = (payload) => {
  return {
    type: "SORT_GAMES_BY_ALPH",
    payload: payload
  }
}

export const sortGamesByRating = (payload) => {
  return {
    type: "SORT_GAMES_BY_RATING",
    payload: payload
  }
}

export const cleanDetail = () => {
  return {
    type: "CLEAN_DETAIL",
  }
}