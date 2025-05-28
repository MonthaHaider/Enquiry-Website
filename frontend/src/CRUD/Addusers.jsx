import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Adduser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/user/create", formData);
      toast.success("User added successfully");
      navigate("/");
    } catch (err) {
      console.error("Add user error:", err);
      toast.error("Failed to add user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-black underline font-bold mb-4"
        >
          Back
        </button>

        <h2 className="text-xl font-bold mb-4">Add User</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">First Name</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-medium">Last Name</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adduser;
