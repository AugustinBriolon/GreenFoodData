import clsx from "clsx";

export function ListSkeleton() {
  return (
    <div className="w-full border border-solid rounded-lg border-gray-200">
      <div className="flex flex-col overflow-scroll max-h-list noscrollbar">
        <div className="sticky top-0 z-10 min-w-mille w-max lg:w-auto font-bold text-sm grid grid-cols-md-list lg:grid-cols-list bg-green-100 border-b rounded-t-lg items-center justify-between gap-4 shadow">
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="accent-blue-600 hover:accent-grenn-700 ml-2"
            />
            <p className="flex items-center gap-2 text-xs font-bold select-none py-2">
              Nom
            </p>
          </div>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2">
            Catégorie
          </p>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2">
            Calories
          </p>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2">
            Glucides
          </p>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2">
            Protéines
          </p>
          <p className="flex items-center gap-2 text-xs font-bold select-none py-2">
            Lipides
          </p>
        </div>

        <div className="h-fit">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="min-w-mille w-max md:w-auto grid grid-cols-md-list lg:grid-cols-list border-b border-solid border-gray-200 items-center justify-between gap-4 text-sm last:border-b-0">
              <div className="flex items-center gap-4">
                <p className="w-3 h-3  aspect-square ml-2 bg-green-600 rounded-sm animate-pulse"></p>
                <p
                  className={clsx(
                    "h-3 my-5 bg-green-600 rounded-full animate-pulse",
                    index % 1 === 0 && "w-1/2",
                    index % 2 === 0 && "w-2/3",
                    index % 3 === 0 && "w-3/4",
                    index % 5 === 0 && "w-4/5",
                    index % 7 === 0 && "w-4/6",
                    index % 8 === 0 && "w-5/6",
                  )}
                ></p>
              </div>
              <p className="w-full h-3 my-5 bg-green-600 rounded-full animate-pulse"></p>
              <p
                className={clsx(
                  "h-3 my-5 bg-green-600 rounded-full animate-pulse",
                  index % 1 === 0 && "w-4/6",
                  index % 2 === 0 && "w-4/5",
                  index % 3 === 0 && "w-1/2",
                  index % 5 === 0 && "w-2/3",
                  index % 7 === 0 && "w-3/4",
                  index % 8 === 0 && "w-1/2",
                )}
              ></p>
              <p
                className={clsx(
                  "h-3 my-5 bg-green-600 rounded-full animate-pulse",
                  index % 1 === 0 && "w-1/2",
                  index % 2 === 0 && "w-3/4",
                  index % 3 === 0 && "w-2/3",
                  index % 5 === 0 && "w-1/2",
                  index % 7 === 0 && "w-4/5",
                  index % 8 === 0 && "w-4/6",
                )}
              ></p>
              <p
                className={clsx(
                  "h-3 my-5 bg-green-600 rounded-full animate-pulse",
                  index % 1 === 0 && "w-2/3",
                  index % 2 === 0 && "w-3/4",
                  index % 3 === 0 && "w-1/2",
                  index % 5 === 0 && "w-1/2",
                  index % 7 === 0 && "w-4/6",
                  index % 8 === 0 && "w-4/5",
                )}
              ></p>
              <p
                className={clsx(
                  "h-3 my-5 bg-green-600 rounded-full animate-pulse",
                  index % 1 === 0 && "w-4/5",
                  index % 2 === 0 && "w-4/6",
                  index % 3 === 0 && "w-3/4",
                  index % 5 === 0 && "w-2/3",
                  index % 7 === 0 && "w-1/2",
                  index % 8 === 0 && "w-1/2",
                )}
              ></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
