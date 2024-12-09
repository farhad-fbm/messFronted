import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { backURL } from '../../lib/constants';
import { DateContext } from './../../ContextProviders/DateContextProvider';
import { MealContext } from '../../ContextProviders/MealContextProvider';

const GetRecipe = () => {
  const [error, setError] = useState('');

  const { homeDate, homeMonth, homeYear } = useContext(DateContext);
  const { recipe, setRecipe } = useContext(MealContext)


  const handleFetchRecipe = async () => {
    try {
      const response = await axios.get(`${backURL}/recipes/${homeDate}/${homeMonth}/${homeYear}`);
      setRecipe(response.data);

      setError('');
    } catch (err) {
      setError('No recipe found for the selected date.');
      setRecipe(null); // Clear the recipe in case of an error
    }
  };

  useEffect(() => {
    handleFetchRecipe();
  }, [homeDate, homeMonth, homeYear]);


  return (
    // <div>

    //   {error && <p style={{ color: 'red' }}>{error}</p>}

    //   {recipe && (
    //     <div>
    //       {/* breakFast */}
    //       <div className="">
    //         <h4>Breakfast</h4>
    //         <ul>
    //           {recipe.breakfast.map((item, index) => (
    //             <li key={index}>
    //               {item.name} - {item.description}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //       {/* lunch */}
    //       <div className="">
    //         <h4>Lunch</h4>
    //         <ul>
    //           {recipe.lunch.map((item, index) => (
    //             <li key={index}>
    //               {item.name} - {item.description}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //       {/* dinner */}
    //       <div className="">
    //         <h4>Dinner</h4>
    //         <ul>
    //           {recipe.dinner.map((item, index) => (
    //             <li key={index}>
    //               {item.name} - {item.description}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>

    //     </div>
    //   )}
    // </div>
    <div></div>
  );
};

export default GetRecipe;
