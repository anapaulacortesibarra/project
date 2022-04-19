import style from './Pagination.module.css'
import Card from '../Card/Card';
import { getVideogames } from '../../redux/actions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonNumber from './ButtonNumber';


const Pagination = () => {

  const videogames = useSelector((state) => state.videogamesCopy);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; //15 = pagina 1 * cantidad de elementos 15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1)
  }, [videogames]);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);


  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) { // si estoy en pag 5 y el +1 supera mi limite, traeme otros 5 pag mas
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) { // si current page 6 - 1 = 5 y 5 es modulo de 5 dando 0 podemos movernos
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  return (
    <div className={style.paginateContainer}>
      <div className={style.ButtonNumber}>
        <ButtonNumber
          gamesPerPage={gamesPerPage}
          videogamesCopy={videogames?.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          maxPageNumberLimit={maxPageNumberLimit}
          minPageNumberLimit={minPageNumberLimit}
          handlePrevBtn={handlePrevBtn}
          handleNextBtn={handleNextBtn}
        />
        <div className={style.cards}>
          {
            currentGames?.map(games => {
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
        </div>
      </div>
    </div>
  )
}

export default Pagination;