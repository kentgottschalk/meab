import React from 'react';
import PropTypes from 'prop-types';

const AddWarband = props => {
  const { side, factions, addWarband } = props;
  const filteredFactions = factions.filter(item => item.align === side);
  const sortedOptions = [].concat(filteredFactions).sort(function sorter(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="box">
      {typeof side !== 'undefined' ? (
        <select onChange={addWarband} value="0">
          <option key="0" value="0">
            Add warband
          </option>
          {sortedOptions.map(option => (
            <option key={option.fid} value={option.fid}>
              {option.name}
            </option>
          ))}
        </select>
      ) : (
        <span className="center">Please choose side</span>
      )}
    </div>
  );
};

AddWarband.defaultProps = {
  side: undefined,
};

AddWarband.propTypes = {
  side: PropTypes.string,
  factions: PropTypes.instanceOf(Array).isRequired,
  addWarband: PropTypes.func.isRequired,
};

export default AddWarband;
