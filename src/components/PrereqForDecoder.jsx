import { useState } from 'react';
import { ChevronDown, ChevronUp, Link } from 'lucide-react';

export default function PrereqForDecoder({ prereqForList }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!prereqForList || prereqForList.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium text-da-gold hover:text-yellow-600 transition-colors focus:outline-none"
      >
        <span className="mr-1">Prerequisite For ({prereqForList.length})</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="mt-3 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {prereqForList.map((code, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded shadow-sm"
              >
                <Link className="h-3 w-3 text-da-gold" />
                {code}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
