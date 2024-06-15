  import { useEffect, useState } from "react";
  import clsx from "clsx";
  import { Data, ModalType } from "../types";
  import Button from "./Button";
  import { Trash, FileDownload } from "./Icons";
  import Input from "./Input";
  
  import { getProportion } from "../utils/getProportion";
  import { getPDF } from "../utils/getPDF";
import FastAdd from "./FastAdd";

  export default function Modal({ isOpen, toggle, data, selectedData, setSelectedData }: ModalType) {
    const [isOpenData, setIsOpenData] = useState(false);

    const handlePortionChange = (food: Data, value: number) => {
      setSelectedData(selectedData.map(item =>
        item.food === food ? { ...item, portion: value } : item
      ));
    };

    const calculateTotal = (key: keyof Data) => {
      return selectedData.reduce((acc, curr) => {
        const value = Number(curr.food[key]);
        if (isNaN(value)) {
          return acc;
        }
        return acc + (value * curr.portion) / 100;
      }, 0).toFixed(1);
    };

    useEffect(() => {
      const updatedSelectedData = selectedData.map(item =>
        ({ ...item, portion: item.portion || 1 })
      );

      if (JSON.stringify(selectedData) !== JSON.stringify(updatedSelectedData)) {
        setSelectedData(updatedSelectedData);
      }
    }, [selectedData]);



    return (
      <div
        className={`fixed top-0 left-0 w-screen h-screen z-20 p-5 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
        onClick={toggle}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className='w-full sm:w-3/4 md:w-1/2 h-full bg-white rounded-lg flex flex-col'
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row sm:items-center justify-between shadow p-4">
            <h2 className='text-2xl text-green-800 font-semibold'>Votre repas :</h2>
            <FastAdd data={data} selectedData={selectedData} setSelectedData={setSelectedData} isOpenData={isOpenData} setIsOpenData={setIsOpenData} />
          </div>

          <div className="flex flex-col gap-2 h-full overflow-scroll p-4 relative">
            {
              selectedData.length === 0 ? <div className="flex items-center justify-center h-1/2"><p>Les éléments sélectionnés s'affichent ici</p></div> :
                selectedData.map((item, index) => (
                  <div key={index} className='w-full bg-green-50 p-4 rounded border border-green-800 shadow flex flex-col items-center justify-between gap-2'>
                    <div className="w-full grid grid-cols-3 items-center justify-items-stretch">
                      <p className="font-bold text-green-800">{item.food.name}</p>
                      <div className='flex items-end justify-end gap-1 border-b border-solid border-green-800'>
                        <Input
                          type='number'
                          value={item.portion}
                          onChange={(e) => handlePortionChange(item.food, parseInt(e.target.value))}
                          min={0}
                          max={1000}
                          textSize="text-md" />
                        <p>g</p>
                      </div>
                      <div onClick={() => setSelectedData(selectedData.filter((selected) => selected.food !== item.food))} className="cursor-pointer flex justify-end">
                        <Trash color="red" />
                      </div>
                    </div>
                    <div className="w-full flex flex-wrap items-center justify-between">
                      <p className="text-green-800">Calories : <span className="text-black">{getProportion(item.food.calories, item.portion)} kcal</span></p>
                      <p className="text-green-800">Proteines : <span className="text-black">{getProportion(item.food.proteins, item.portion)} g</span></p>
                      <p className="text-green-800">Carbohydrates : <span className="text-black">{getProportion(item.food.carbohydrates, item.portion)} g</span></p>
                      <p className="text-green-800">Lipides : <span className="text-black">{getProportion(item.food.lipids, item.portion)} g</span></p>
                    </div>
                  </div>
                ))
            }
          </div>

          <div className={clsx("w-full relative", selectedData.length > 3 ? "block" : "hidden")}>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-green-50 "></div>
          </div>

          <div className="flex flex-col gap-4 p-4 rounded-lg">
            <h2 className="text-green-800">Total :</h2>
            <div className="flex flex-col gap-1">
              <div className="w-full flex items-center justify-between">
                <p>Nb d'aliments</p>
                <p className="font-semibold">{selectedData.length}</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p>Calories</p>
                <p className="font-semibold">{calculateTotal('calories')} kcal</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p>Proteines</p>
                <p className="font-semibold">{calculateTotal('proteins')} g</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p>Carbohydrates</p>
                <p className="font-semibold">{calculateTotal('carbohydrates')} g</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p>Lipides</p>
                <p className="font-semibold">{calculateTotal('lipids')} g</p>
              </div>
            </div>
            <Button value="Télécharger en PDF" className="hover:bg-green-900 transition-all" icon={<FileDownload size={18} />} onClick={async () => await getPDF(selectedData)} />
          </div>
        </div>
      </div >
    );
  }
