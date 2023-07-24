import { useState } from "react";
import PropTypes from 'prop-types';
import { fetchLogin } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";


const ReservationForm = ({selectedResortId, resortSelected}) => {
  console.log(selectedResortId);
  console.log(resortSelected);
  const fullName = localStorage.getItem('name');
  const dispatch = useDispatch();
  const {resorts} = useSelector((state) => state.resortsSlice) || [];
  console.log(resorts, 'resorts details')

  const [formData, setFormData] = useState({
    address: '',
    date: [],
    resort_id: ''
  });
  const locations = [
    { id: 1, name: 'Madrid' },
    { id: 2, name: 'Capetown' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resortSelected) {
      formData.resort_id = selectedResortId;
    }
    const data = {
      end_point: '/resorts',
      method_data: {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('isAuth'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resorts: formData }),
      },
    };
    dispatch(fetchLogin(data));
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
      <input
        className="form-control mb-3"
        type="text"
        value={fullName}
        disabled
      />
      <div className="row g-2 mb-3">
        {!resortSelected && (
          <div className="col select-wrapper">
            <select
              className="form-select"
              value={formData.resort_id}
              onChange={handleChange}
              name="resort_id"
            >
              <option value="">Select a resort</option>
              {resorts.map((resort) => (
                <option key={resort.id} value={resort.id}>
                  {resort.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="col select-wrapper">
          {/* <label htmlFor="dateInput">Address:</label> */}
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
        value={formData.date}
        onChange={handleChange}
        name="date"
      />
       <label htmlFor="dateInput">End Date:</label>
      <input
        className="form-control mb-3"
        type="date"
        value={formData.date}
        onChange={handleChange}
        name="date"
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
