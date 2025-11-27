import { useState } from "react";
import { MdMenu, MdSearch } from "react-icons/md";

export default function Topbar({ setSidebarOpen, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    onSearch(searchQuery.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-4 py-3">
      
      {/* Mobile toggle */}
      <button
        className="md:hidden text-2xl mr-3"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        <MdMenu />
      </button>

      {/* Search row */}
      <div className="flex items-stretch w-full max-w-md">

        {/* Input */}
        <input
          type="text"
          placeholder="Search Loan / Customer"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="
            flex-1
            border
            border-gray-300
            border-r-0
            px-4
            py-2
            rounded-l-md
            focus:outline-none
          "
        />

        {/* Search icon button */}
        <button
          onClick={handleSearch}
          className="
            flex items-center justify-center
            border
            border-gray-300
            border-l-0
            px-3
            py-2
            rounded-r-md
            bg-white
          "
        >
          <MdSearch size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <span className="text-2xl">🔔</span>
        <span className="text-2xl">👤</span>
      </div>
    </div>
  );
}
