import axios from 'axios';

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
      }).catch(error => alert(error, 'The videogame does not exist'))
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
    } catch (error) {
      console.log(error)
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
export const filterGamesCreated = (payload) => {
  return {
    type: "FILTER_GAMES_CREATED",
    payload: payload
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

