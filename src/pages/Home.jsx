import React from "react";
import Layout from "../components/common/Layout";

import HeroBanner from "../components/homepage/HeroBanner";
import CategoryGrid from "../components/homepage/CategoryGrid";
import FeaturedProducts from "../components/homepage/FeaturedProducts";
import BrandSlider from "../components/homepage/BrandSlider";
import OffersSection from "../components/homepage/OffersSection";
import SafetyHighlights from "../components/homepage/SafetyHighlights";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };
  return (
    <Layout>
      <HeroBanner />
      <BrandSlider />
      <CategoryGrid onCategoryClick={handleCategoryClick} />
      <OffersSection />
      <FeaturedProducts />
      <SafetyHighlights />
    </Layout>
  );
};

export default Home;
