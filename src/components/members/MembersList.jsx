


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { backURL } from '../../lib/constants';

// const backURL = 'http://localhost:5000/api'; // Replace with your backend URL

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for managing the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMemberData, setEditMemberData] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    role: ''
  });

  // API call to fetch members
  // const fetchMembers = async () => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const response = await axios.get(`${backURL}/members`, {
  //       params: { page, limit },
  //     });
  //     setMembers(response.data.members);
  //     setTotal(response.data.total);
  //   } catch (error) {
  //     setError(error.response?.data?.message || 'Failed to fetch members.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // API call to fetch members
  const fetchMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${backURL}/members`, {
        params: { page, limit },
      });

      // Sorting members by role
      const sortedMembers = response.data.members.sort((a, b) => {
        const roleOrder = {
          gm: 1,
          agm: 2,
          member: 3
        };

        return roleOrder[a.role] - roleOrder[b.role];
      });

      setMembers(sortedMembers);
      setTotal(response.data.total);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch members.');
    } finally {
      setLoading(false);
    }
  };


  // API call to update a member
  const updateMember = async (id, updatedData) => {
    try {
      const response = await axios.put(`${backURL}/members/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating member:', error.message);
      throw error;
    }
  };

  // API call to delete a member
  const deleteMember = async (id) => {
    try {
      const response = await axios.delete(`${backURL}/members/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting member:', error.message);
      throw error;
    }
  };

  // Handle update operation
  const handleUpdate = (member) => {
    setEditMemberData({
      _id: member._id,
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
    });
    setIsModalOpen(true);
  };

  // Handle form submission to update member
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMember(editMemberData._id, editMemberData);
      fetchMembers(); // Refresh member list
      setIsModalOpen(false); // Close modal after updating
    } catch (error) {
      alert('Failed to update member. Ensure the format is correct.');
    }
  };

  // Handle change in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle delete operation
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      await deleteMember(editMemberData._id);
      fetchMembers(); // Refresh member list after deletion
      setIsModalOpen(false); // Close modal after deletion
    } catch (error) {
      alert('Failed to delete member');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page, limit]);

  const handleNextPage = () => {
    if (page * limit < total) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="w-96 mx-auto mt-20">
      <div className="flex justify-between">
        <h2 className="text-center p-4 font-extrabold text-xl">Members List</h2>
        <Link to="/addMember">
          <div className="btn">Add</div>
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="overflow-x-auto min-w-96">
            <table className="table table-fixed w-full">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
            </table>
          </div>

          {members.map((member, idx) => (
            <div key={idx} className="overflow-x-auto">
              <table className="table table-fixed w-full">
                <tbody>
                  <tr className="hover text-left">
                    <th className="w-1/12">{idx + 1}</th>
                    <td className="w-2/12">{member.name}</td>
                    <td className="w-3/12">{member.phone}</td>
                    <td className="w-2/12">{member.role.toUpperCase()}</td>
                    <td className="w-4/12 flex ">
                      <button
                        className="btn btn-xs btn-info mx-1"
                        onClick={() => handleUpdate(member)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-xs btn-info mx-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          <div className="mt-4 flex justify-between">
            <button
              className="btn"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {Math.ceil(total / limit)}
            </span>
            <button
              className="btn"
              onClick={handleNextPage}
              disabled={page * limit >= total}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal for updating or deleting member */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="font-bold text-xl mb-4">Edit Member</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editMemberData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editMemberData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editMemberData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={editMemberData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div> */}
              <div className="mb-4">
                <label className="block mb-2">Role</label>
                <select
                  name="role"
                  value={editMemberData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="member">Member</option>
                  <option value="agm">AGM</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button type="submit" className="btn btn-primary">Update</button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersList;
