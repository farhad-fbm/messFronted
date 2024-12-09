
import { useContext, useState } from 'react';
import { bazarDate, userMess } from './../../lib/constants';
import { Modal } from './modal/Modal';
import { DateContext } from '../../ContextProviders/DateContextProvider';
import { Helmet } from 'react-helmet';

const getDaysInMonth = (year, month) => {
  return new Array(new Date(year, month, 0).getDate())
    .fill(null).map((_, i) => i + 1);
};
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};

const TD = new Date();
const today = `${TD.getFullYear()}-${TD.getMonth() + 1}-${TD.getDate()}`

export const Calendar = () => {
  const {setCurrentDate,currentMonth,setCurrentMonth,currentYear,setCurrentYear}=useContext(DateContext);
  const [selectedDate, setSelectedDate] = useState(today);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  const updateMonth = (direction) => {
    setCurrentMonth(prevMonth => {
      const newMonth = (prevMonth + direction + 11) % 12 + 1;
      if (newMonth === 12 && direction === -1) setCurrentYear(prevYear => prevYear - 1);
      if (newMonth === 1 && direction === 1) setCurrentYear(prevYear => prevYear + 1);
      return newMonth
    })
  }
  const handleGoToToday = () => {
    setCurrentYear(TD.getFullYear());
    setCurrentMonth(TD.getMonth() + 1);
    setSelectedDate(today);
  };
  // ______________________________________________________________
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // ... [Other code remains unchanged]

  const handleDayClick = (dateStr) => {
    const now = new Date();
    const clickedDate = new Date(dateStr);
  
    const isToday = clickedDate.toDateString() === now.toDateString();
    const isFutureDate = clickedDate > now;
  
    // Check conditions for opening the modal
    if ( isFutureDate) {
      setSelectedDate(dateStr);
      setCurrentDate(dateStr.split('-')[2]); // Update the current date
      console.log("Selected Date:", dateStr);
      openModal(); // Open the modal
    } else {
      // Set alert message and open the alert modal
      setAlertMessage('Modal can only be opened before 6 PM for today or on future dates.');
      setIsAlertOpen(true);
    }
  };
  
  const closeAlertModal = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className="">
      <Helmet><title>Mess | Calendar</title></Helmet>

      {/* <div className=""><HomeClock /></div> */}
      <div className="p-4 mt-10 max-w-2xl mx-auto">
        <div className="flex justify-between items-center">
          <button className='p-4 text-6xl font-extrabold' onClick={() => updateMonth(-1)}>{'<'}</button>
          <p className="text-2xl font-bold mb-4">{monthNames[currentMonth - 1]} {currentYear}</p>
          <button className='p-4 text-6xl font-extrabold' onClick={() => updateMonth(1)}>{'>'}</button>
        </div>
        <div className="grid grid-cols-7 grid-rows-6 gap-1 h-[60vh]">
          {/* Render day names */}
          {dayNames.map((day, idx) => (
            <div key={idx} className="text-center font-bold">{day}</div>
          ))}

          {/* Render empty cells for days before the first day of the month */}
          {Array(firstDay).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="text-center"></div>
          ))}

          {/* Render days of the month */}
          {daysInMonth.map(day => {
            const dateStr = `${currentYear}-${currentMonth}-${day}`;
            let bgColor = 'bg-white text-black';
            if (dateStr === today) bgColor = 'bg-orange-500 text-black';
            else if (dateStr === selectedDate) bgColor = 'bg-blue-500 text-white';

            return (
              <div
                key={day}
                onClick={() => handleDayClick(dateStr)}
                className={`text-center md:py-2 md:px-6 cursor-pointer border rounded-lg ${bgColor} flex flex-col justify-center items-center`}
              >
                {/* Day number */}
                <p className="font-extrabold text-2xl">{day}</p>

                {/* Bazar date or manager for specific days */}
                {/* <div className={`font-bold text-[#001F3F] text-sm ${((day <= 15 && bazarDate[day - 1] === userMess) || (day > 15 && bazarDate[day - 15 - 1] === userMess)) ? 'bg-red-600 p-1 rounded-3xl' : ''}`}>
                  {day === 31 ? ("") :
                    (
                      (day <= 15 && bazarDate[day - 1] === userMess) ? <p>Bazar</p> :
                        (day > 15 && bazarDate[day - 15 - 1] === userMess) ? <p>Bazar</p> : null
                    )}
                </div> */}


                {/* User meals */}
                {/* <div className="">
                  {todayUserMeals[0]} {todayUserMeals[1]} {todayUserMeals[2]}
                </div> */}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            className="px-4 py-2 bg-slate-300 font-extrabold rounded-lg"
            onClick={handleGoToToday}
          >
            Go to Today
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      {isAlertOpen && (
        <AlertModal
          message={alertMessage}
          onClose={closeAlertModal}
        />
      )}
    </div>
  );
};




// _________________________________________________________________________________________

const AlertModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>Modal can only be opened before 6 PM for future dates</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};