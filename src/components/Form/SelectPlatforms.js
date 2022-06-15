import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';


export default function SelectPlatforms({ handleSelectMultiChange }) {

  const platforms = useSelector(state => state.platforms)
  const options = platforms.data?.map(c => ({ value: c, label: c }))

  return (
    <div>
      <Select
        name='platforms'
        options={options}
        onChange={(opt, meta) => handleSelectMultiChange(opt, meta)}
        isMulti
      />
    </div>
  )
}