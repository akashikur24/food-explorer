import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const products = useSelector(
    (state: RootState) => state.products.productList
  );
  if (!products) {
    return <p>No Item Available </p>;
  }
  return (
    <div className="grid grid-cols-4 gap-5 mx-20 my-5 max-lg:grid-cols-3 max-lg:mx-10 max-md:grid-cols-2 max-md:mx-10 max-sm:grid-cols-1">
      {products.map((product, index) => (
        <ProductCard product={product} key={index} />
      ))}
    </div>
  );
};

export default ProductList;
