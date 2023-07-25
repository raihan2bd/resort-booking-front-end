import { useParams } from 'react-router-dom';
import ReservationForm from './ReservationForms';

const Reserve = () => {
  const { resortId } = useParams();

  return (
    <div className="reservation-container mt-4 p-3">
      <h1 className="text-center my-3">Create New Reservation</h1>
      <ReservationForm resortId={resortId || ''} />
    </div>
  );
};
export default Reserve;
