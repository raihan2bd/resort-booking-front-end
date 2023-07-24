import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { fetchResorts } from "../redux/resorts/resortsSlice";
import { createBookings } from "../redux/reservation/bookingsSlice";
import { useDispatch, useSelector } from "react-redux";


const ReservationForm = () => {
 
  const dispatch = useDispatch();
  const {resorts, loading, error} = useSelector((state) => state.resortsSlice);
  const token = useSelector((state) => state.auth.token);
  console.log(loading, 'loading details')
  console.log(resorts, 'resorts details')
  console.log(error, 'error details')
  useEffect(() => {
    dispatch(fetchResorts()) 
  }, [dispatch]);

  const [formData, setFormData] = useState({
    address: '',
    startDate: '',
    endDate: '',
    resort_id: ''
  });
  
  const locations = [
    { id: 1, name: 'Madrid' },
    { id: 2, name: 'Capetown' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // const bookings = {
    //  formData
    // }
    dispatch(createBookings(token));
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
              {loading ? (<p>loading</p>) :
              resorts.resorts.map((resort) => (
                <option key={resort.id} value={resort.id}>
                  {resort.name}
                </option>
              ))}
            </select>
          </div>
       
        <div className="col select-wrapper">
          <select
            className="form-select"
            value={formData.address}
            onChange={handleChange}
            name="address"
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label htmlFor="dateInput">Start Date:</label>
      <input
        className="form-control mb-3"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        name="startDate"
      />
       <label htmlFor="dateInput">End Date:</label>
      <input
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
}

ReservationForm.propTypes = {
  selectedResortId: PropTypes.number,
  resortSelected: PropTypes.bool,
};

ReservationForm.defaultProps = {
  selectedResortId: 0,
  resortSelected: false,
};

export default ReservationForm
