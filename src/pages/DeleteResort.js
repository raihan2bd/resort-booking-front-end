import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './DeleteReservation.css';
import axios from 'axios';

const DeleteResort = () => {
  const [resorts, setResorts] = useState([]);
  const [hasError, setHasError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  const handleDelete = (resortId) => {
    const deleteResort = async () => {
      if (auth.role !== 'admin') {
        setHasError("You don't have access to delete the resort.");
        return;
      }

      setLoading(true);
      const headers = {
        Authorization: auth.token,
      };
      try {
        await axios.delete(`/resorts/${resortId}`, { headers });

        setResorts((prevState) => prevState.filter((item) => item.id !== resortId));

        setLoading(false);
        setHasError(null);
      } catch (error) {
        if (error.response.status === 401) {
          setHasError('Unauthorize user! Please login before this action.');
        } else if (error.response.status === 403) {
          setHasError("You don't have permission to delete the resort!");
        } else {
          setHasError('Something went wrong! Please try again.');
        }
        setLoading(false);
      }
    };
    deleteResort();
  };

  useEffect(() => {
    const fetchResorts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/resorts');
        setResorts(response.data);
        setHasError(null);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setHasError('Something went wrong please try again');
      }
    };
    fetchResorts();
  }, []);

  if (hasError) {
    return <p className="text-center text-danger">{hasError}</p>;
  }

  if (loading) {
    return <p className="text-center text-success">Loading...</p>;
  }

  const resortsElements = resorts.map((resort) => (
    <tr className="table_strip" key={resort.id}>
      <td>{resort.name}</td>
      <td>
        <button className="btn btn-danger" disabled={auth.role !== 'admin'} onClick={() => handleDelete(resort.id)} type="submit">Delete</button>
      </td>
    </tr>
  ));

  let resortContent = <p className="text-center text-danger">No Resort Found! Please add a new one.</p>;
  if (resorts.length > 0) {
    resortContent = (
      <table className="table table_width table-bordered table-striped">
        <thead>
          <tr>
            <th>Resorts</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {resortsElements}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <h3 className="text-center mb-3 delete_title">My Reservations</h3>
      {resortContent}
    </div>
  );
};
export default DeleteResort;
