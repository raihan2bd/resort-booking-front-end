import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResorts } from '../redux/resorts/resortsSlice';
import Spinner from '../components/UI/Spinner';

const getVisibleItems = () => {
  if (window.innerWidth >= 768) {
    return 3;
  } if (window.innerWidth >= 480) {
    return 2;
  }
  return 1;
};

const MainPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const { loading, hasError, message } = useSelector((state) => state.ui);
  const { resorts } = useSelector((state) => state.resorts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResorts());

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
  }, [dispatch]);

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

  if (hasError && message) {
    return <p className="text-center text-danger p-3 shadow">{message}</p>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="page-content">
      <div className="container mt-2" id="list">
        <h1 className="LatestResort">LATEST RESORTS</h1>
        <p className="ResortSelect">Please select a resort</p>
        <div className="resorts-carousel" ref={carouselRef}>
          {resorts.length === 0 ? (
            <p>No resorts found</p>
          ) : (
            <div className="resorts-list mx-4" style={{ transform: `translateX(-${currentIndex * (100 / getVisibleItems())}%)` }}>
              {resorts.map((resort) => (
                <Link key={resort.id} to={`/details/${resort.id}`} className="resort-item">
                  <div className="border-rounded border shadow m-2">
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {resorts.length > 0 && (
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
      )}
    </div>
  );
};

export default MainPage;
