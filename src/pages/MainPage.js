import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const getVisibleItems = () => {
  if (window.innerWidth >= 768) {
    return 3;
  } if (window.innerWidth >= 480) {
    return 2;
  }
  return 1;
};

const MainPage = () => {
  const [resorts, setResorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const response = await axios.get('/resorts');
        setResorts(response.data);
      } catch (error) {
        // space reserved for testing errors
      }
    };

    fetchResorts();

    const handleResize = () => {
      setCurrentIndex(0);
      const visibleItems = getVisibleItems();
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(-${0 * (100 / visibleItems)}%)`;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNext = () => {
    const visibleItems = getVisibleItems();
    const maxIndex = Math.max(resorts.length - visibleItems, 0);
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, maxIndex);
      if (carouselRef.current) {
        carouselRef.current.querySelector('.resorts-list').style.transform = `translateX(-${newIndex * (100 / visibleItems)}%)`;
      }
      return newIndex;
    });
  };

  const handlePrev = () => {
    const visibleItems = getVisibleItems();
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      if (carouselRef.current) {
        carouselRef.current.querySelector('.resorts-list').style.transform = `translateX(-${newIndex * (100 / visibleItems)}%)`;
      }
      return newIndex;
    });
  };

  return (
    <div className="page-content">
      <div className="container mt-5" id="list">
        <h1 className="LatestResort">LATEST RESORTS</h1>
        <p className="ResortSelect">Please select a resort</p>
        <div className="resorts-carousel" ref={carouselRef}>
          {resorts.length === 0 ? (
            <p>No resorts found</p>
          ) : (
            <div className="resorts-list" style={{ transform: `translateX(-${currentIndex * (100 / getVisibleItems())}%)` }}>
              {resorts.map((resort) => (
                <Link key={resort.id} to={`/details/${resort.id}`} className="resort-item">
                  <img src={resort.image_url} alt={resort.name} className="img-thumbnail resort-image" />
                  <h2>{resort.name}</h2>
                  <p>
                    <strong>Location:</strong>
                    {' '}
                    {resort.location}
                  </p>
                  <p>
                    <strong>Price:</strong>
                    {' '}
                    $
                    {resort.price}
                  </p>
                  <p>
                    <strong>Guests:</strong>
                    {' '}
                    {resort.guests_amount}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="carousel-buttons-container">
        <button
          type="button"
          className={`carousel-button prev-button ${currentIndex === 0 ? 'gray-button' : 'limegreen-button'}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <button
          type="button"
          className={`carousel-button next-button ${currentIndex >= resorts.length - getVisibleItems() ? 'gray-button' : 'limegreen-button'}`}
          onClick={handleNext}
          disabled={currentIndex >= resorts.length - getVisibleItems()}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MainPage;
