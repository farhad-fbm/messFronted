import axios from 'axios';

const backURL = 'http://localhost:5000/api';

export const updateMeal = async ({ date, month, year, memberName, breakfast, lunch, dinner }) => {
  try {
    const response = await axios.put(
      `${backURL}/dailymeals/updateMeal/${date}/${month}/${year}/${memberName}`,
      { breakfast, lunch, dinner }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating meal:', error);
    throw error;
  }
};
