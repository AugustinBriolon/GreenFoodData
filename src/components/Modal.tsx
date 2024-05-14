import { ModalType } from "../types";
import { Trash } from "./Icons";

export default function Modal({ isOpen, toggle, selectedData, setSelectedData }: ModalType) {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-20 p-5 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
      onClick={toggle}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className='w-full md:w-1/2 aspect-square bg-white p-4 rounded-lg shadow-lg flex flex-col gap-8'
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 h-full">
          <h2 className='text-2xl text-green-800 font-semibold'>Votre repas :</h2>
          <div className="flex flex-col gap-2">
            {
              selectedData.length === 0 ? <p>Aucun aliment séléctionné</p> :
                selectedData.map((data, index) => (
                  <div key={index} className='w-full border-b border-t-green-800 flex items-center justify-between'>
                    <p>{data.name}</p>
                    
                    <p>{data.calories} kcal</p>
                    <div onClick={() => setSelectedData(selectedData.filter((selected) => selected !== data))} className="cursor-pointer">
                      <Trash />
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-green-800">Total :</h2>
          <div className="flex flex-col gap-1">
            <div className="w-full flex items-center justify-between">
              <p>Nb d'aliments</p>
              <p className="font-semibold">{selectedData.length}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p>Calories</p>
              <p className="font-semibold">{selectedData.reduce((acc, curr) => acc + curr.calories, 0)} kcal</p>
            </div>
          </div>
        </div>
        {/* <button onClick={toggle} className='bg-red-500 text-white px-2 py-1 rounded-lg'>Fermer</button> */}
      </div>
    </div >
  );
}
