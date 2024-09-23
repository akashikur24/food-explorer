import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductCardPage = () => {
  const navigate = useNavigate();
  const cardProduct = useSelector(
    (state: RootState) => state.products.productCard
  );
  if (cardProduct.length <= 0) {
    return (
      <div
        className={`h-[calc(100vh-4rem)] flex flex-col justify-center items-center`}
      >
        <h1>No product</h1>
        <button
          className="border px-4 py-2 rounded-md"
          onClick={() => navigate("/")}
        >
          Return To ProductList
        </button>
      </div>
    );
  }
  return (
    <>
      <h1 className="font-bold text-center text-2xl">Cart Items</h1>
      <div className="grid grid-cols-4 gap-5 mx-20 my-5 max-lg:grid-cols-3 max-lg:mx-10 max-md:grid-cols-2 max-md:mx-10 max-sm:grid-cols-1">
        {cardProduct.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </>
  );
};

export default ProductCardPage;
