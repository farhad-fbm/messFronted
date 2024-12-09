/* eslint-disable react/prop-types */

import { createContext, useState } from "react";




export const MealContext = createContext();
export const MealProvider = ({ children }) => {

  const [todayMeals, setTodayMeals] = useState([]);
  const [recipe, setRecipe] = useState(null);
  

  const mealInfo = { todayMeals, setTodayMeals,recipe,setRecipe }
  return (
    <MealContext.Provider value={mealInfo}>
      {children}
    </MealContext.Provider>
  )
}