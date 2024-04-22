import PropTypes from 'prop-types';

export function Card({ children }) {
    return <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">{children}</div>;
  }

  Card.propTypes = {
    children: PropTypes.node.isRequired,
  };