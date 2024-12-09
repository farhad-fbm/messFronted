
// eslint-disable-next-line no-unused-vars
import DailyMeals from "../meals/DailyMeals";
import GetRecipe from "../recipes/GetRecipe";
import { DayCard } from "./DayCard";
import { HomeClock } from "./homeClock/HomeClock";
import { MealInfo } from "./MealInfo";


export const Home = () => {

  return (
    <div className="pt-2">
      <HomeClock />
      {/* <div className="lg:grid grid-cols-[1fr_1.5fr] gap-1 px-1 pt-8 h-96" > */}
      <div>
        <DayCard />
        <MealInfo />
      </div>
      {/* next   previous */}
      <DailyMeals />  

      <GetRecipe/>
    </div>
  )
}
