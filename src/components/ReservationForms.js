import { useState } from "react";
import PropTypes from 'prop-types';
import { fetchLogin } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";


const ReservationForm = ({selectedResortId, resortSelected}) => {
  console.log(selectedResortId);
  console.log(resortSelected);
  const fullname = localStorage.getItem('name');
  const dispatch = useDispatch();
  const resorts = useSelector((state) => state.resorts.resorts) || [];

  const [formData, setFormData] = useState({
    city: '',
    date: '',
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
  
}

export default ReservationForm
