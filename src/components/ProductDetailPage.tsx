import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../slices/productSlice";
import { ScaleLoader } from "react-spinners";
import Barcode from "react-barcode";
import no_Image_found from "../images/no_image_found.jpg";

const ProductDetailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${code}.json`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [code]);
  console.log(product);

  if (!product)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ScaleLoader />
      </div>
    );

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-4/5 p-5 flex justify-between items-center shadow-lg rounded-lg border border-gray-200 ">
        <div className="w-1/2 p-5">
          <img
            src={product.image_url || no_Image_found}
            alt={product.product_name_en}
          />
        </div>
        <div className="px-5 flex flex-col gap-y-4">
          <h1 className="text-2xl font-bold ml-3">
            Product Name : {product.product_name_en || "Not Provided"}
          </h1>
          <Barcode value={"" + code} />

          <div>
            <p>Barcode : {code}</p>
          </div>
          <p>
            Categories :{" "}
            {product.categories_tags.map((item) => item.split(":")[1] + ", ")}
          </p>
          <p>Ingredients : {product.ingredients_text_en || "Not provided"}</p>
          <p>
            Countries where sold :{" "}
            {product.countries_imported || "Not Provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
