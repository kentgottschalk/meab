import React from 'react';
import PropTypes from 'prop-types';

const Select = props => {
  const { options, onchange, warbandIndex, text } = props;
  const sortedOptions = [].concat(options).sort(function sorter(a, b) {
    if (a.text < b.text) {
      return -1;
    }
    if (a.text > b.text) {
      return 1;
    }
    return 0;
  });
  return (
    <select onChange={onchange} data-id={warbandIndex} value="0">
      <option key="0" value="0">
        {text}
      </option>
      {sortedOptions.map(option => (
        <option key={option.uid} value={option.uid !== undefined ? option.uid : option.key}>
          {option.name} {option.points !== undefined ? `(${option.points}) ${option.type}` : null}
        </option>
      ))}
    </select>
  );
};

Select.defaultProps = {
  warbandIndex: 0,
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  onchange: PropTypes.func.isRequired,
  warbandIndex: PropTypes.number,
  text: PropTypes.string.isRequired,
};

export default Select;
