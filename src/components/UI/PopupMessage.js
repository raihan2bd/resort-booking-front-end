import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../redux/ui/uiSlice';

const PopupMessage = () => {
  const { hasError, message } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  let classes = 'message_popup border border-rounded shadow text-align-right px-3 py-2 m-1';
  classes += hasError
    ? ' text-danger border-danger'
    : ' text-success border-success';

  return (
    <div className="d-flex justify-content-end">
      <p className={classes}>
        <span>{message}</span>
        <button
          type="button"
          className="btn btn-outline-danger ms-3 py-1"
          onClick={() => {
            dispatch(uiActions.resetState());
          }}
        >
          X
        </button>
      </p>
    </div>
  );
};

export default PopupMessage;
