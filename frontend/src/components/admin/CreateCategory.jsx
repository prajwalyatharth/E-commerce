import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(""); // State for new category input
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNlZDAzOTI0N2Y4NTA1NmE3ZDIwMWIiLCJpYXQiOjE3MjUyOTYwMTUsImV4cCI6MTcyNzg4ODAxNX0.MGeT6VvFupJCo9bclxKh2wb9Ctl5WT_4CsQOJOTXj-Q"; // Your JWT token

  // Add category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success(`${data.category.name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in adding category");
    }
  };

  // Get all categories
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

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        const { data } = await axios.put(
          `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
          { name: updatedName },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use Authorization header
            },
          }
        );

        if (data.success) {
          toast.success(`${updatedName} is updated`);
          setSelected(null);
          setUpdatedName("");
          setVisible(false);
          getAllCategory();
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("No category selected for update");
      }
    } catch (error) {
      toast.error("Something went wrong in updating category");
    }
  };

  // Delete category
  // const handleDelete = async (pId) => {
  //     console.log("deleting")
  //     try {
  //         const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pId}`, {
  //             headers: {
  //                 Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNlZDAzOTI0N2Y4NTA1NmE3ZDIwMWIiLCJpYXQiOjE3MjUyOTYwMTUsImV4cCI6MTcyNzg4ODAxNX0.MGeT6VvFupJCo9bclxKh2wb9Ctl5WT_4CsQOJOTXj-Q'
  //             },
  //         });
  //         console.log("deleting")
  //         if (data.success) {
  //             toast.success("Category is deleted");
  //             getAllCategory(); // Refresh category list
  //         } else {
  //             toast.error(data.message);
  //         }
  //     } catch (error) {
  //         console.log(error);
  //         toast.error("Something went wrong in deleting category");
  //     }
  // };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong during deletion");
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
          <h2 className="text-center">Manage Category</h2>

          <div>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories?.map((c) => (
                  <tr key={c._id}>
                    {" "}
                    {/* Key prop should be unique */}
                    <td>{c.name}</td>
                    <td>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <Modal
            onCancel={() => {
              setVisible(false);
            }}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
