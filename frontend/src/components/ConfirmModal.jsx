import React from "react";

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
