import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-indigo-500 px-4 py-1 rounded-md">
    {children}
  </Link>
);

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};