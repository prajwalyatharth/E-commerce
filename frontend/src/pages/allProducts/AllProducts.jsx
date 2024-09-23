import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../components/prices/Prices";
import { Helmet } from "react-helmet";
import { useCart } from "../../context/cart";
import toast, { Toaster } from "react-hot-toast";

const AllProducts = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-count`
      );
      setTotal(data?.total || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadmore();
    }
  }, [page]);

  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts((prevProducts) => [
        ...prevProducts,
        ...(data?.products || []),
      ]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    const all = value ? [...checked, id] : checked.filter((c) => c !== id);
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/products/product-filter`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.product || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    getAllProducts();
  };

  return (
    <div className="dashboard-page container my-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <Toaster />
      <div className="row">
        <div className="col-md-2">
          <div className="sticky-top" style={{ top: "80px" }}>
            <h6 className="text-center my-2">Filter By Category</h6>
            <div className="card p-2">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h6 className="text-center my-2">Filter By Price</h6>
            <div className="card p-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="text-center my-2">
              <button className="btn btn-danger" onClick={resetFilters}>
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-10">
          <h2 className="text-center">Products</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
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
                    <Link
                      key={p._id}
                      to={`/products/${p.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        to="/"
                        className="d-flex justify-content-center align-content-center"
                      >
                        <div className="ms-1">More Details</div>
                      </div>
                    </Link>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success("Item is added to cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
