import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../slices/productSlice";

interface catagory {
  id: string;
  name: string;
}

const Filter: React.FC = () => {
  const [categories, setCategories] = useState<catagory[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://world.openfoodfacts.org/categories.json")
      .then((res) => setCategories(res.data.tags))
      .catch((err) => console.log(err));
  }, []);

  function handleCategoryChange(e: { target: { value: string } }) {
    dispatch(setCategory(e.target.value));
  }

  return (
    <select
      onChange={handleCategoryChange}
      className="w-full py-1 rounded-lg text-gray-700 bg-white border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
    >
      <option value={""}>Select the Catogory</option>
      {categories &&
        categories.map((category: catagory) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
    </select>
  );
};

export default Filter;
