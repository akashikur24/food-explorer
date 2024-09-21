/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts, sortProducts } from "../slices/productSlice";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import { ScaleLoader } from "react-spinners";
import Aside from "../components/Aside";
import SortChange from "../components/SortChange";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

const Homepage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isModal, setIsModal] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.products.searchQuery
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.products.selectedCategory
  );
  const sortOrder = useSelector((state: RootState) => state.products.sortOrder);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const isBarcode = (query: string) => /^\d+$/.test(query);

  const fetchProducts = async (
    debouncedQuery: string,
    selectedCategory: string,
    page: number = 1
  ) => {
    setIsLoading(true);
    try {
      let response;
      if (isBarcode(debouncedQuery)) {
        response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${debouncedQuery}.json`
        );
        if (response.data && response.data.product) {
          dispatch(setProducts([response.data.product]));
          setHasMore(false);
        } else {
          dispatch(setProducts([]));
          setHasMore(false);
        }
      } else {
        response = await axios.get(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedQuery}&tag_type_0=${selectedCategory}&page=${page}&json=true`
        );

        if (response.data.products.length > 0) {
          dispatch(setProducts(response.data.products));
          setHasMore(response.data.products.length >= 10);
        } else {
          setHasMore(false);
        }
      }
      dispatch(sortProducts());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(debouncedQuery, selectedCategory, page);
  }, [debouncedQuery, selectedCategory, sortOrder, page]);

  const nextProduct = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
    }
  };

  const prevProduct = () => {
    if (page > 1) {
      const nextPage = page - 1;
      setPage(nextPage);
    }
  };

  useEffect(() => {
    fetchProducts("", "", 1);
  }, []);

  return (
    <div className="h-screen flex flex-col relative">
      <Header setIsModal={setIsModal} />
      <div className="w-full gap-x-11 flex justify-center  items-center pt-5 px-10 max-lg:hidden">
        <div>
          <SortChange />
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <Filter />
        </div>
      </div>
      {isLoading && page === 1 ? (
        <div className="w-full h-full flex justify-center items-center">
          <ScaleLoader />
        </div>
      ) : (
        <>
          <ProductList />
          <div className="flex justify-center my-4">
            {isLoading ? (
              <ScaleLoader />
            ) : (
              <div className="flex gap-x-4 items-center mb-8">
                <button
                  onClick={prevProduct}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg"
                  disabled={page === 1}
                >
                  Prev
                </button>
                <p>Page {page}</p>
                <button
                  onClick={nextProduct}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg"
                  disabled={!hasMore} // Disable if no more products
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {isModal && <Aside setIsModal={setIsModal} />}
    </div>
  );
};

export default Homepage;
