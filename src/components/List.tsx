import clsx from "clsx"
import { Badge } from "@radix-ui/themes"

import { ListProps, Data } from "../types"
import { ListSkeleton } from "./Skeleton"

export default function List({ data, portion, selectedData, setSelectedData }: ListProps) {

  const proportionWithPortion = (value: number) => {
    if (Number.isNaN(portion)) {
      return 0;
    } else {
      return ((value * portion) / 100).toFixed(1)
    }
  }

  const handleSelectData = (food: Data) => {
    if (selectedData.includes(food)) {
      setSelectedData(selectedData.filter((selected) => selected !== food))
    } else {
      setSelectedData([...selectedData, food])
    }
  }

  if (!data) {
    return (
      <ListSkeleton />
    )
  }

  return (
    <div className="w-full border border-solid rounded-lg border-gray-200">
      <div className="flex flex-col overflow-scroll max-h-list noscrollbar">
        <div className="sticky top-0 z-10 min-w-mille w-max lg:w-auto font-bold text-sm grid grid-cols-md-list lg:grid-cols-list bg-green-800 border-b rounded-t-lg items-center justify-between gap-4 shadow">
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="accent-green-600 hover:accent-grenn-700 ml-2"
            />
            <p className="flex items-center gap-2 text-xs font-bold select-none py-2 text-white uppercase">
              Nom
            </p>
          </div>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2 text-white uppercase">
            Catégorie
          </p>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2 text-white uppercase">
            Calories
          </p>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2 text-white uppercase">
            Glucides
          </p>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2 text-white uppercase">
            Protéines
          </p>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2 text-white uppercase">
            Lipides
          </p>
        </div>

        <div className="h-fit">
          {data.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Aucun aliment ne correspond à la recherche</p>
          ) : (
            data.map((food, index) => (
              <div key={index} className={clsx("min-w-mille w-max md:w-auto grid grid-cols-md-list lg:grid-cols-list py-4 border-b border-solid border-gray-200 hover:bg-green-50 items-center justify-between gap-4 text-sm last:border-b-0", selectedData.includes(food) && "bg-green-50")} onClick={() => handleSelectData(food)}>
                <div className="flex items-center justify-start gap-2">
                  <input
                    type="checkbox"
                    className="accent-green-600 hover:accent-green-700 ml-2"
                    checked={selectedData.includes(food)}
                    onChange={() => handleSelectData(food)}
                  />
                  <p className="text-sm text-green-800 font-bold">{food.name}</p>
                </div>
                <Badge color={food.category === "Fruits" ? "ruby" : "grass"} className="text-sm w-fit font-normal">{food.category}</Badge>
                <p className={clsx("text-sm text-green-800 font-bold  flex gap-1", food.calories > 100 ? "text-red-500" : "text-green-800")}>  <span className="block truncate max-w-20">{proportionWithPortion(food.calories)}</span> kcal</p>

                <p className="text-sm text-green-800 flex gap-1"> <span className="block truncate max-w-15"> {proportionWithPortion(food.carbohydrates)}</span> g</p>
                <p className="text-sm text-green-800 flex gap-1"> <span className="block truncate max-w-15"> {proportionWithPortion(food.proteins)}</span> g</p>
                <p className="text-sm text-green-800 flex gap-1"> <span className="block truncate max-w-15"> {proportionWithPortion(food.lipids)}</span> g</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
