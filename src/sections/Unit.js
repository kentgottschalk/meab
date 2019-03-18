import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

const Unit = props => {
  const {
    filteredUnitData,
    unit,
    unitIndex,
    warbandIndex,
    deleteUnit,
    addWarrior,
    deleteWarrior,
    addOption,
    deleteOption,
    toggleOption,
  } = props;
  const [showHide, setShowHide] = useState('hidden');

  const totalOptionPoints = unit.options.reduce(function optionPoints(a, b, index) {
    const c = filteredUnitData.options[index].points;
    return a + b * c;
  }, 0);

  return (
    <Fragment key={unit.unitId}>
      <div>
        {filteredUnitData.type !== 'Warrior' ? 'Hero' : unit.number}
        {filteredUnitData.type === 'Warrior' ? (
          <Fragment>
            <button
              onClick={deleteWarrior}
              value={unitIndex}
              data-id={warbandIndex}
              className="right"
              type="button"
            >
              -
            </button>
            <button
              onClick={addWarrior}
              value={unitIndex}
              data-id={warbandIndex}
              className="right"
              type="button"
            >
              +
            </button>
          </Fragment>
        ) : null}
      </div>
      <div>
        {filteredUnitData.name}
        <button
          value={unitIndex}
          data-id={warbandIndex}
          onClick={deleteUnit}
          className="right"
          type="button"
        >
          x
        </button>
        <span
          role="button"
          tabIndex="0"
          className="optionsToggle"
          onClick={() => setShowHide(showHide === 'hidden' ? '' : 'hidden')}
          onKeyDown={() => setShowHide(showHide === 'hidden' ? '' : 'hidden')}
        >
          &#8595;
        </span>
        <div className={showHide === 'hidden' ? 'hiddenToggle' : ''}>
          <ul>
            {filteredUnitData.options.map((item, optionIndex) => {
              const key = unit.unitId + optionIndex;
              return (
                <Fragment key={key}>
                  <Option
                    unit={unit}
                    item={item}
                    optionIndex={optionIndex}
                    unitIndex={unitIndex}
                    warbandIndex={warbandIndex}
                    deleteOption={deleteOption}
                    addOption={addOption}
                    toggleOption={toggleOption}
                  />
                </Fragment>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        {filteredUnitData.points * unit.number + totalOptionPoints}{' '}
        <span className="light">
          ({filteredUnitData.points * unit.number}/{totalOptionPoints})
        </span>
      </div>
    </Fragment>
  );
};

Unit.propTypes = {
  filteredUnitData: PropTypes.instanceOf(Object).isRequired,
  unit: PropTypes.instanceOf(Object).isRequired,
  unitIndex: PropTypes.number.isRequired,
  warbandIndex: PropTypes.number.isRequired,
  deleteUnit: PropTypes.func.isRequired,
  addWarrior: PropTypes.func.isRequired,
  deleteWarrior: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  toggleOption: PropTypes.func.isRequired,
};

export default Unit;
