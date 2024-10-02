import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import products from "../assets/data/products"; // Import your local products data

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Get product by id from local data
    const foundProduct = products.find((prod) => prod.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      console.log("no product found!");
    }
  }, [id]);

  const {
    imgUrl,
    productName,
    price,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter(item => item.category === category);

  const submitHandler = e => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    console.log(reviewObj);
    toast.success("Review submitted");
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        imgUrl,
        productName,
        price,
      })
    );

    toast.success("Product added successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt={productName} />
            </Col>

            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        <i className={index < rating ? "ri-star-s-fill" : "ri-star-line"}></i>
                      </span>
                    ))}
                  </div>

                  <p>{rating ? `${rating} (rating)` : ""}</p>
                </div>

                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                            required
                          />
                        </div>

                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          {[1, 2, 3, 4, 5].map(value => (
                            <motion.span
                              key={value}
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(value)}
                            >
                              {value}<i className="ri-star-s-fill"></i>
                            </motion.span>
                          ))}
                        </div>

                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            placeholder="Review Message..."
                            required
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>

            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
