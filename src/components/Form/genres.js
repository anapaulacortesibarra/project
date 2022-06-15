import React from 'react';
import { useSelector } from 'react-redux';

export default function SelectColors({ handleSelectChange }) {

  const genres = useSelector(state => state.getColors)
  const options = genres.map(c => ({ value: c.id, label: c.name }))

  return (
    <div>
      <CreatableSelect
        name='color'
        options={options}
        onChange={(opt, meta) => handleSelectChange(opt, meta)}
      />
    </div>
  )
}