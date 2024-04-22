import PropTypes from 'prop-types';

export function Message({ message }) {
  return (
    <p className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-5 h-auto">
      {message}
    </p>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};