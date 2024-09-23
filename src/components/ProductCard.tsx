import { Link } from "react-router-dom";
import { Product, removeCard, setProductCart } from "../slices/productSlice";
import no_Image_found from "../images/no_image_found.jpg";
import { useDispatch } from "react-redux";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useMemo } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const cardProduct = useSelector(
    (state: RootState) => state.products.productCard
  );
  const isProductInCard = useMemo(() => {
    return cardProduct.some((item) => item.code === product.code);
  }, [cardProduct, product.code]);

  function handleCardClick() {
    if (isProductInCard) {
      dispatch(removeCard(product.code));
    } else {
      dispatch(setProductCart(product));
    }
  }

  return (
    <div className="h-full bg-white shadow-lg rounded-lg border border-gray-200 flex justify-between flex-col">
      <Link
        to={`/product/${product.code}`}
        className=" flex flex-col justify-between"
      >
        <div className="flex justify-center items-center">
          <img
            src={product.image_url || no_Image_found}
            alt={product.code}
            className="w-48 h-48 object-contain rounded-lg p-3"
          />
        </div>
        <div className="p-6">
          <h1 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition duration-300">
            {product.product_name_en || "No name provided"}
          </h1>
          <div>
            <span className="font-semibold"> Categories :</span>
            <span className="text-gray-400">
              {" "}
              {product.categories_tags.map((item) => item.split(":")[1] + ", ")}
            </span>
          </div>
          <div>
            <span className="font-semibold">Ingredients :</span>
            <span className="text-gray-400">
              {" "}
              {product.ingredients_text_en || "Not provided"}
            </span>
          </div>
          <p>grade : {product.nutrition_grades.toUpperCase()}</p>
        </div>
      </Link>
      <button
        className={`w-full  py-4 rounded-lg order-last text-white ${
          isProductInCard ? "bg-red-500" : "bg-slate-400"
        }`}
        onClick={handleCardClick}
      >
        {isProductInCard ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
