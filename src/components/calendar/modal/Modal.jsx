/* eslint-disable react/prop-types */
import { useState } from 'react';
import MealChecker from './MealChecker';

export const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times; </button>
        </div>
        <div>
          <MealChecker />
        </div>
        <div className="mt-4 flex justify-center">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-lg"> Close</button>
        </div>
      </div>
    </div>
  );
};

export const ModalComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className=" flex justify-center items-center">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg "
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};