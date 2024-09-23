import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { slug } = useParams(); // Extract slug directly from useParams
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  // Fetch product details on slug change
  useEffect(() => {
    if (slug) getProduct();
  }, [slug]);

  // Fetch product data
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/get-product/${slug}`
      );
      setProduct(data?.product);

      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch related products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-page container my-4">
      <h1>Product Detail</h1>
      <div className="d-flex flex-wrap justify-content-between">
        <div className="col-md-6">
          <img
            src={
              product._id
                ? `http://localhost:8080/api/v1/products/product-photo/${product._id}`
                : ""
            }
            className="card-img-top"
            alt={product.name || "Product Image"}
            // height="300"
            // width="350px"
          />
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <h5 className="card-title">
              {product.name || "No Name Available"}
            </h5>
            <p className="card-text">
              {product.description || "No description available"}
            </p>
            <p className="card-text">
              <strong>Category:</strong>{" "}
              {product.category?.name || "No Category Available"}
            </p>
            <p className="card-text">
              <strong>In Stock:</strong>{" "}
              {product.shipping ? "Available" : "Not Available"}
            </p>
            <p className="card-text">
              <strong>Price:</strong> Rs {product.price || "N/A"}
            </p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <h4>Similar Products</h4>
        <div className="d-flex flex-wrap justify-content-center">
          {relatedProduct?.map((p) => (
            <Link
              key={p._id}
              to={`/products/${p.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card m-3"
                style={{ width: "15rem", height: "20rem" }}
                key={p._id}
              >
                <img
                  src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">Rs {p.price}</p>
                  <div className=" d-flex justify-content-between">
                    <div
                      to="/"
                      className="d-flex justify-content-center align-items-center"
                    >
                      <div className="ms-1">More Details</div>
                    </div>
                    <button className="btn btn-primary">Add To Cart</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
