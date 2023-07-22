import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [resorts, setResorts] = useState([]);

  useEffect(() => {
    // Fetch the resorts data from the backend
    const fetchResorts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/resorts');
        setResorts(response.data);
      } catch (error) {
        console.error('Error fetching resorts:', error);
      }
    };

    fetchResorts();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to the Main Page</h1>
      {resorts.length === 0 ? (
        <p>No resorts found</p>
      ) : (
        <ul className="list-group">
          {resorts.map((resort) => (
            <li key={resort.id} className="list-group-item">
              <h2>{resort.name}</h2>
              <p>
                <strong>Location:</strong>
                {resort.location}
              </p>
              <p>
                <strong>Price:</strong>
                $
                {resort.price}
              </p>
              <p>
                <strong>Guests:</strong>
                {resort.guests_amount}
              </p>
              <img
                src={resort.image_url}
                alt={resort.name}
                className="img-thumbnail"
                style={{ width: '200px' }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MainPage;
