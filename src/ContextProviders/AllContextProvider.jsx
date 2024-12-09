import { PropTypes } from 'prop-types';
import { AuthProvider } from './AuthContextProvider';
import { MealProvider } from './MealContextProvider';
import { DateProvider } from './DateContextProvider';

export const ALLContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <MealProvider>
        <DateProvider>
          {children}
        </DateProvider>
      </MealProvider>
    </AuthProvider>

  )
}
// ____________________
ALLContextProvider.propTypes = {
  children: PropTypes.element
}