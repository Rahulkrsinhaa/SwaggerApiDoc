import React from 'react';
import { ChevronDown } from "lucide-react";

function Dropdown({ label, options, selected, onChange }) {
  return (
    <div className="w-full">
      <label className="block font-semibold text-blue-700 mb-1">{label}</label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded p-2 appearance-none pr-8"
        >
          <option value="" disabled>Select...</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-3 pointer-events-none text-gray-500" size={16} />
      </div>
    </div>
  );
}

export default Dropdown;