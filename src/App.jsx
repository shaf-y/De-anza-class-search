import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import SearchBar from './components/SearchBar';
import CourseList from './components/CourseList';
import classesData from './data/classes.json';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(classesData, {
      keys: [
        { name: 'code', weight: 3 },
        { name: 'title', weight: 2 },
        { name: 'description', weight: 1 }
      ],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true
    });
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults(classesData.slice(0, 50)); // default show 50
    } else {
      const searchResults = fuse.search(query);
      setResults(searchResults.map(result => result.item).slice(0, 100)); // cap at 100
    }
  }, [query, fuse]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Banner (Header) */}
      <header className="bg-da-burgundy text-white w-full border-b-[6px] border-da-gold shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
                De Anza College
              </h1>
              <p className="text-[#fca5a5] font-medium text-sm tracking-wide uppercase">
                Catalog 2025–2026
              </p>
            </div>
            <div className="mt-4 md:mt-0 font-medium text-da-gold text-lg md:text-xl">
              Class Search
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 lg:px-8">
        
        {/* Breadcrumb / Title area */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Search for Sections</h2>
          <p className="text-sm text-gray-600 mt-1">
            Browse the course catalog for the upcoming terms. Use the filters below to narrow your selection.
          </p>
        </div>

        <SearchBar value={query} onChange={setQuery} />
        
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-lg font-semibold text-gray-800">Search Results</h3>
          <span className="text-sm text-gray-500 font-medium bg-gray-200 px-3 py-1 rounded-full">
            Showing {results.length} of {classesData.length} records
          </span>
        </div>
        
        {/* Results List */}
        <div className="bg-gray-100 p-2 md:p-4 rounded-lg border border-gray-200">
          <CourseList courses={results} />
        </div>
        
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center text-sm border-t-[4px] border-da-gold mt-auto">
        <p>© {new Date().getFullYear()} De Anza College</p>
        <p className="mt-1">Class Search UI designed for Institutional Clarity</p>
      </footer>
    </div>
  );
}

export default App;
