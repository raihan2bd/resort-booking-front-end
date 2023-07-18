import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBookings } from '../redux/my-bookings/my-bookings';

const MyBookingsPage = () => {
  const myBookings = useSelector((state) => state.myBookings);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  let myBookingsContent;

  if (myBookings.error) {
    myBookingsContent = <p className="text-danger p-3 text-center">{myBookings.error}</p>;
  } else if (myBookings.loading) {
    myBookingsContent = <p className="p-5 text-center">Loading ...</p>;
  } else if (myBookings.myBookings.length > 0) {
    myBookingsContent = (
      <ul className="row py-5 list-unstyled">
        {myBookings.myBookings.map((item) => (
          <li key={item.id} className="col-lg-3 col-md-4 col-sm-12">
            <h4>{item.name}</h4>
            <address>{item.address}</address>
            <p>
              Start Date:
              {item.start_date}
            </p>
            <p>
              End Date:
              {item.end_date}
            </p>
          </li>
        ))}
      </ul>
    );
  } else {
    myBookingsContent = <p className="text-center text-danger"> No Bookings found! Please add a new one</p>;
  }

  return (
    <section className="p-5">
      <h2 className="text-center">My Bookings</h2>
      <div className="container">
        {myBookingsContent}
      </div>
    </section>
  );
};

export default MyBookingsPage;
