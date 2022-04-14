
const Validation = (e) => {

  let error = {}

  const message = 'This field must be filled in'
  const nameVal = new RegExp(/^([a-zA-Z]|[^0-9]\S)([^0-9]*){1,}$/); //star matches 0 o más del item anterior
  const ratingVal = new RegExp(/^([0-9])(\.[0-5]{1})?$/);
  const releasedVal = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)

  if (!nameVal.test(e.name)) error.name = message;

  if (!ratingVal.test(e.rating)) error.rating = message;

  if (!releasedVal.test(e.released)) error.released = message;

  // if (e.genreId.length === "" || e.genreId.length === 0) error.genreId = 'A genre is required'

  // for (let i = 0; i < e.genreId.length; i++) {
  //   for (let y = i + 1; y <= e.genreId.length; y++) {
  //     if (e.genreId[i] === e.genreId[y]) error.genreId = "The genres can not be repeated"
  //   }
  // }
  return error
}

export default Validation;