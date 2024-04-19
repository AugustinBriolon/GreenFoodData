import React, { useState } from 'react';
import { Data } from '../types';
import { Loop } from './Icons';

export default function SearchBar({ data, setData }: { data: Data[], setData: (filteredData: Data[]) => void }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === '') {
      setData(data);
    } else {
      const regex = new RegExp(`\\b${escapeRegExp(newValue)}`, 'i');
      const filteredData = data.filter(food =>
        regex.test(food.name) || regex.test(food.category)
      );

      setData(filteredData);
    }
  };

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
  }

  return (
    <div className="flex items-center text-black border-b border-solid border-green-800 gap-2 w-fit">
      <div className='text-green-800'>
        <Loop />
      </div>
      <div className='relative flex items-center justify-center h-8 '>
        <input
          type="text"
          className="h-fit w-24 sm:w-fit text-sm focus:outline-none bg-transparent text-green-800"
          name="Rechercher"
          onChange={handleSearch}
          value={inputValue}
          placeholder="Rechercher un aliment..."
        />
      </div>
    </div>
  );
}
