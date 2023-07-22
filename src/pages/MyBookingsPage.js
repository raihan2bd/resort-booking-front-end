import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBookings } from '../redux/my-bookings/my-bookings';
import { fetchLogout } from '../redux/auth/authSlice';

import BookingItem from '../components/BookingItem/BookingItem';

const MyBookingsPage = () => {
  const myBookings = useSelector((state) => state.myBookings);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  let myBookingsContent;

  if (myBookings.error) {
    myBookingsContent = (
      <p className="text-danger p-3 text-center">{myBookings.error}</p>
    );
  } else if (myBookings.loading) {
    myBookingsContent = <p className="p-5 text-center">Loading ...</p>;
  } else if (myBookings.myBookings.length > 0) {
    myBookingsContent = (
      <ul className="row py-5 list-unstyled gy-4 gx-4">
        {myBookings.myBookings.map((item) => (
          <BookingItem
            key={item.id}
            id={item.id}
            name={item.name}
            address={item.address}
            StartDate={item.start_date}
            EndDate={item.end_date}
          />
        ))}
      </ul>
    );
  } else {
    myBookingsContent = (
      <p className="text-center text-danger">
        {' '}
        No Bookings found! Please add a new one
      </p>
    );
  }

  return (
    <section className="p-5">
      <h2 className="text-center">My Bookings</h2>
      <div className="container">{myBookingsContent}</div>
      {auth.userId && <button type="button" onClick={() => dispatch(fetchLogout({ token: auth.token }))}>Logout</button>}
    </section>
  );
};

export default MyBookingsPage;
