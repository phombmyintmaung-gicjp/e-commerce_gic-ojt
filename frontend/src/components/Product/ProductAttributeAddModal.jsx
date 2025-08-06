import React, { useState } from 'react'

const ProductAttributeAddModal = ({ show, title, handleAddAttr, onCancel }) => {
  if (!show) return null;
  const [name, setName] = useState('')
  const [value, setValue] = useState('')

  const onConfirm = () => {
    const attr = {
      name,
      value
    }
    handleAddAttr(attr)
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <input type="text"
          className='text-[14px] my-2 border px-3 py-2 rounded d-flex text-left h-[42px] w-[260px]'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Enter name' />
        <input
          type="text"
          className='text-[14px] my-2 border px-3 py-2 rounded d-flex text-left h-[42px] w-[260px]'
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='Enter value' />
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
}

export default ProductAttributeAddModal