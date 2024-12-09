import { useContext } from "react";
import DropDownContainer from "./dropDown/MealsDropDown"
import { DateContext } from "../../ContextProviders/DateContextProvider";



export const DayCard = () => {
  const { homeDate, homeMonth, homeYear } = useContext(DateContext);
  const currentDate = new Date(homeYear, homeMonth - 1, homeDate);
  const homeDayName = currentDate.toLocaleString('en-US', { weekday: 'long' });
  const homeMonthName = currentDate.toLocaleString('en-US', { month: 'long' });
  
  return (
    <div className="grid grid-rows-[1fr_3fr] h-[350px] pt-6">
      <div className=" grid place-items-center text-5xl font-extrabold bg-background1 rounded-t-lg text-text3">{homeMonthName}, {homeYear}</div>
      <div className=" grid grid-rows-[2fr_1fr_1fr] bg-background2 text-text1 rounded-b-lg">
        <div className=" grid place-items-center text-9xl font-extrabold ">{homeDate}</div>
        <div className=" grid place-items-center text-3xl font-bold mt-6">{homeDayName}</div>
        <div className=" flex lg:justify-around lg:gap-0 justify-center gap-20 items-end mb-1 ml-3"> <DropDownContainer /></div>

      </div>
    </div>

  )
}
