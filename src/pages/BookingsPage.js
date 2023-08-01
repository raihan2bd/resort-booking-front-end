import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../redux/bookings/bookingsSlice';

import BookingItem from '../components/BookingItem/BookingItem';
import Spinner from '../components/UI/Spinner';

const BookingPage = () => {
  const bookings = useSelector((state) => state.bookings);
  const token = useSelector((state) => state.auth.token);
  const { loading, hasError } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookings({ token }));
  }, [dispatch, token]);

  let bookingsContent;

  if (loading) {
    return <Spinner />;
  }

  if (bookings.bookings.length > 0) {
    bookingsContent = (
      <ul className="row py-5 list-unstyled gy-4 gx-4">
        {bookings.bookings.map((item) => (
          <BookingItem
            key={item.id}
            id={item.id}
            name={item.resort.name}
            address={item.address}
            StartDate={item.start_date}
            EndDate={item.end_date}
          />
        ))}
      </ul>
    );
  } else if (!hasError && bookings.length <= 0) {
    bookingsContent = (
      <p className="text-center text-danger">
        {' '}
        No Bookings found! Please add a new one
      </p>
    );
  }

  return (
    <section className="p-5">
      <h2 className="text-center">My Bookings</h2>
      <div className="container">{bookingsContent}</div>
    </section>
  );
};

export default BookingPage;
