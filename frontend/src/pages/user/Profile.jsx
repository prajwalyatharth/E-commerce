import React, { useEffect, useState } from "react";
import UserMenu from "../../components/userMenu/UserMenu";
import { useAuth } from "../../context/auth";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateduser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateduser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("profile updated succesfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    // setPassword(password);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  return (
    <div className="dashboard-page container my-4">
      <div className="row">
        <div className="col-md-2">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <h3>User Profile</h3>
          <Toaster />
          <form className=" " onSubmit={handleSumbit}>
            <div className="form-group">
              <label className="input-label">Name</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label className="input-label">Email</label>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                disabled
              />
            </div>
            <div className="form-group">
              <label className="input-label">Password</label>
              <input
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="form-group">
              <label className="input-label">Phone</label>
              <input
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label className="input-label">Address</label>
              <input
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter your phone address"
              />
            </div>

            <button className="register-button">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
