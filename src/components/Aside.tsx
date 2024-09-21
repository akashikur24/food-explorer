import React from "react";
import SearchBar from "./SearchBar";
import { setSortOrder, SortOption } from "../slices/productSlice";
import { useDispatch } from "react-redux";
import Filter from "./Filter";
import { X } from "lucide-react";
import { HeaderProps } from "./Header";

const Aside: React.FC<HeaderProps> = ({ setIsModal }) => {
  const dispatch = useDispatch();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = event.target.value as SortOption;
    dispatch(setSortOrder(sortOrder));
  };
  return (
    <div className="w-4/5  h-screen hidden absolute top-0 right-0 bg-gray-300 max-lg:flex flex-col items-center gap-y-6 pt-10 md:w-3/5">
      <div
        className="cursor-pointer"
        onClick={() => setIsModal((prev) => !prev)}
      >
        <X color="white" />
      </div>
      <div>
        <SearchBar />
      </div>
      <div>
        <Filter />
      </div>
      <div>
        <select
          onChange={handleSortChange}
          className="py-1 px-4 rounded-lg text-gray-700 bg-white border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
        >
          <option value="">Sort by</option>
          <option value="name-asc">Product Name (A-Z)</option>
          <option value="name-desc">Product Name (Z-A)</option>
          <option value="grade-asc">Nutrition Grade (Ascending)</option>
          <option value="grade-desc">Nutrition Grade (Descending)</option>
        </select>
      </div>
    </div>
  );
};

export default Aside;
