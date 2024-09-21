import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetailPage from "./components/ProductDetailPage";
import Homepage from "./pages/Homepage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:code" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
