import style from "./Spinner.module.css"
import { Spinner } from 'react-bootstrap'


const Loader = () => {

  return (
    <div className={style.loader}>
      <Spinner animation="border" size="lg" />

    </div>
  )
}

export default Loader;