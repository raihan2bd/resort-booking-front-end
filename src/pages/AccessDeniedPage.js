import { Link } from 'react-router-dom';

const AccessDeniedPage = () => (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow p-3 border rounded text-center">
      <h2 className="text-danger my-3">Access Denied!</h2>
      <p className="text-warning p-3">
        You don&apos;t have access to the page that you are looking for Please go back to the
        <br />
        {' '}
        <Link className="p-2 fs-5 fw-bold" to="/">Home</Link>
      </p>
    </div>
  </div>
);

export default AccessDeniedPage;
