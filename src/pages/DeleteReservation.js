import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, deleteReservation } from '../redux/delete-reservation/deleteReservationSlice';

const DeleteReservation = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservationsReducer.reservations);
  // const reservations = useSelector((state) => {
  //   console.log('State:', state);
  //   console.log('Reservations:', state.reservations);
  //   return state.reservations;
  // });

  useEffect(() => {
    dispatch(fetchReservations);
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteReservation(userId));
  };
  return (
    <div>
      <h3 className="text-center mb-3 delete_title">My Reservations</h3>
      {reservations.length === 0 ? (
        <p>You have not made any reservation</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Reservation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.name}</td>
                <td>
                  <button onClick={() => handleDelete(reservation.id)} type="submit">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeleteReservation;
