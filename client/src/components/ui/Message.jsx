import PropTypes from 'prop-types';

export function Message({ message }) {
  return (
    <p className="text-slate-200 bg-red-500 py-3 px-4 text-base rounded-sm mb-5">
  {message}
</p>

  );
}

Message.propTypes = {
  message: PropTypes.string,
};


// import PropTypes from 'prop-types';

// export function Message({ children }) {
//   return (
//     <p className="text-white-200 bg-red-500 py-5 px-4 text-base rounded-sm mb-5">
//   {children}
// </p>

//   );
// }

// Message.propTypes = {
//   children: PropTypes.string.isRequired,
// };