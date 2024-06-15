// List.tsx
import clsx from "clsx";
import { Badge } from "@radix-ui/themes";
import { ListProps, Data, SelectedData } from "../types";
import { ListSkeleton } from "./Skeleton";
import { getColor } from "../utils/getColor";
import { getProportion } from "../utils/getProportion";

export default function List({ data, portion, selectedData, setSelectedData }: ListProps) {

  const handleSelectData = (food: Data) => {
    const existingItemIndex = selectedData.findIndex(item => item.food === food);
    if (existingItemIndex !== -1) {
      // Remove the item if it's already selected
      setSelectedData(selectedData.filter((_, index) => index !== existingItemIndex));
    } else {
      // Add the item with the portion
      setSelectedData([...selectedData, { food, portion }]);
    }
  };

  if (!data) {
    return <ListSkeleton />;
  }

  return (
    <div className="w-full border border-solid rounded-lg border-gray-200">
      <div className="flex flex-col overflow-scroll max-h-list noscrollbar">
        <div className="sticky top-0 z-10 sm:min-w-mille w-max lg:w-auto font-bold text-sm grid grid-cols-md-list lg:grid-cols-list bg-green-800 border-b rounded-t-lg items-center justify-between gap-4 shadow">
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="accent-green-600 hover:accent-green-700 ml-2"
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
            data.map((food, index) => {
              const isSelected = selectedData.some(item => item.food === food);
              return (
                <div
                  key={index}
                  className={clsx(
                    "select-none sm:min-w-mille w-max md:w-auto grid grid-cols-md-list lg:grid-cols-list py-4 border-b border-solid border-gray-200 hover:bg-green-50 items-center justify-between gap-4 text-sm last:border-b-0",
                    isSelected && "bg-green-50"
                  )}
                  onClick={() => handleSelectData(food)}
                >
                  <div className="flex items-center justify-start gap-2">
                    <input
                      type="checkbox"
                      className="accent-green-800 hover:accent-green-900 ml-2"
                      checked={isSelected}
                      onChange={() => handleSelectData(food)}
                    />
                    <p className="text-sm text-green-800 font-bold">{food.name}</p>
                  </div>
                  <Badge color={getColor(food.category)} className="text-sm w-fit font-normal" highContrast>{food.category}</Badge>
                  <p className={clsx("text-sm text-green-800 font-bold flex gap-1", food.calories > 100 ? "text-red-500" : "text-green-800")}>
                    <span className="block truncate max-w-20">{getProportion(food.calories, portion)}</span> kcal
                  </p>
                  <p className="text-sm text-green-800 flex gap-1"><span className="block truncate max-w-15">{getProportion(food.carbohydrates, portion)}</span> g</p>
                  <p className="text-sm text-green-800 flex gap-1"><span className="block truncate max-w-15">{getProportion(food.proteins, portion)}</span> g</p>
                  <p className="text-sm text-green-800 flex gap-1"><span className="block truncate max-w-15">{getProportion(food.lipids, portion)}</span> g</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}