import { useState } from 'react';
import { updateMeal } from './updateMeal';

const UpdateMeal = () => {
  const [formData, setFormData] = useState({
    date: '',
    month: '',
    year: '',
    memberName: '',
    breakfast: 0,
    lunch: 0,
    dinner: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedMeal = await updateMeal(formData);
      console.log('Meal updated successfully:', updatedMeal);
      alert('Meal updated successfully!');
    } catch (error) {
      alert('Error updating meal');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Meal</h2>

      <div>
        <label>Date: </label>
        <input type="number" name="date" value={formData.date} onChange={handleChange} required />
      </div>
      <div>
        <label>Month: </label>
        <input type="number" name="month" value={formData.month} onChange={handleChange} required />
      </div>
      <div>
        <label>Year: </label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} required />
      </div>
      <div>
        <label>Member Name: </label>
        <input type="text" name="memberName" value={formData.memberName} onChange={handleChange} required />
      </div>
      <div>
        <label>Breakfast: </label>
        <input type="number" name="breakfast" value={formData.breakfast} onChange={handleChange} required />
      </div>
      <div>
        <label>Lunch: </label>
        <input type="number" name="lunch" value={formData.lunch} onChange={handleChange} required />
      </div>
      <div>
        <label>Dinner: </label>
        <input type="number" name="dinner" value={formData.dinner} onChange={handleChange} required />
      </div>

      <button type="submit">Update Meal</button>
    </form>
  );
};

export default UpdateMeal;
