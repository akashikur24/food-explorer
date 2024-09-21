import React from "react";
import { useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { setSearchQuery } from "../slices/productSlice";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className="relative ">
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search for product name or barcode "
        className="w-80 max-md:w-full py-1 rounded-lg pl-11 pr-4 text-gray-700 bg-white border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;
