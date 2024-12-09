/* eslint-disable react/prop-types */

import { createContext, useState } from "react";




export const DateContext = createContext();
export const DateProvider = ({ children }) => {

  const today = new Date();
  const [homeDate, setHomeDate] = useState(today.getDate());
  const [homeMonth, setHomeMonth] = useState(today.getMonth() + 1); // Months are 0-indexed
  const [homeYear, setHomeYear] = useState(today.getFullYear());

  // calender
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentDate, setCurrentDate] = useState('');



  const dateInfo = { homeDate, setHomeDate, homeMonth, setHomeMonth, homeYear, setHomeYear,
    currentDate,setCurrentDate,
    currentMonth,setCurrentMonth,
    currentYear,setCurrentYear
   };
  return (
    <DateContext.Provider value={dateInfo}>
      {children}
    </DateContext.Provider>
  )
}