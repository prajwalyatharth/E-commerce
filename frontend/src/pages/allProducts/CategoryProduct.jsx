import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams;

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);
  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dashboard-page container my-4">
      <h1 className="text-center">{category?.name}</h1>
      <div className="text-center"> {products?.length} result found </div>
      <div className="row">
        <div className="d-flex flex-wrap justify-content-center">
          {products?.map((p) => (
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
        {/* <div className="m-2 p-3 text-center">
          {products && products.length < total && (
            <button
              className="btn btn-warning"
              onClick={() => setPage(page + 1)}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CategoryProduct;
