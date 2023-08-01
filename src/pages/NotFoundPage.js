import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow p-3 border rounded text-center">
      <h2 className="text-danger my-3">404 Page Not Found!</h2>
      <p className="shadow text-danger p-3">
        The page that you are looking for is not found. Please go back to the
        <br />
        {' '}
        <Link className="p-2 fs-5 fw-bold" to="/">Home</Link>
      </p>
    </div>
  </div>
);

export default NotFoundPage;
