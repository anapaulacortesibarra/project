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
  const genres = useSelector((state => state.genres))

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1)
  }, [videogames, genres]);


  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.paginateContainer}>
      <div className={style.ButtonNumber}>
        <ButtonNumber
          gamesPerPage={gamesPerPage}
          videogamesCopy={videogames?.length}
          pagination={pagination}
          currentPage={currentPage}
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

{/* <ButtonNumber
gamesPerPage={gamesPerPage}
videogamesCopy={videogames?.length}
setCurrentPage={setCurrentPage}
currentPage={currentPage}
maxPageNumberLimit={maxPageNumberLimit}
minPageNumberLimit={minPageNumberLimit}
handlePrevBtn={handlePrevBtn}
handleNextBtn={handleNextBtn}
/> */}