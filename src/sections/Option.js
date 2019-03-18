import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Option = props => {
  const {
    item,
    unit,
    optionIndex,
    unitIndex,
    warbandIndex,
    deleteOption,
    addOption,
    toggleOption,
  } = props;
  const status = unit.options[optionIndex];
  return (
    <div key={item.name}>
      <li>
        {item.name} ({item.points}): {unit.options[optionIndex]}
        <Fragment>
          {item.type === 'boolean' ? (
            <div className="floatright">
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={toggleOption}
                  data-warbandindex={warbandIndex}
                  data-unitindex={unitIndex}
                  value={optionIndex}
                  checked={status}
                  id="1"
                />
                <span className="slider round" />
              </label>
            </div>
          ) : (
            <span>
              <button
                onClick={deleteOption}
                data-warbandindex={warbandIndex}
                data-unitindex={unitIndex}
                value={optionIndex}
                className="right"
                type="button"
              >
                -
              </button>
              <button
                onClick={addOption}
                data-warbandindex={warbandIndex}
                data-unitindex={unitIndex}
                value={optionIndex}
                className="right"
                type="button"
              >
                +
              </button>
            </span>
          )}
        </Fragment>
      </li>
    </div>
  );
};

Option.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  unit: PropTypes.instanceOf(Object).isRequired,
  optionIndex: PropTypes.number.isRequired,
  unitIndex: PropTypes.number.isRequired,
  warbandIndex: PropTypes.number.isRequired,
  deleteOption: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  toggleOption: PropTypes.func.isRequired,
};

export default Option;
