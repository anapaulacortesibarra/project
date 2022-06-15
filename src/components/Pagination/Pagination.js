import style from './Pagination.module.css'
import Card from '../Card/Card';
import { getVideogames } from '../../redux/actions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonNumber from './ButtonNumber';
import NotFound from '../NotFound/NotFound';
import Loader from '../Spinner/Spinner';



const Pagination = () => {

  const videogames = useSelector((state) => state.videogamesCopy);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; //15 = pagina 1 * cantidad de elementos 15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame)
  const dispatch = useDispatch();
  const genres = useSelector((state => state.genres))

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1)
  }, [videogames, genres]);


  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginas = Math.ceil(videogames.length / gamesPerPage);

  function handleNext(e) {
    e.preventDefault();
    if (currentPage < paginas) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrev(e) {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    currentGames.length !== 0 && setLoading(false);
  }, [currentGames]);

  return (
    <div className={style.paginateContainer}>
      {
        loading === true

          ? <Loader animation="border" />

          : (
            <div className={style.ButtonNumber}>
              <div className={style.prev}>
                {
                  currentPage === 1
                    ? null
                    : <button className={style.button_A} onClick={(e) => handlePrev(e)}>{" << previous "}</button>

                }
                <div>
                  <ButtonNumber
                    gamesPerPage={gamesPerPage}
                    videogamesCopy={videogames?.length}
                    pagination={pagination}
                    currentPage={currentPage}
                  />

                </div>
                {
                  currentPage >= 7 || currentGames.length === 0
                    ? null
                    : <button className={style.button_B} onClick={(e) => handleNext(e)}>{"next >>"}</button>
                }
              </div>
              <div className={style.cards}>
                {

                  currentGames.length > 0 && currentGames.map(games => {
                    return (
                      <div key={games.id}>
                        <Card
                          name={games.name}
                          background_image={games.background_image}
                          id={games.id}
                          genres={games.genres} />
                      </div>
                    )
                  })

                }
                {
                  currentGames.length === 0 && <NotFound className={style.container} />
                }
              </div>
            </div>
          )
      }

    </div>
  )
}

export default Pagination;

// currentGames.length > 0 && loading === false

// ? currentGames?.map(games => {
//   return (
//     <div key={games.id}>
//       <Card
//         name={games.name}
//         background_image={games.background_image}
//         id={games.id}
//         genres={games.genres} />
//     </div>
//   )
// })

// : currentGames.length > 0 && loading === true

//   ? <Loader animation="border" />

//   : currentGames.length < 0 && loading === false && <NotFound className={style.Not} />