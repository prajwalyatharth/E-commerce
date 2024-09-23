import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");

  //token
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNlZDAzOTI0N2Y4NTA1NmE3ZDIwMWIiLCJpYXQiOjE3MjUyOTYwMTUsImV4cCI6MTcyNzg4ODAxNX0.MGeT6VvFupJCo9bclxKh2wb9Ctl5WT_4CsQOJOTXj-Q";

  //get all products
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use Authorization header
          },
        }
      );

      if (data?.success) {
        setCategories(data?.categories);
      } else {
        toast.error("Failed to load categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product fuction
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        `http://localhost:8080/api/v1/products/create-product`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use Authorization header
          },
        }
      );
      if (data?.success) {
        toast.success("Product is created");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 2000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="dashboard-page container my-5">
      <div className="row">
        <Toaster />
        <div className="col-md-2">
          <AdminMenu />
        </div>
        <div className="col-md-10">
          <h2 className="text-center">Create Product</h2>

          <Select
            variant={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setCategory(value);
            }}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          <div className="mb-3">
            <label className="btn btn-outline-primary ">
              {photo ? photo.name : "Upload photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              ></input>
            </label>
          </div>

          <div className="mb-3">
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="form-control"
              onChange={(e) => setName(e.target.value)} // Update `name` state
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={description}
              placeholder="Write a description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)} // Update `description` state
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="Number of Quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)} // Update `quantity` state
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={price} // Update `price` here, not `quantity`
              placeholder="Price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)} // Update `price` state
            />
          </div>

          <div className="mb-3">
            <Select
              bordered={false}
              placeholder="Select Shipping"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setShipping(value === "1");
              }}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleCreate}>
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
