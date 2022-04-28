import style from './ButtonNumber.module.css'



function ButtonNumber({ gamesPerPage, videogamesCopy, pagination, currentPage }) {

  const pageNumber = []


  for (let i = 1; i <= Math.ceil(videogamesCopy / gamesPerPage); i++) {
    pageNumber.push(i);
  }

  let colorr = (number) => {
    if (number === currentPage) return style.color2
    else return style.color1
  }

  return (
    <nav className={style.container} >
      <ul className={style.pageNumbers}>
        {pageNumber?.map((number) => {
          return (
            <div>
              <li key={number}>
                <a className={colorr(number)} onClick={() => pagination(number)} href="#">
                  {number}
                </a>
              </li>
            </div>
          );
        })}
      </ul>
    </nav>
  )
}

export default ButtonNumber;






// function ButtonNumber({ gamesPerPage, videogamesCopy, pagination, currentPage }) {

//   const pageNumber = []
//   let number;


//   for (let i = 1; i <= Math.ceil(videogamesCopy / gamesPerPage); i++) {
//     pageNumber.push(i);
//   }

//   let colorr = (number) => {
//     if (number === currentPage) return style.color2
//     else return style.color1
//   }

//   return (
//     <nav className={style.container} >
//       <ul className={style.pageNumbers}>
//         {currentPage !== 1 &&
//           <li key={number}>
//             <a onClick={() => pagination(currentPage - 1)}>{currentPage - 1}</a>
//           </li>
//         }

//         <li key={number}>
//           <a>{currentPage}</a>
//         </li>

//         {currentPage !== number &&
//           <li key={number}>
//             <a onClick={() => pagination(currentPage + 1)}>{currentPage + 1}</a>
//           </li>
//         }
//       </ul>
//     </nav>
//   )
// }

// export default ButtonNumber;


