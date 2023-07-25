import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, deleteReservation } from '../redux/delete-reservation/deleteReservationSlice';
import axios from 'axios';
import '../style/DeleteReservation.css';
const DeleteReservation = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservationsReducer.reservations);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(fetchReservations({ token }));
  }, [dispatch, token]);
  const [reservationsWithResortNames, setReservationsWithResortNames] = useState([]);
  useEffect(() => {
    const fetchResortData = async () => {
      const updatedReservations = await Promise.all(
        reservations.map(async (reservation) => {
          try {
            const response = await axios.get(`http://localhost:4000/resorts/${reservation.resort_id}`);
            return { ...reservation, name: response.data.name };
          } catch (error) {
            return reservation;
          }
        })
      );
      setReservationsWithResortNames(updatedReservations);
    };
    fetchResortData();
  }, [reservations]);
  const handleDelete = (userId) => {
    dispatch(deleteReservation(userId));
  };
  return (
    <div>
      <h3 className="text-center mb-3 delete_title">My Reservations</h3>
      {reservationsWithResortNames && reservationsWithResortNames.length > 0 ? (
        <table className="table table_width table-bordered table-striped">
          <thead>
            <tr>
              <th>Reservation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservationsWithResortNames.map((reservation) => (
              <tr className="table_strip" key={reservation.id}>
                <td>{reservation.name}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(reservation.id)} type="submit">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have not made any reservation</p>
      )}
    </div>
  );
};
export default DeleteReservation;