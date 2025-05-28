import React, { useState, useEffect } from 'react'; // Import React and hooks
import { FaTrash, FaEdit } from 'react-icons/fa'; // Icons for actions
import { Link } from 'react-router-dom'; // For navigation links
import axios from 'axios'; // HTTP client
import { toast } from 'react-hot-toast'; // Notifications

const Getusers = () => {
  // State to store users fetched from backend
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/fetch');
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch users');
      }
    };
    fetchData();
  }, []);

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/delete/${userId}`);
      // Update state to remove deleted user from UI
      setUsers(users.filter((user) => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex justify-center">
        <div className="shadow-md rounded-lg w-[60%] p-10 my-20 h-auto bg-white">
          {/* Button to add new user */}
          <Link to="/Addusers">
            <button className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Add User
            </button>
          </Link>

          {/* Users Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">User Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr className="text-center hover:bg-gray-100" key={user._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{user.fname} {user.lname}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                      <Link to={`/Updateusers/${user._id}`}>
                        <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                          <FaEdit />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Getusers;
