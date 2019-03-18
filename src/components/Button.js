import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { className, onClick, status, text, value } = props;
  return (
    <button type="button" onClick={onClick} value={value} className={className} disabled={status}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  value: '',
  className: '',
  status: '',
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  status: PropTypes.string,
};

export default Button;
