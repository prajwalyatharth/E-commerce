import React, { useEffect, useState } from "react";
import useCategory from "../../hooks/useCategory";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const categories = useCategory();

  return (
    <div className="dashboard-page container my-4">
      <h1>category page</h1>
      <div className="row">
        {categories.map((c) => (
          <div className="col-md-6">
            <button className="btn btn-primary">
              <Link to="/">{c.name}</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
