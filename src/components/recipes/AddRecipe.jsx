











import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { backURL } from '../../lib/constants';

const AddRecipe = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [description, setDescription] = useState('');

  const handleAddRecipe = (type) => {
    let name = '';
    if (type === 'breakfast') {
      name = `B${breakfast.length + 1}`;
      setBreakfast([...breakfast, { name, description }]);
    }
    if (type === 'lunch') {
      name = `L${lunch.length + 1}`;
      setLunch([...lunch, { name, description }]);
    }
    if (type === 'dinner') {
      name = `D${dinner.length + 1}`;
      setDinner([...dinner, { name, description }]);
    }
  };

  const handleSubmit = async () => {
    const formattedDate = {
      date: selectedDate.getDate(),
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
    };

    try {
      const checkResponse = await axios.get(
        `${backURL}/recipes/${formattedDate.date}/${formattedDate.month}/${formattedDate.year}`
      );

      if (checkResponse.data) {
        alert('Recipe for this date already exists!');
        return;
      }

      const recipeData = { ...formattedDate, breakfast, lunch, dinner };
      const response = await axios.post(`${backURL}/recipes`, recipeData);
      console.log('Recipe added:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const recipeData = { ...formattedDate, breakfast, lunch, dinner };
        const response = await axios.post(`${backURL}/recipes`, recipeData);
        console.log('Recipe added:', response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Daily Recipes</h2>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {['Breakfast', 'Lunch', 'Dinner'].map((mealType, index) => {
        const mealState = mealType.toLowerCase();
        const setMeal = { breakfast: setBreakfast, lunch: setLunch, dinner: setDinner }[mealState];
        const meals = { breakfast, lunch, dinner }[mealState];

        return (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">{mealType}</h3>
            <input
              type="text"
              placeholder={`${mealType} Description`}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              onClick={() => handleAddRecipe(mealState)}
              className="p-1 px-4 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
            >
              Add
            </button>
            <ul className="mt-2 space-y-1">
              {meals.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-2 bg-gray-200 rounded-lg shadow-sm">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-gray-600">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none"
      >
        Submit Recipes
      </button>
    </div>
  );
};

export default AddRecipe;
