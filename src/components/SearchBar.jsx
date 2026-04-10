import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full bg-white border border-gray-300 rounded-md shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-da-burgundy focus:border-da-burgundy sm:text-sm transition-colors"
            placeholder="Search by Keyword, Subject, Course Number..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <button className="btn-primary w-full md:w-auto">
            Search Sections
          </button>
        </div>
      </div>
    </div>
  );
}
