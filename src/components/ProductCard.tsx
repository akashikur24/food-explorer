import { Link } from "react-router-dom";
import { Product } from "../slices/productSlice";
import no_Image_found from "../images/no_image_found.jpg";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className=" bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col justify-between ">
      <Link to={`/product/${product.code}`}>
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
    </div>
  );
};

export default ProductCard;
