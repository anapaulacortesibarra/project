import style from './Home.module.css';
import Navbar from '../Navbar/Navbar'
import Searchbar from '../Searchbar/Searchbar'
import Pagination from '../Pagination/Pagination';
import FiltersandOrd from '../FiltersandOrd/FiltersandOrd'

const Home = () => {


  return (
    <div className={style.container}>
      <div><Navbar /></div>
      <div className={style.countries_Page_Container}>
        <div className={style.searchBar}><Searchbar /></div>
        <div className={style.filters}><FiltersandOrd /></div>
        <div className={style.pagination}><Pagination /></div>
      </div>
    </div>
  )
}
export default Home;