import React from "react";
import UserMenu from "../../components/userMenu/UserMenu";

const Orders = () => {
  return (
    <div className="dashboard-page container-fluid my-4">
      <div className="row">
        <div className="col-md-2">
          <UserMenu />
        </div>
        <div className="col-md-10">
          <h3>All Orders</h3>

          <div className="card w-75 p-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
