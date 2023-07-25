import PropTypes from 'prop-types';

import './BookingItem.css';

const BookingItem = ({
  id, name, address, StartDate, EndDate,
}) => {
  const convertDate = (dateString) => {
    const startDate = new Date(dateString);

    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  return (
    <li id={id} className="col-lg-4 col-md-6 col-sm-12">
      <div className="p-3 booking-card text-center">
        <h4 className="text-light">{name}</h4>
        <hr />
        <address className="text-dark">
          <span className="pe-3">Address:</span>
          {' '}
          {address}
        </address>
        <p className="m-1">
          <span className="pe-3">Start Date:</span>
          {convertDate(StartDate)}
        </p>
        <p>
          <span className="pe-3">End Date:</span>
          {convertDate(EndDate)}
        </p>
      </div>
    </li>
  );
};

BookingItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  StartDate: PropTypes.string.isRequired,
  EndDate: PropTypes.string.isRequired,
};

export default BookingItem;
