import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetailPage from "./components/ProductDetailPage";
import Homepage from "./pages/Homepage";
import ProductCardPage from "./pages/ProductCardPage";
import Header from "./components/Header";
import Aside from "./components/Aside";

const App: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <Router>
      <Header setIsModal={setIsModal} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/productCart" element={<ProductCardPage />} />
        <Route path="/product/:code" element={<ProductDetailPage />} />
      </Routes>
      {isModal && <Aside setIsModal={setIsModal} />}
    </Router>
  );
};

export default App;
