
const InitialState = {
  videogames: [],
  videogamesCopy: [],
  detail: [],
  genres: []
}

const rootReducer = (state = InitialState, action) => {

  switch (action.type) {

    case "GET_VIDEOGAMES": return { ...state, videogames: action.payload, videogamesCopy: action.payload }

    case "GET_VIDEOGAME_BY_NAME": return { ...state, videogamesCopy: action.payload }

    case "VIDEOGAME_DETAIL": return { ...state, detail: action.payload }

    case "GET_GENRES": return { ...state, genres: action.payload }

    case "CREATE_VIDEOGAME": return { ...state }

    case "FILTER_GAMES_BY_GENRE":
      const videogames = state.videogames
      const filtered = action.payload === "all" ? videogames : videogames.filter((videogames) => videogames.genres.includes(action.payload))
      return { ...state, videogamesCopy: filtered }

    case "SORT_GAMES_BY_ALPH":
      let sortByAlph = [...state.videogamesCopy];
      if (action.payload === "asc") {
        sortByAlph.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1; //si  A es mayor que B, B se ordena antes que A
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1; //si A es menor que B, A se ordena primero que B
          return 0;
        });
      } else {
        sortByAlph.sort((b, a) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1; // si B es menor que A, A se ordena antes (v - ch) --> ch, v 
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1; // si B es mayor que A, B se ordena antes ( ch-v) --> v, ch
          return 0;
        })
      }
      return { ...state, videogamesCopy: [...sortByAlph] }

    case "SORT_GAMES_BY_RATING":
      let rating = [...state.videogamesCopy]
      if (action.payload === "asc") {
        rating.sort((a, b) => {
          return (a.rating - b.rating)
        })
      } else {
        rating.sort((a, b) => {
          return (b.rating - a.rating)
        })
      }

      return { ...state, videogamesCopy: [...rating] }

    case "FILTER_GAMES_CREATED":
      const allVideogames = state.videogames
      const createdFilter = action.payload === created ? allVideogames.filter(el => el.createdInDb) : allVideogames.filter(el => !el.createdInDb)
      return { ...state, videogamesCopy: action.payload === "all" ? allVideogames : createdFilter }

    default:
      return state
  }
}

export default rootReducer;