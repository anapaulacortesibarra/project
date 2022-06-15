import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';


export default function SelectGenres({ handleSelectMultiChange }) {

  const genres = useSelector(state => state.genres)
  const options = genres.data?.map(c => ({ value: c.id, label: c.name }))
  console.log(genres)

  return (
    <div>
      <Select
        name='genreId'
        options={options}
        onChange={(opt, meta) => handleSelectMultiChange(opt, meta)}
        isMulti
      />
    </div>
  )
}