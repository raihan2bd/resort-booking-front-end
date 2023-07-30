import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteReosrt, fetchResorts } from '../redux/resorts/resortsSlice';

import './DeleteReservation.css';
import Spinner from '../components/UI/Spinner';

const DeleteResort = () => {
  // const [hasError, setHasError] = useState(null);
  const { resorts } = useSelector((state) => state.resorts);
  const { loading, hasError } = useSelector((state) => state.ui);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (resortId) => {
    // const deleteResort = async () => {
    //   if (auth.role !== 'admin') {
    //     setHasError("You don't have access to delete the resort.");
    //     return;
    //   }

    //   setLoading(true);
    //   const headers = {
    //     Authorization: auth.token,
    //   };
    //   try {
    //     await axios.delete(`/resorts/${resortId}`, { headers });

    //     setResorts((prevState) => prevState.filter((item) => item.id !== resortId));

    //     setLoading(false);
    //     setHasError(null);
    //   } catch (error) {
    //     if (error.response.status === 401) {
    //       setHasError('Unauthorize user! Please login before this action.');
    //     } else if (error.response.status === 403) {
    //       setHasError("You don't have permission to delete the resort!");
    //     } else {
    //       setHasError('Something went wrong! Please try again.');
    //     }
    //     setLoading(false);
    //   }
    // };
    // deleteResort();
    if (auth.role !== 'admin') {
      navigate('/access-denied');
      return;
    }
    dispatch(deleteReosrt({ resortId, token: auth.token }));
  };

  useEffect(() => {
    dispatch(fetchResorts());
  }, [dispatch]);

  if (hasError) {
    return <p className="text-danger text-center p-3 shadow">Something went wrong. Please try again.</p>;
  }

  if (loading) {
    return <Spinner />;
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
