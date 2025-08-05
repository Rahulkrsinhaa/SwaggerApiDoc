import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const TransferButton = ({ direction, onClick, disabled = false }) => {
  const Icon = direction === 'right' ? ChevronRight : ChevronLeft;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors ${
        disabled 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      <Icon size={20} />
    </button>
  );
};

export default TransferButton;