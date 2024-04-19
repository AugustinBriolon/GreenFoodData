import { useState } from 'react';
import { Data } from './types';
import fruits from './data/fruits.json';
import vegetables from './data/legumes.json';
import Header from "./components/Header";
import List from './components/List';
import SearchBar from './components/SearchBar';
import Input from './components/Input';

export default function App() {
  const [originalData] = useState<Data[]>([...fruits, ...vegetables].sort((a, b) => a.name.localeCompare(b.name)));
  const [data, setData] = useState<Data[]>(originalData);
  const [portion, setPortion] = useState(100);

  const handleSetData = (newData: Data[]) => {
    setData(newData);
  }

  return (
    <div className="h-screen w-screen p-8 flex flex-col items-center justify-start gap-4">
      <Header />
      <div className='w-full flex items-end justify-between'>
        <SearchBar data={originalData} setData={handleSetData} />
        <div className='flex items-end justify-end w-fit gap-2'>
          <p>Pour</p>
          <div className='flex items-end justify-end gap-1'>
            <Input type='number' value={portion} onChange={(e) => setPortion(parseInt(e.target.value))} min={0} max={1000} />
            <p>g</p>
          </div>
        </div>
      </div>
      <List data={data} portion={portion} />
    </div>
  );
}
