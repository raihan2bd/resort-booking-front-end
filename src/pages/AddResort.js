import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchResorts } from '../redux/resorts/resortsSlice';
import { createBookings } from '../redux/reservation/bookingsSlice';
import axios from 'axios';

const AddResort = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: 0,
        guests_amount: 0,
        image_url: '',
        description: '',
      });

  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchResorts = async () => {
        const config = {
            headers: {
              Authorization: token,
            },
          };
        try {
          const response = await axios.post('/resorts', {...formData}, config);
          console.log(response);
        } catch (error) {
            console.log(error);
          // space reserved for testing errors
        }
      };
  
      fetchResorts();
    // navigate(('/my-bookings'));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <h2 htmlFor="name" className="form-label">Resort Name:</h2>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <h2 htmlFor="location" className="form-label">Resort Location:</h2>
        <input
          type="text"
          className="form-control"
          name="location"
          id="location"
          value={formData.location}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <h2 htmlFor="price" className="form-label">Resort price:</h2>
        <input
          type="number"
          className="form-control"
          name="price"
          id="price"
          value={formData.price}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <h2 htmlFor="guests_amount" className="form-label">Resort guests_amount:</h2>
        <input
          type="number"
          className="form-control"
          name="guests_amount"
          id="guests_amount"
          value={formData.guests_amount}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <h2 htmlFor="image_url" className="form-label">Resort image_url:</h2>
        <input
          type="text"
          className="form-control"
          name="image_url"
          id="image_url"
          value={formData.image_url}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="mb-3">
        <h2 htmlFor="description" className="form-label">Resort description:</h2>
        <textarea
          className="form-control"
          name="description"
          id="description"
          value={formData.description}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>

      {/* {auth.message && <p className="text-danger">{auth.message}</p>} */}
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default AddResort;
