/* eslint-disable react/prop-types */

import { useState, useEffect, useRef, useContext } from "react";
import { MealContext } from './../../../ContextProviders/MealContextProvider';



const MealDropdown = ({ id, mealData, total, isOpen, onClick }) => {
  //____________________________
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClick(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClick]);
  // ______________________________________________________________

  return (
  
    <div ref={dropdownRef} className="relative inline-block mr-4 font-extrabold">
      <button
        className={`py-1 px-2 rounded inline-flex items-center ${isOpen ? 'bg-[#AAB396] text-white' : 'bg-[#FFF8E8] text-gray-700'}`}
        onClick={() => onClick(id)}
      >
        {id} : {total} {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center ml-6 -mt-2 bg-black bg-opacity-50 z-50"
        >
          <div className="bg-[#EEEDEB] text-[#2F3645] rounded-xl shadow-lg w-48 z-50">
            <div className="text-2xl font-extrabold text-black px-2 pb-2">
              {id === 'M' ? "Morning" : id === "L" ? "Lunch" : "Dinner"}-{total}
            </div>
            {mealData.map((data, idx) => (
              <div key={idx} className="px-4 py-1 flex justify-between gap-2 border rounded-xl border-gray-300">
                <p>{data.name} :</p>
                <p>{data.num}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

  );
};











const DropDownContainer = () => {
  const { todayMeals } = useContext(MealContext);
console.log(todayMeals);


  const breakfast = todayMeals.map((member) => ({    
    name: member.memberName,
    num: member.breakfast,
  }));
  const lunch = todayMeals.map((member) => ({
    name: member.memberName,
    num: member.lunch
  }));
  const dinner = todayMeals.map((member) => ({
    name: member.memberName,
    num: member.dinner
  }));


  // Calculate totals
  const totalBreakfast = todayMeals.reduce((acc, member) => acc + member.breakfast, 0);
  const totalLunch = todayMeals.reduce((acc, member) => acc + member.lunch, 0);
  const totalDinner = todayMeals.reduce((acc, member) => acc + member.dinner, 0);





  const [openDropdown, setOpenDropdown] = useState(null);
  const handleDropdownClick = (dropdownId) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdownId ? null : dropdownId
    );
  };

  return (

    <>
      <MealDropdown
        id="M"
        mealData={breakfast}
        total={totalBreakfast}
        isOpen={openDropdown === "M"}
        onClick={handleDropdownClick}
      />
      <MealDropdown
        id="L"
        mealData={lunch}
        total={totalLunch}
        isOpen={openDropdown === "L"}
        onClick={handleDropdownClick}
      />
      <MealDropdown
        id="D"
        mealData={dinner}
        total={totalDinner}
        isOpen={openDropdown === "D"}
        onClick={handleDropdownClick}
      />
    </>
  );
};

export default DropDownContainer;
