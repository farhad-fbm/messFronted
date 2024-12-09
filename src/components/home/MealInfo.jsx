import { useContext } from "react"
import { MealContext } from "../../ContextProviders/MealContextProvider"


export const MealInfo = () => {

  const { recipe } = useContext(MealContext);
  
  return (
    <div className="rounded-lg  grid grid-rows-[1fr_3fr] h-[350px] pt-6">
      <div className=" grid place-items-center text-5xl font-extrabold bg-background1 rounded-lg text-text3 mb-1">Today Meal Plan</div>

      <div className="grid grid-cols-[1fr_1fr_1fr]  gap-1">
        <div className="bg-background3 rounded-lg md:mb-20 lg:mb-0">
          <h3 className="font-extrabold text-2xl text-indigo-600 text-center">Breakfast</h3>
          {recipe?.breakfast?.map((item, index) => (
            <li key={index} className="px-6 pt-4 text-left font-semibold">
              {item.description}
            </li>
          ))}        
        </div>
        <div className="bg-background3 text-center rounded-lg  md:mb-20 lg:mb-0">
          <h3 className="font-extrabold text-2xl text-purple-600">Lunch</h3>
          {recipe?.lunch?.map((item, index) => (
            <li key={index} className="px-6 pt-4 text-left font-semibold">
              {item.description}
            </li>
          ))}
        </div>
        <div className="bg-background3 text-center rounded-lg md:mb-20 lg:mb-0">
          <h3 className="font-extrabold text-2xl text-pink-600">Dinner</h3>
          {recipe?.dinner?.map((item, index) => (
            <li key={index} className="px-6 pt-4 text-left font-semibold">
              {item.description}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}
