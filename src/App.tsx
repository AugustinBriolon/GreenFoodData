import { useState } from 'react';

import { Data } from './types';
import fruits from './data/fruits.json';
import vegetables from './data/legumes.json';
import Header from "./components/Header";
import List from './components/List';
import SearchBar from './components/SearchBar';
import Input from './components/Input';
import Button from './components/Button';
import Modal from './components/Modal';
import { Cooking } from './components/Icons';
import clsx from 'clsx';

export default function App() {
  const [originalData] = useState<Data[]>([...fruits, ...vegetables].sort((a, b) => a.name.localeCompare(b.name)));
  const [data, setData] = useState<Data[]>(originalData);
  const [portion, setPortion] = useState(100);
  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Data[]>([]);

  const handleSetData = (newData: Data[]) => {
    setData(newData);
  }

  return (
    <div className="h-screen w-screen p-8 flex flex-col items-center justify-start gap-4">
      <Header />
      <div className='w-full flex items-end justify-between'>
        <div className='flex items-end justify-end w-fit gap-2'>
          <p>Pour</p>
          <div className='flex items-end justify-end gap-1 border-b border-solid border-green-800'>
            <Input type='number' value={portion} onChange={(e) => setPortion(parseInt(e.target.value))} min={0} max={1000} />
            <p>g</p>
          </div>
        </div>
        <div className='flex items-center justify-start gap-4'>
          <SearchBar data={originalData} setData={handleSetData} />
          <Button icon={<Cooking />} onClick={() => setModal(!modal)} className='relative'>
            <div className={clsx(selectedData.length === 0 && "hidden" , 'absolute top-[-10px] right-[-10px] rounded-full bg-white border border-green-800 w-5 h-5 aspect-square flex items-center justify-center')}>
              <p className='text-xs text-green-800 font-bold'>{selectedData.length}</p>
            </div>
            </Button>
        </div>
      </div>
      <List data={data} portion={portion} selectedData={selectedData}  setSelectedData={setSelectedData} />
      <Modal isOpen={modal} toggle={() => setModal(!modal)} selectedData={selectedData} setSelectedData={setSelectedData}/>
    </div>
  );
}
