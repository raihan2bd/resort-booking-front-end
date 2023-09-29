import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsArrowRightCircle, BsPlusCircle } from 'react-icons/bs';
import { FaGreaterThan } from 'react-icons/fa';

const ResortDetailsPage = () => {
  const [resortDetails, setResortDetails] = useState({});
  const [hasError, setHasError] = useState(null);

  const { resortId } = useParams();

  useEffect(() => {
    const fetchResort = async () => {
      try {
        const response = await axios.get(`/resorts/${resortId}`);
        setHasError(null);
        setResortDetails({ ...response.data });
      } catch (error) {
        if (error.response.status === 404) {
          setHasError('No data found. Please go back to home page.');
        } else {
          setHasError('Something went wrong. Please try again.');
        }
      }
    };

    fetchResort();
  }, [resortId]);

  let resortDetailsContent;
  if (hasError) {
    resortDetailsContent = (
      <p className="text-danger p-3 shadow text-center">{hasError}</p>
    );
  } else {
    resortDetailsContent = (
      <div className="container overflow-hidden">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="p-3">
              <div className="resort-image overflow-hidden">
                <img src={resortDetails.image_url} alt={resortDetails.name} />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <h2 className="txt-right mt-3 px-3">{resortDetails.name}</h2>
            <p className="p-3 txt-right">{resortDetails.description}</p>
            <div className="mt-3">
              <p className="border d-flex justify-content-between p-3 bg-secondary text-white">
                <span className="fs-5">Price:</span>
                {resortDetails.price}
              </p>
              <p className="border d-flex justify-content-between p-3">
                <span className="fs-5">Guests Amount:</span>
                {resortDetails.guests_amount}
              </p>
              <p className="border d-flex justify-content-between p-3 bg-secondary text-white">
                <span className="fs-5">Location:</span>
                {resortDetails.location}
              </p>
            </div>
            <Link to="/" className="my-3 txt-right fw-bold d-block link-dark text-decoration-none">
              Discover More Resort
              <span className="text-orange"><FaGreaterThan /></span>
            </Link>
            <Link to={`/add-booking/${resortDetails.id}`} className="btn btn-success px-3 py-2 mt-3 rounded-pill fs-5">
              <BsPlusCircle />
              <span className="ps-3 fs-5 text-center">Add Booking</span>
              {' '}
              <span className="ps-3"><BsArrowRightCircle /></span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-3">
      {resortDetailsContent}
    </section>
  );
};

export default ResortDetailsPage;
