import PropTypes from 'prop-types';

import './BookingItem.css';

const BookingItem = ({
  id, name, address, StartDate, EndDate,
}) => (
  <li id={id} className="col-lg-4 col-md-6 col-sm-12">
    <div className="p-3 booking-card text-center">
      <h4 className="text-light">{name}</h4>
      <hr />
      <address className="text-dark fs-5">
        <span className="pe-3">Address:</span>
        {' '}
        {address}
      </address>
      <p className="m-1">
        <span className="pe-3">Start Date:</span>
        {StartDate}
      </p>
      <p>
        <span className="pe-3">End Date:</span>
        { EndDate}
      </p>
    </div>
  </li>
);

BookingItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  StartDate: PropTypes.string.isRequired,
  EndDate: PropTypes.string.isRequired,
};

export default BookingItem;
