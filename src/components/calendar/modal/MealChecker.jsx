
import { useContext, useState } from 'react';
import axios from 'axios';
import { DateContext } from '../../../ContextProviders/DateContextProvider';
import { AuthContext } from '../../../ContextProviders/AuthContextProvider';
import { backURL } from '../../../lib/constants';

const MealChecker = () => {
  const { currentDate, currentMonth, currentYear } = useContext(DateContext);
  const { user } = useContext(AuthContext);
  const [mealInfo, setMealInfo] = useState({
    date: currentDate,
    month: currentMonth,
    year: currentYear,
    membername: user?.name,
    breakfast: 1,
    lunch: 1,
    dinner: 1,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value ? parseInt(value) : value,  // Convert to integer for meals, leave as string for others
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the PUT request using Axios
      console.log(mealInfo);
      const response = await axios.put(
        `${backURL}/dailymeals/updateMeal/${mealInfo.date}/${mealInfo.month}/${mealInfo.year}/${mealInfo.membername}`,
        {
          breakfast: mealInfo.breakfast,
          lunch: mealInfo.lunch,
          dinner: mealInfo.dinner,
        }
      );

      // Handle success
      alert('Meal updated successfully:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error updating meal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <div className="flex items-center mb-2">
        <label htmlFor="breakfast" className="text-lg mr-2">Breakfast:</label>
        <input
          type="number"
          id="breakfast"
          name="breakfast"
          value={mealInfo.breakfast}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-24"
          min="0"
        />
      </div>

      <div className="flex items-center mb-2">
        <label htmlFor="lunch" className="text-lg mr-2">Lunch:</label>
        <input
          type="number"
          id="lunch"
          name="lunch"
          value={mealInfo.lunch}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-24"
          min="0"
        />
      </div>

      <div className="flex items-center mb-2">
        <label htmlFor="dinner" className="text-lg mr-2">Dinner:</label>
        <input
          type="number"
          id="dinner"
          name="dinner"
          value={mealInfo.dinner}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-24"
          min="0"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default MealChecker;

