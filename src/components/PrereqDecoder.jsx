import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';

export default function PrereqDecoder({ prereqString }) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  if (!prereqString || prereqString.toLowerCase() === 'none') {
    return null;
  }

  // Basic parser to split conditions by "or", "and", ","
  const conditions = prereqString
    .split(/\b(?:or|and)\b|;|,/)
    .map((c) => c.trim())
    .filter((c) => c.length > 0);

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium text-da-burgundy hover:text-[#6b0222] transition-colors focus:outline-none"
      >
        <span className="mr-1">Prerequisites</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="mt-3 bg-gray-50 p-4 rounded-md border border-gray-200">
           <p className="text-xs text-gray-500 mb-3 drop-shadow-none">
             <em>Original text: {prereqString}</em>
          </p>
          <div className="space-y-2">
            {conditions.map((cond, idx) => (
              <label 
                key={idx} 
                className="flex items-start gap-2 cursor-pointer group"
              >
                <div className="mt-0.5 relative flex items-start">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={!!checkedItems[idx]}
                    onChange={() => toggleCheck(idx)}
                  />
                  {checkedItems[idx] ? (
                    <CheckCircle className="h-5 w-5 text-da-burgundy" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300 group-hover:text-da-burgundy" />
                  )}
                </div>
                <span className={`text-sm select-none ${checkedItems[idx] ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                  {cond}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
