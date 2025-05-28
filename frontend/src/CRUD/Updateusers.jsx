import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Updateusers = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from the URL

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/user/getOne/${id}`);
        const { fname, lname, email, password } = res.data;
        setFormData({
          firstName: fname,
          lastName: lname,
          email,
          password,
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
        toast.error("Failed to load user data");
      }
    };

    fetchUser();
  }, [id]);

  // Handle input field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = {
        fname: formData.firstName,
        lname: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      await axios.put(`http://localhost:3000/api/user/update/${id}`, updatedUser);
      toast.success("User updated successfully");
      navigate("/"); // Go back to user list
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-black underline font-bold"
          >
            Back
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Update User</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updateusers;
