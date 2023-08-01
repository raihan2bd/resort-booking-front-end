import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addNewResort } from '../redux/resorts/resortsSlice';
import Spinner from '../components/UI/Spinner';

const AddResort = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: 0,
    guests_amount: 0,
    image_url: '',
    description: '',
  });

  const { token, role } = useSelector((state) => state.auth);
  const { redirect } = useSelector((state) => state.resorts);
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role !== 'admin') {
      return;
    }

    dispatch(addNewResort({ data: formData, token }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (redirect) {
      navigate('/');
    }
  }, [redirect, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="form-container shadow mt-4 p-3">
      <form onSubmit={handleSubmit} className="container mt-4">
        <h2 className="my-2 text-center">Add a new resort</h2>
        <div className="mb-3">
          <h2 htmlFor="name" className="form-label">Resort Name:</h2>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            required
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
            required
          />
        </div>
        <div className="mb-3">
          <h2 htmlFor="price" className="form-label">Resort Price:</h2>
          <input
            type="number"
            className="form-control"
            name="price"
            id="price"
            value={formData.price}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <h2 htmlFor="guests_amount" className="form-label">Resort Guests Amount:</h2>
          <input
            type="number"
            className="form-control"
            name="guests_amount"
            id="guests_amount"
            value={formData.guests_amount}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <h2 htmlFor="image_url" className="form-label">Resort Image Url:</h2>
          <input
            type="text"
            className="form-control"
            name="image_url"
            id="image_url"
            value={formData.image_url}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="mb-3">
          <h2 htmlFor="description" className="form-label">Resort Description:</h2>
          <textarea
            className="form-control"
            name="description"
            id="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        {/* {auth.message && <p className="text-danger">{auth.message}</p>} */}
        <button type="submit" className="btn btn-success mb-3">Add New Resort</button>
      </form>
    </div>
  );
};

export default AddResort;
