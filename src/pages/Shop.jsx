import React, { useState, useEffect } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import ProductsList from "../components/UI/ProductsList";
// import useGetData from "../custom-hooks/useGetData";
import products from "../assets/data/products";

const Shop = () => {
  // const { data: products } = useGetData("products");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    // Filter products based on selected category
    let newFilteredProducts = products.filter((item) => {
      const isInCategory =
        selectedCategory === "" || item.category === selectedCategory;
      const isInSearchQuery =
        searchQuery === "" || (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return isInCategory && isInSearchQuery;
    });

    // Sort the filtered products based on the selected sort order
    if (sortOrder === "ascending") {
      newFilteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "descending") {
      newFilteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(newFilteredProducts);
  }, [selectedCategory, sortOrder, searchQuery, products]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleCategoryChange}>
                  <option value="">Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select onChange={handleSortChange}>
                  <option value="">Sort By</option>
                  <option value="descending">Ascending</option>
                  <option value="ascending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {filteredProducts.length === 0 ? (
              <h1 className="text-center fs-4">No products are found!</h1>
            ) : (
              <ProductsList data={filteredProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
