import React from 'react';

const ListBox = ({ title, items, selectedItems, onSelectionChange, className = "" }) => {
  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      onSelectionChange(selectedItems.filter(selected => selected !== item));
    } else {
      onSelectionChange([...selectedItems, item]);
    }
  };

  return (
    <div className={`bg-white border border-gray-300 rounded ${className}`}>
      <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
        {title}
      </div>
      <div className="h-40 overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item)}
            className={`px-4 py-2 cursor-pointer border-b border-gray-200 hover:bg-blue-50 ${
              selectedItems.includes(item) ? 'bg-blue-100' : ''
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBox;
