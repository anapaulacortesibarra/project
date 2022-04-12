import ClearFilters from '../Filters/ClearFilters';
import FilterByGenre from '../Filters/FilterByGenre';
import FilterByOrigin from '../Filters/FilterByOrigin';
import style from '../FiltersandOrd/FiltersandOrd.module.css'
import OrderingByAlph from '../Ordering/OrderingByALph';
import OrderingByRating from '../Ordering/OrderingByRating';

const FiltersandOrd = () => {

    return (
        <div className={style.div}>
            <div className={style.container}>
                <OrderingByAlph />
                <OrderingByRating />
                <FilterByOrigin />
                <FilterByGenre />
            </div>

            <div className={style.btnCleanFilters}>
                <ClearFilters />
            </div>
        </div>
    )
}

export default FiltersandOrd;