import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchResorts } from '../redux/resorts/resortsSlice';
import { createBookings } from '../redux/reservation/bookingsSlice';

const ReservationForm = () => {
  const dispatch = useDispatch();
  const { resorts, loading } = useSelector((state) => state.resortsSlice);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(fetchResorts());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    address: '',
    startDate: '',
    endDate: '',
    resort_id: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(createBookings({ token, formData }));
    navigate(('/my-bookings'));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="reservation-form"
      className="d-flex flex-column align-items-center g-4"
    >
      <div className="row g-2 mb-3">

        <div className="col select-wrapper">
          <select
            className="form-select"
            value={formData.resort_id}
            onChange={handleChange}
            name="resort_id"
          >
            <option value="">Select a resort</option>
            {loading ? (<li>loading</li>)
              : resorts.resorts.map((resort) => (
                <option key={resort.id} value={resort.id}>
                  {resort.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <option value="">User Address</option>
      <input
        id="addressInput"
        className="form-control mb-3"
        type="text"
        value={formData.address}
        onChange={handleChange}
        name="address"
      />
      <option value="">Start Date:</option>
      <input
        id="dateInput"
        className="form-control mb-3"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        name="startDate"
      />
      <option value="">End Date:</option>
      <input
        id="dateInput"
        className="form-control mb-3"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        name="endDate"
      />
      <button type="submit" className="btn btn-light text-success">
        Create Reservation
      </button>
    </form>
  );
};

export default ReservationForm;
