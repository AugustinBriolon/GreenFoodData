import { useState } from "react";
import { Data, ModalType } from "../types";
import Button from "./Button";
import { Trash } from "./Icons";
import clsx from "clsx";
import { Badge } from "@radix-ui/themes";
import Input from "./Input";

export default function Modal({ isOpen, toggle, data, selectedData, setSelectedData }: ModalType) {
  const [isOpenData, setIsOpenData] = useState(false)
  const [portions, setPortions] = useState<{ [key: string]: number }>({});

  const handleAddSelectedData = (food: Data) => {
    if (!selectedData.includes(food)) {
      setSelectedData([...selectedData, food])
    }
  }

  const handlePortionChange = (name: string, value: number) => {
    setPortions({ ...portions, [name]: value });
  };

  const proportionWithPortion = (value: number, portion: number = 100) => {
    if (Number.isNaN(portion)) {
      return 0;
    } else {
      return ((value * portion) / 100).toFixed(1)
    }
  }

  const calculateTotal = (key: keyof Data) => {
    return selectedData.reduce((acc, curr) => {
      const portion = portions[curr.name] || 100;
      const value = Number(curr[key]);
      if (isNaN(value)) {
        return acc;
      }
      return acc + (value * portion) / 100;
    }, 0).toFixed(1);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-20 p-5 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
      onClick={toggle}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className='w-full md:w-1/2 aspect-square bg-white rounded-lg flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex flex-row sm:items-center justify-between shadow p-4">
          <h2 className='text-2xl text-green-800 font-semibold'>Votre repas :</h2>
          <div className='relative'>
            <Button value="Ajouter un aliment" onClick={() => setIsOpenData(!isOpenData)} className="hover:bg-green-900 transition-all" />
            <div className={clsx(!isOpenData && "hidden top-0", "absolute top-8 right-0 transition-all flex flex-wrap gap-2 p-2 border border-solid bg-white border-green-800 rounded max-h-48 w-48 md:w-96 max-w-96 overflow-scroll shadow")}>
              {
                data.map((food, index) => (
                  <Badge key={index} color={food.category === "Fruits" ? "ruby" : "grass"} className="text-sm w-fit font-normal cursor-pointer" onClick={() => handleAddSelectedData(food)}>{food.name}</Badge>
                ))
              }
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 h-full overflow-scroll p-4">
          {
            selectedData.length === 0 ? <p>Aucun aliment séléctionné</p> :
              selectedData.map((data, index) => (
                <div key={index} className='w-full bg-green-50 p-4 rounded border border-green-800 shadow flex flex-col items-center justify-between gap-2'>
                  <div className="w-full flex items-center justify-between">
                    <p className="font-bold text-green-800">{data.name}</p>
                    <div className='flex items-end justify-end gap-1 border-b border-solid border-green-800'>
                      <Input
                        type='number'
                        value={portions[data.name] || 100}
                        onChange={(e) => handlePortionChange(data.name, parseInt(e.target.value))}
                        min={0}
                        max={1000}
                        textSize="text-md" />
                      <p>g</p>
                    </div>
                    <div onClick={() => setSelectedData(selectedData.filter((selected) => selected !== data))} className="cursor-pointer">
                      <Trash color="red" />
                    </div>
                  </div>
                  <div className="w-full flex flex-wrap items-center justify-between">
                    <p className="text-green-800">Calories : <span className="text-black">{proportionWithPortion(data.calories, portions[data.name])} kcal</span></p>
                    <p className="text-green-800">Proteines : <span className="text-black">{proportionWithPortion(data.proteins, portions[data.name])} g</span></p>
                    <p className="text-green-800">Carbohydrates : <span className="text-black">{proportionWithPortion(data.carbohydrates, portions[data.name])} g</span></p>
                    <p className="text-green-800">Lipides : <span className="text-black">{proportionWithPortion(data.lipids, portions[data.name])} g</span></p>
                  </div>
                </div>
              ))
          }
        </div>

        <div className="flex flex-col gap-2 p-4">
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
        </div>
      </div>
    </div >
  );
}
