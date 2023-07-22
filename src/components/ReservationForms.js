import { useState } from "react";
import { fetchLogin } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

const ReservationForm = ({selectedResortId, resortSelected}) => {
  console.log(selectedResortId);
  console.log(resortSelected);
  const fullname = localStorage.getItem('name');
  const dispatch = useDispatch();
  const resorts = useSelector((state) => state.resorts.resorts) || [];

  const [formData, setFormData] = useState({
    city: '',
    date: '',
    resort_id: '',
    start_date: '',
    end_date: ''
  });
  const locations = [
    { id: 1, name: 'Madrid' },
    { id: 2, name: 'Capetown' },
  ];

  
}
