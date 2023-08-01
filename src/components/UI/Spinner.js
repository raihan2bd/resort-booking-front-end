const Spinner = () => (
  <div className="custom-spinner w-100 vh-100 d-flex justify-content-center align-items-center">
    <div className="w-50 h-50 d-flex justify-content-center align-items-center shadow p-3  bg-body rounded">
      <div
        className="spinner-border text-orange"
        style={{
          width: '3rem',
          height: '3rem',
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);

export default Spinner;
