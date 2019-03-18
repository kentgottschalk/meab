import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Select from '../components/Select';
import Unit from './Unit';

const Warband = props => {
  const {
    factions,
    warbandIndex,
    unitdata,
    warband,
    addUnit,
    deleteUnit,
    deleteWarband,
    addWarrior,
    deleteWarrior,
    addOption,
    deleteOption,
    toggleOption,
  } = props;

  const totalModels = warband.units.reduce(function sumModels(sum, item) {
    return sum + item.number;
  }, 0);

  const totalOptionPoints = warband.units.reduce(function armyPoints(a, b) {
    b.options.forEach(function warbandModels(c, index) {
      const filteredUnitOptionData = unitdata.filter(item => item.uid === b.uid)[0];
      a += c * filteredUnitOptionData.options[index].points;
    });
    return a;
  }, 0);

  const totalPoints = warband.units.reduce(function sumPoints(sum, item) {
    const itemUid = item.uid;
    const unit = unitdata.filter(units => units.uid === itemUid);
    return sum + item.number * unit[0].points;
  }, 0);

  const unittypes = warband.units.reduce((a, b) => {
    const units = unitdata.filter(unit => unit.uid === b.uid);
    a.push(units[0].type);
    return a;
  }, []);

  const heroes = ['Hero of Legend', 'Hero of Valour', 'Hero of Fortitude', 'Minor Hero', 'Hero'];

  return (
    <div key={warband.warbandId} className="warband">
      <div>
        Warband {warbandIndex + 1} {warbandIndex === 0 ? '(Leader)' : null}
        <Button value={warbandIndex} onClick={deleteWarband} className="right" text="x" />
      </div>
      <div>
        Army List: {factions.filter(item => item.fid === warband.faction).map(item => item.name)}
      </div>
      <div>Price</div>
      <div className="warbandmenu">
        <Select
          options={
            heroes.some(el => unittypes.includes(el))
              ? unitdata.filter(
                  units => units.faction === warband.faction && units.type === 'Warrior'
                )
              : unitdata.filter(units => units.faction === warband.faction)
          }
          warbandIndex={warbandIndex}
          onchange={addUnit}
          text="Add unit"
        />
      </div>
      {warband.units.map((unit, index) => {
        const filteredUnitData = unitdata.filter(item => item.uid === unit.uid)[0];
        return (
          <Fragment key={unit.unitId}>
            <Unit
              filteredUnitData={filteredUnitData}
              unit={unit}
              unitdata={unitdata}
              unitIndex={index}
              warbandIndex={warbandIndex}
              warbandId={warband.warbandId}
              addUnit={addUnit}
              deleteUnit={deleteUnit}
              addWarrior={addWarrior}
              deleteWarrior={deleteWarrior}
              addOption={addOption}
              deleteOption={deleteOption}
              toggleOption={toggleOption}
            />
          </Fragment>
        );
      })}
      {warband.units.length !== 0 ? <div>{totalModels}</div> : null}
      {warband.units.length !== 0 ? <div className="hiddenCell" /> : null}
      {warband.units.length !== 0 ? (
        <div>
          {totalPoints + totalOptionPoints}{' '}
          <span className="light">
            ({totalPoints}/{totalOptionPoints})
          </span>
        </div>
      ) : null}
    </div>
  );
};

Warband.propTypes = {
  factions: PropTypes.instanceOf(Array).isRequired,
  warbandIndex: PropTypes.number.isRequired,
  unitdata: PropTypes.instanceOf(Array).isRequired,
  warband: PropTypes.instanceOf(Object).isRequired,
  addUnit: PropTypes.func.isRequired,
  deleteUnit: PropTypes.func.isRequired,
  deleteWarband: PropTypes.func.isRequired,
  addWarrior: PropTypes.func.isRequired,
  deleteWarrior: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  toggleOption: PropTypes.func.isRequired,
};

export default Warband;
