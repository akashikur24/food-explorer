import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  nutrition_grades: string;
  code: string;
  product_name_en: string;
  image_url: string;
  categories_tags: Array<string>;
  nutriscore_grade: string;
  countries_imported: string;
  ingredients_text?: string;
  nutriments?: Record<string, number>;
  ingredients_text_en: string;
}

interface ProductState {
  productList: Product[];
  searchQuery: string;
  selectedCategory: string;
  sortOrder: SortOption;
  productCard: Product[];
}
export type SortOption = "name-asc" | "name-desc" | "grade-asc" | "grade-desc";

const initialState: ProductState = {
  productList: [],
  productCard: [],
  searchQuery: "",
  selectedCategory: "all",
  sortOrder: "name-asc",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.productList = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOption>) => {
      state.sortOrder = action.payload;
    },
    addMoreProducts: (state, action: PayloadAction<Product[]>) => {
      state.productList = [...state.productList, ...action.payload];
    },
    setProductCart: (state, action: PayloadAction<Product>) => {
      state.productCard.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      const filterCard = state.productCard.filter(
        (item) => item.code !== action.payload
      );
      state.productCard = filterCard;
    },
    sortProducts: (state) => {
      if (state.sortOrder === "name-asc") {
        state.productList.sort((a, b) =>
          (a.product_name_en || "").localeCompare(
            b.product_name_en || "",
            undefined,
            {
              sensitivity: "base",
            }
          )
        );
      } else if (state.sortOrder === "name-desc") {
        state.productList.sort((a, b) =>
          (b.product_name_en || "").localeCompare(
            a.product_name_en || "",
            undefined,
            {
              sensitivity: "base",
            }
          )
        );
      } else if (state.sortOrder === "grade-asc") {
        state.productList.sort((a, b) =>
          (a.nutriscore_grade || "").localeCompare(
            b.nutriscore_grade || "",
            undefined,
            {
              sensitivity: "base",
            }
          )
        );
      } else if (state.sortOrder === "grade-desc") {
        state.productList.sort((a, b) =>
          (b.nutriscore_grade || "").localeCompare(
            a.nutriscore_grade || "",
            undefined,
            {
              sensitivity: "base",
            }
          )
        );
      }
    },
  },
});

export const {
  setProducts,
  setSearchQuery,
  setCategory,
  setSortOrder,
  addMoreProducts,
  sortProducts,
  setProductCart,
  removeCard,
} = productSlice.actions;

export default productSlice.reducer;
