import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
  const { header, subheader } = props;
  return (
    <div className="logo">
      <h2>{subheader}</h2>
      <h1>{header}</h1>
    </div>
  );
};

Header.defaultProps = {
  subheader: '',
};

Header.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
};

export default Header;
