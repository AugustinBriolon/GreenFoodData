import clsx from 'clsx'
import { Badge } from '@radix-ui/themes'

import { getColor } from "../utils/getColor";
import Button from './Button'
import { Data, FastAddProps } from '../types';
import SearchBar from './SearchBar';
import { useState } from 'react';

export default function FastAdd({ data, selectedData, setSelectedData, isOpenData, setIsOpenData }: FastAddProps) {

  const [dataModal, setDataModal] = useState<Data[]>(data);

  const handleAddSelectedData = (food: Data) => {
    if (!selectedData.some(item => item.food === food)) {
      setSelectedData([...selectedData, { food, portion: 100 }]);
    }
  };

  const handleSetData = (newData: Data[]) => {
    setDataModal(newData);
  }

  return (
    <div className='relative'>
      <Button value="Ajouter un aliment" onClick={() => setIsOpenData(!isOpenData)} outline />
      <div className={clsx(!isOpenData && "hidden top-0", "absolute z-20 top-8 right-0 transition-all flex flex-col gap-4 p-2 border border-solid bg-white border-green-800 rounded-lg max-h-48 w-48 md:w-96 max-w-96 overflow-scroll shadow")}>
        <SearchBar data={data} setData={handleSetData} />
        <div className='w-full flex flex-wrap gap-2'>
          {
            dataModal.map((food, index) => (
              <Badge key={index} color={getColor(food.category)} className="text-sm w-fit font-normal cursor-pointer" onClick={() => handleAddSelectedData(food)}>{food.name}</Badge>
            ))
          }
        </div>
      </div>
    </div>
  )
}
